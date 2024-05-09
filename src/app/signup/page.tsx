import PageHeader from "@/_components/pageHeader";
import SignupForm from "@/_components/auth/signupForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <PageHeader>create an account</PageHeader>
      <SignupForm />
      <p>
        already have an account?{" "}
        <Link href="/signup" className="underline">
          log in
        </Link>
      </p>
    </>
  );
}
