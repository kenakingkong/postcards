"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/_utils/supabase/server";

export async function login(formData: FormData) {
  const redirectPath = "/my-postcards";

  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) redirect("/login?error=true");

  revalidatePath(redirectPath, "layout");
  redirect(redirectPath);
}

export async function signup(formData: FormData) {
  const redirectPath = "/gallery";

  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) redirect("/signup?error=true");

  revalidatePath(redirectPath, "layout");
  redirect(redirectPath);
}
