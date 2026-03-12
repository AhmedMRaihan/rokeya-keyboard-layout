'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isPlayground = pathname?.toLowerCase().endsWith("/playground/");

  return (
    <div className="footer_text text-center mt-8">
      <Link className="text-blue-600 dark:text-sky-400 p-4"
        href="https://github.com/AhmedMRaihan/rokeya-keyboard-layout">
        {"© " + new Date().getFullYear() + " Ahmed Raihan"}
      </Link>
      <Link className="text-blue-600 dark:text-sky-400 p-4" href="/home">
        🏠 Home
      </Link>
      <Link className="text-blue-600 dark:text-sky-400 p-4" href="/coverage">
        ℹ️ Code Coverage
      </Link>
      {!isPlayground && (
        <Link className="text-blue-600 dark:text-sky-400 p-4" href="/playground/">
          ✍️ Try the Playground
        </Link>
      )}
    </div>
  );
};

export default Footer;