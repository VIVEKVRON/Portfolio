"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const dbPath = path.join(process.cwd(), "src/data/db.json");

export async function getDbData() {
  const file = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(file);
}

export async function updateDbData(newData: any) {
  // In a real scenario we'd do validation here
  await fs.writeFile(dbPath, JSON.stringify(newData, null, 2));
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/certifications");
  revalidatePath("/research");
  return { success: true };
}

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "public/uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.writeFile(filePath, buffer);

  return { success: true, url: `/uploads/${fileName}` };
}
