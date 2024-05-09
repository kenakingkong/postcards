import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/_utils/supabase/server";
import Form from "./form";

export default function LoginForm() {
  const supabase = createClient();

  async function login(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) redirect("/error");

    revalidatePath("/", "layout");
    redirect("/");
  }

  return <Form cta="log in" callback={login} />;
}
