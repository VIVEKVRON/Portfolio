import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

const rlPath = path.join(process.cwd(), "src/data/ratelimit.json");

async function checkAndRecordAttempt(ip: string, reset: boolean = false): Promise<{ allowed: boolean, remaining: number }> {
  let data: any = {};
  try {
    const file = await fs.readFile(rlPath, "utf-8");
    data = JSON.parse(file);
  } catch (e) {
    // File doesn't exist yet
  }

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  // Cleanup old entries
  for (const key in data) {
    data[key] = data[key].filter((timestamp: number) => now - timestamp < ONE_DAY);
    if (data[key].length === 0) delete data[key];
  }

  if (reset) {
    delete data[ip];
    await fs.writeFile(rlPath, JSON.stringify(data, null, 2));
    return { allowed: true, remaining: 3 };
  }

  const attempts = data[ip] || [];
  
  if (attempts.length >= 3) {
    await fs.writeFile(rlPath, JSON.stringify(data, null, 2));
    return { allowed: false, remaining: 0 };
  }

  // Record this failed attempt
  attempts.push(now);
  data[ip] = attempts;

  await fs.writeFile(rlPath, JSON.stringify(data, null, 2));
  return { allowed: true, remaining: 3 - attempts.length };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
  
  // First check if they are already locked out
  let data: any = {};
  try {
    const file = await fs.readFile(rlPath, "utf-8");
    data = JSON.parse(file);
  } catch (e) {}
  
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const currentAttempts = (data[ip] || []).filter((t: number) => now - t < ONE_DAY);
  
  if (currentAttempts.length >= 3) {
    return NextResponse.json({ 
      success: false, 
      error: "Too many failed attempts. Locked out for 24 hours." 
    }, { status: 429 });
  }

  const { passcode } = await req.json();
  const validPasscode = process.env.ADMIN_PASSCODE || "RON2105";
  
  if (passcode === validPasscode) {
    // Reset attempts on successful login
    await checkAndRecordAttempt(ip, true);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return NextResponse.json({ success: true });
  }
  
  // Record failed attempt
  const result = await checkAndRecordAttempt(ip, false);
  
  if (!result.allowed) {
    return NextResponse.json({ 
      success: false, 
      error: "Too many failed attempts. Locked out for 24 hours." 
    }, { status: 429 });
  }

  return NextResponse.json({ 
    success: false, 
    error: `Invalid Passcode. ${result.remaining} attempts remaining.` 
  }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}

