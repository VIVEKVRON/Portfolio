import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file");
  if (!file) return new NextResponse("No file specified", { status: 400 });

  try {
    const filePath = path.join("/tmp/uploads", file);
    const buffer = await fs.readFile(filePath);
    
    // Determine content type
    const ext = path.extname(file).toLowerCase();
    let contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    if (ext === ".gif") contentType = "image/gif";
    if (ext === ".webp") contentType = "image/webp";
    if (ext === ".svg") contentType = "image/svg+xml";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch (e) {
    return new NextResponse("File not found or expired", { status: 404 });
  }
}
