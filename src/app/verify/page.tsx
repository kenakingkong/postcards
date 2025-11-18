import PageHeader from "@/_components/pageHeader";
import Verify from "./_components/verify";
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <div className="px-4 space-y-4 md:space-y-8">
      <PageHeader>Verify your email address</PageHeader>
      <Suspense>
        <Verify />
      </Suspense>
    </div>
  );
}
