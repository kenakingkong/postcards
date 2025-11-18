"use client";

import { useSearchParams } from "next/navigation";

export default function Verify() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="text-center space-y-4">
      <p className="max-w-xl mx-auto">
        To create your own postcards, confirm your email address with the email
        sent to {email ? <b>{email}</b> : "you"}
      </p>
      {/* <button className="btn-primary">resend email</button> */}
    </div>
  );
}
