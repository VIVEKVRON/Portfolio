"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only initialize if keys exist so it doesn't crash the server on boot
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export async function submitContactMessage(formData: FormData) {
  if (!supabase) {
    return { success: false, error: "Supabase Environment Variables are missing on Vercel!" };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !message || !email) {
    return { success: false, error: "Missing required fields" };
  }

  const { error } = await supabase
    .from('messages')
    .insert([{ name, email, phone, message }]);

  if (error) {
    console.error("Error inserting message:", error);
    return { success: false, error: "Database rejected the message." };
  }

  return { success: true };
}

export async function getMessages() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  return data;
}

export async function deleteMessage(id: string) {
  if (!supabase) return { success: false };
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error deleting message:", error);
    return { success: false };
  }
  return { success: true };
}
