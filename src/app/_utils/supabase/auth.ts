import { createClient } from "./server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

/**
 * Get the current user from the session (server-side)
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;

  return data.user;
}

/**
 * Check if a user is currently logged in (server-side)
 */
export async function isUserLoggedIn(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Get the current user's ID (server-side)
 * Returns null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const user = await getCurrentUser();
  return user?.id ?? null;
}

/**
 * Require authentication - redirects to /login if user is not logged in
 * Use this in pages that require authentication
 */
export async function requireAuth(
  redirectTo: string = "/login"
): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);

  return user;
}

/**
 * Require authentication - throws error if user is not logged in
 * Use this in server actions or API routes where you want to handle the error
 */
export async function requireAuthOrThrow(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: User must be logged in");

  return user;
}

/**
 * Already authenticated - redirects to home if already logged in
 * Use this in login/signup pages to prevent logged-in users from accessing them
 */
export async function redirectIfAuthenticated(
  redirectTo: string = "/"
): Promise<void> {
  const user = await getCurrentUser();
  if (user) redirect(redirectTo);
}
