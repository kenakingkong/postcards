"use client";

import { useSignOut } from "@/_hooks/useSignOut";

export default function Logout() {
  useSignOut();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Signing out...</p>
    </div>
  );
}
