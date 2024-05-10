"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/_utils/supabase/client";

export default function NavBar() {
  const supabase = createClient();

  const NAV_LINKS = [
    { href: "/gallery", label: "gallery" },
    { href: "/create", label: "+ create" },
    // { href: "/about", label: "about" },
    // { href: "/faq", label: "faq" },
    // { href: "/contact", label: "contact" },
  ];

  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const closeMenu = () => setShowMenu(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    closeMenu();
    router.push((event.target as HTMLButtonElement).value);
  };

  const setUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    setIsSignedIn(!error && !!data.user);
  };

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    setIsSignedIn(false);
    setShowMenu(false);
    router.push("/");
  };

  useEffect(() => {
    setUser();
  }, []);

  useEffect(() => {
    if (!showMenu) return;
    if (isSignedIn) return;
    setUser();
  }, [showMenu, isSignedIn]);

  return (
    <aside
      className={classNames(
        "absolute top-0 left-0 relative w-max h-[100svh] z-10 overflow-hidden bd-r-primary transition-all",
        showMenu ? "w-screen" : "w-12"
      )}
    >
      <nav className="absolute top-0 left-0 z-20 w-12 h-full relative flex flex-col justify-between px-2 md:py-4 bg-white">
        <button
          title="menu"
          className="flex items-center justify-center"
          onClick={toggleMenu}
        >
          <img
            src="/opened-box.svg"
            alt="opened box icon"
            className="hover:opacity-80 transition-all"
            width={36}
            height={36}
          />
        </button>
        <Link href="/">
          <span className="inline font-bold text-xl writing-mode-vertical-rl transform rotate-180 whitespace-nowrap hover:underline">
            postcards by makena kong
          </span>
        </Link>
      </nav>
      <nav
        className={classNames(
          "h-full overflow-hidden absolute top-0 left-0 p-4 md:pl-12 transition-all",
          showMenu ? "w-full bg-white z-10" : "w-0"
        )}
      >
        <div className="h-full text-right text-2xl md:text-4xl lg:text-6xl flex flex-col items-end justify-between">
          <div className="grow">
            <button
              title="close menu"
              onClick={closeMenu}
              className="hover:opacity-80"
            >
              ⓧ
            </button>
          </div>
          <ul className="h-full text-right text-2xl md:text-4xl lg:text-6xl flex flex-col items-end justify-end gap-4 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  value={link.href}
                  onClick={handleClick}
                  className="hover:underline"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <ul className="h-full text-right text-xl md:text-2xl lg:text-4xl flex flex-col items-end justify-end gap-4 lg:gap-8">
            {isSignedIn ? (
              <>
                <li>
                  <button
                    value="/my-postcards"
                    onClick={handleClick}
                    className="hover:underline"
                  >
                    my postcards
                  </button>
                </li>
                <li>
                  <button className="hover:underline" onClick={handleSignout}>
                    sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  value="/signup"
                  onClick={handleClick}
                  className="hover:underline"
                >
                  sign up
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
