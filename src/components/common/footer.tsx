'use client';

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer: React.FunctionComponent = () => {
  const pathname = usePathname();
  return (
    <div className="footer_text text-center mt-8">
      <Link
        className="text-blue-600 dark:text-sky-400 p-4"
        href="https://github.com/AhmedMRaihan/rokeya-keyboard-layout"
      >
        {"© " + new Date().getFullYear() + " Ahmed Raihan"}
      </Link>
      <Link className="text-blue-600 dark:text-sky-400 p-4" href="/home">
        🏠 Home
      </Link>
      { ((pathname+"").toLowerCase().endsWith("playground") === false) && 
        <Link className="text-blue-600 dark:text-sky-400 p-4" href="/playground/">
          ✍️ Try the Playground
        </Link>
      }
    </div>
  );
};

export default Footer;
