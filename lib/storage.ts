import { supabase } from "./supabase";

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("menu-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("menu-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
