import { useEffect, useState, useRef } from "react";
import { purnoFont } from "@/app/fonts";

const DATE_FORMAT = "এখন সময়: l, A gটা iমিনিট sসেকেন্ড, j F, Y (বঙ্গাব্দ)";
const LOADING_TEXT = "BanglaDateJS > BUETDateConverter লোড হচ্ছে …";
const INTERVAL_MS = 10_000;
const buetDateJsUrl = "https://cdn.jsdelivr.net/gh/AhmedMRaihan/BanglaDateJS@master/src/buetDateTime.js";

declare class buetDateConverter {
  constructor(date: Date);
  constructor();
  convert(format: string): string;
}

const BuetDateUI = () => {
  const [displayText, setDisplayText] = useState(LOADING_TEXT);
  const converterRef = useRef<buetDateConverter>(null);

  const updateTimerDisplayText = () => {
    if (converterRef.current) {
        const data = new converterRef.current(new Date()).convert(DATE_FORMAT);
        setDisplayText(data);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Direct dynamic ES module import with Webpack directive
    import(/* webpackIgnore: true */ buetDateJsUrl)
      .then((module) => {
        if (!isMounted) return;

        const ConverterClass = (module.default || module.buetDateConverter) as typeof buetDateConverter;
        if (ConverterClass) {
          converterRef.current = ConverterClass; // Function reference to the class
          updateTimerDisplayText(); // Initial update
        }
      })
      .catch((err) => {
        console.error("Failed to load BanglaDateJS:", err);
      });

    // Continuous timer checking the ref on every tick
    const intervalId = setInterval(() => {
      updateTimerDisplayText();
    }, INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <code className={`${purnoFont.className} text-lg italic text-gray-500`}>
        <div id="currentTime">{displayText}</div>
      </code>
    </div>
  );
};

export default BuetDateUI;