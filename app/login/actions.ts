"use server";

import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthSchema } from "@/utils/form/authForm";

export const signInAction = async (formData: AuthSchema) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return redirect(`/login?message=${error.message}`);
  }

  return redirect("/");
};

export const signUpAction = async (formData: AuthSchema) => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    ...formData,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect(`/login?message=${error.message}`);
  }

  await supabase.from("profiles").insert({ email: user!.email, id: user!.id });

  return redirect("/login?message=Check email to continue sign in process");
};
