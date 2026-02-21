'use client';

import React from "react";
import { usePathname } from "next/navigation";

const Footer: React.FunctionComponent = () => {
  const pathname = usePathname();
  return (
    <div className="footer_text text-center mt-8">
      <a
        className="text-blue-600 dark:text-sky-400 p-4"
        href="https://github.com/AhmedMRaihan/rokeya-keyboard-layout"
      >
        {"© " + new Date().getFullYear() + " Ahmed Raihan"}
      </a>
      <a className="text-blue-600 dark:text-sky-400 p-4" href="/home">
        🏠 Home
      </a>
      <a className="text-blue-600 dark:text-sky-400 p-4" href="coverage/">
        🔗‍️ Code Coverage
      </a>
      { (pathname !== "/playground") && 
        <a className="text-blue-600 dark:text-sky-400 p-4" href="/playground/">
          ✍️ Try the Playground
        </a>
      }
    </div>
  );
};

export default Footer;
