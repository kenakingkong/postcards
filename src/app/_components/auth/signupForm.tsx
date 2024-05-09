import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/_utils/supabase/server";
import Form from "./form";

export default function SignupForm() {
  const supabase = createClient();

  async function signup(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) redirect("/error");

    revalidatePath("/", "layout");
    redirect("/");
  }

  return <Form cta="sign up" callback={signup} />;
}
