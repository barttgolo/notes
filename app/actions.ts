"use server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { NoteSchema } from "@/utils/form/noteForm";
import dayjs from "dayjs";

export const signOutAction = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return redirect("/login");
};

export const addNoteAction = async ({ content }: NoteSchema) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: userData } = await supabase.auth.getUser();

  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userData.user!.id)
    .single();

  const { error } = await supabase
    .from("notes")
    .insert({ content, created_by: profileData!.id });

  revalidatePath("/", "page");

  return error;
};

export const deleteNoteAction = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.from("notes").delete().eq("id", id);

  revalidatePath("/", "page");

  return error;
};

export const completeNoteAction = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userData.user!.id)
    .single();

  const { error } = await supabase
    .from("notes")
    .update({
      completed_at: dayjs().toISOString(),
      completed_by: profileData!.id,
    })
    .eq("id", id);

  revalidatePath("/", "page");

  return error;
};
