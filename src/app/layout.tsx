import type { Metadata } from "next";
import { Fahkwang } from "next/font/google";
import NavBar from "./_components/navBar";
import "./globals.css";
import classNames from "classnames";
import Link from "next/link";

const fahkwang = Fahkwang({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "postcards by makena kong",
  description: "build a custom postcard - send love to your friends and family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(fahkwang.className)}>
        <main>
          <NavBar />
          <div className="absolute top-0 left-0 pl-12 w-full max-h-[100svh] overflow-scroll">
            <div className="p-4 lg:p-6 lg:pb-12 min-h-[100svh] space-y-8 bg-blue-50/20">
              {children}
            </div>
          </div>
        </main>
        <div id="app-modal"></div>
        <Link href="/login" className="btn-primary">
          login
        </Link>
      </body>
    </html>
  );
}
