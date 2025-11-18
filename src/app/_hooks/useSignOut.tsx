import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/_utils/supabase/client";

/**
 * Hook that signs out the user and redirects to the specified path
 * @param redirectTo - The path to redirect to after sign out (default: "/")
 */
export function useSignOut(redirectTo: string = "/") {
  const router = useRouter();

  useEffect(() => {
    async function handleSignOut() {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Failed to sign out");
        return;
      }

      router.push(redirectTo);
    }

    handleSignOut();
  }, [router, redirectTo]);
}
