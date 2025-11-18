import SignupForm from "@/_components/auth/signupForm";
import PageHeader from "@/_components/pageHeader";
import { redirectIfAuthenticated } from "@/_utils/supabase/auth";
import Link from "next/link";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <div className="px-4 space-y-4 md:space-y-8">
      <PageHeader>Create an account</PageHeader>
      <SignupForm />
      <p className="text-center">
        already have an account?{" "}
        <Link href="/login" className="underline">
          log in
        </Link>
      </p>
    </div>
  );
}
