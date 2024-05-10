"use client";

import { useSearchParams } from "next/navigation";

export const FormSubmitError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) return <></>;

  return (
    <span className="form-error text-center" role="alert">
      something went wrong :-(
    </span>
  );
};
