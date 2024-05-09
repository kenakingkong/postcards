import PageHeader from "@/_components/pageHeader";
import LoginForm from "@/_components/auth/loginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <PageHeader>login</PageHeader>
      <LoginForm />
      <p>
        or{" "}
        <Link href="/signup" className="underline">
          create an account
        </Link>
      </p>
    </>
  );
}
