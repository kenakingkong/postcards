import LoginForm from "@/_components/auth/loginForm";
import PageHeader from "@/_components/pageHeader";
import { redirectIfAuthenticated } from "@/_utils/supabase/auth";
import Link from "next/link";

export default async function LoginPage() {
  const user = await redirectIfAuthenticated();

  console.log(user)

  return (
    <div className="px-4 space-y-4 md:space-y-8">
      <PageHeader>Login</PageHeader>
      <LoginForm />
      <p className="text-center">
        or{" "}
        <Link href="/signup" className="underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
