const fs = require('fs');

const code = `
export async function getMessages() {
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
`;

fs.appendFileSync('src/app/actions/contact.ts', code);
