import classNames from "classnames";
import type { Metadata } from "next";
import { Fahkwang } from "next/font/google";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import "./globals.css";

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
      <body className={classNames(fahkwang.className, "bg-blue-50/20")}>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer></footer>
        <div id="app-modal"></div>
      </body>
    </html>
  );
}
