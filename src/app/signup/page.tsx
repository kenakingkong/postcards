import SignupForm from "@/_components/auth/signupForm";
import PageHeader from "@/_components/pageHeader";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <PageHeader>create an account</PageHeader>
      <SignupForm />
      <p className="text-center">
        already have an account?{" "}
        <Link href="/login" className="underline">
          log in
        </Link>
      </p>
    </>
  );
}
