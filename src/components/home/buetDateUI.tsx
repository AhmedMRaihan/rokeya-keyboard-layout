import { useEffect, useState, useCallback } from "react";
import Script from "next/script";

declare class buetDateConverter {
  convert(format: string): string;
}

const DATE_FORMAT = "এখন সময়: l, A gটা iমিনিট sসেকেন্ড, j F, Y (বঙ্গাব্দ)";
const LOADING_TEXT = "BanglaDateJS > BUETDateConverter লোড হচ্ছে …";
const INTERVAL_MS = 10_000;

const BuetDateUI = () => {
  const [displayText, setDisplayText] = useState(LOADING_TEXT);

  const updateTime = useCallback(() => {
    if (typeof buetDateConverter === "undefined") {
      console.error(
        "buetDateConverter is not defined yet. Cannot update time display.",
      );
      return;
    }
    const data = new buetDateConverter().convert(DATE_FORMAT);
    setDisplayText(data);
  }, []);

  const handleScriptLoad = () => {
    updateTime(); // show immediately on load
  };

  useEffect(() => {
    const id = setInterval(updateTime, INTERVAL_MS);
    return () => clearInterval(id); // cleanup on unmount
  }, [updateTime]);

  return (
    <div>
      <code className="text-sm italic text-gray-500">
        <div id="currentTime">{displayText}</div>
      </code>

      <Script
        src="https://cdn.jsdelivr.net/gh/AhmedMRaihan/BanglaDateJS@master/src/buetDateTime.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
    </div>
  );
};

export default BuetDateUI;
