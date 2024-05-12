import PageHeader from "@/_components/pageHeader";
import Verify from "./_components/verify";
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <>
      <PageHeader>verify your email address</PageHeader>
      <Suspense>
        <Verify />
      </Suspense>
    </>
  );
}
