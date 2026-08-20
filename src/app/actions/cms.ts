"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const isProd = process.env.NODE_ENV === "production";
const originalDbPath = path.join(process.cwd(), "src/data/db.json");
const dbPath = isProd ? "/tmp/db.json" : originalDbPath;

export async function getDbData() {
  try {
    const file = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(file);
  } catch (e) {
    if (isProd) {
      // If /tmp/db.json doesn't exist yet, read from the original static file
      const file = await fs.readFile(originalDbPath, "utf-8");
      return JSON.parse(file);
    }
    throw e;
  }
}

export async function updateDbData(newData: any) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(newData, null, 2));
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/certifications");
    revalidatePath("/research");
    return { success: true };
  } catch (e) {
    console.error("CMS Save Error:", e);
    throw new Error("Failed to save. Vercel filesystem is read-only.");
  }
}

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const uploadsDir = isProd ? "/tmp/uploads" : path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);

    // Note: /tmp uploads won't be accessible via public URL in Vercel. 
    // We would need Supabase Storage for persistent Vercel uploads.
    return { success: true, url: isProd ? \`/api/tmp-image?file=\${fileName}\` : \`/uploads/\${fileName}\` };
  } catch (e) {
    console.error("Upload Error:", e);
    throw new Error("Upload failed. Vercel filesystem is read-only.");
  }
}
