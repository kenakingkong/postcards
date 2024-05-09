"use client";

import { MouseEventHandler, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  const NAV_LINKS = [
    { href: "/create", label: "+ create" },
    { href: "/gallery", label: "gallery" },
    { href: "/about", label: "about" },
    { href: "/faq", label: "faq" },
    { href: "/contact", label: "contact" },
  ];

  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    closeMenu();
    router.push((event.target as HTMLButtonElement).value);
  };

  return (
    <aside
      className={classNames(
        "absolute top-0 left-0 relative w-max h-[100vh] z-10 overflow-hidden bd-r-primary transition-all",
        showMenu ? "w-screen" : "w-12"
      )}
    >
      <nav className="absolute top-0 left-0 z-20 w-12 h-full relative flex flex-col justify-between px-2 md:py-4 bg-white">
        <button
          title="menu"
          className="flex items-center justify-center"
          onClick={openMenu}
        >
          <img
            src="/opened-box.svg"
            alt="opened box icon"
            className="hover:opacity-80 transition-all"
            width={36}
            height={36}
          />
        </button>
        <Link href="https://makenakong.com" target="_blank">
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
        <ul className="h-full text-right text-2xl md:text-4xl lg:text-6xl flex flex-col items-end justify-end gap-4 lg:gap-8">
          <li className="grow">
            <button
              title="close menu"
              onClick={closeMenu}
              className="hover:opacity-80"
            >
              ⓧ
            </button>
          </li>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              value={link.href}
              onClick={handleClick}
              className="hover:underline"
            >
              {link.label}
            </button>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default NavBar;
