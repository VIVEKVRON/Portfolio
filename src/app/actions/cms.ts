"use server";

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function getDbData() {
  if (!supabase) throw new Error("Supabase is not configured.");
  
  const { data, error } = await supabase
    .from('cms_config')
    .select('data')
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .single();
    
  if (error || !data) {
    throw new Error("Failed to load CMS data from Supabase.");
  }
  
  return data.data;
}

export async function updateDbData(newData: any) {
  if (!supabase) throw new Error("Supabase is not configured.");
  
  try {
    const { error } = await supabase
      .from('cms_config')
      .update({ data: newData })
      .eq('id', '00000000-0000-0000-0000-000000000001');
      
    if (error) throw error;
    
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/certifications");
    revalidatePath("/research");
    return { success: true };
  } catch (e) {
    console.error("CMS Save Error:", e);
    throw new Error("Failed to save to Supabase.");
  }
}

export async function uploadFile(formData: FormData) {
  if (!supabase) return { success: false, error: "Supabase not configured." };
  
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };

  try {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    const { data, error } = await supabase.storage
      .from('portfolio')
      .upload(`uploads/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(`uploads/${fileName}`);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (e) {
    console.error("Upload Error:", e);
    throw new Error("Upload failed via Supabase Storage.");
  }
}
