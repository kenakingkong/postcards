"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/_utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  return (
    <nav className="p-4 flex items-center justify-between gap-2">
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/">
            <span className="text-sm font-bold">POSTCARDS</span>
          </Link>
        </li>
        <li>
          <Link href="/gallery">Gallery</Link>
        </li>
      </ul>
      <ul className="flex items-center gap-4">
        <li>
          <AccountLink />
        </li>
        <li className="hidden md:block">
          <Link href="/create">
            <span className="btn-primary max-w-60">+ create</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function AccountLink() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    supabase.auth.getUser()
      .then(({ data: { user }, error }) => {
        if (!mounted) return;
        setUser(error ? null : user);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  return user ? (
    <Link href="/my-postcards">My account</Link>
  ) : (
    <Link href="/signup">Sign up</Link>
  );
}
