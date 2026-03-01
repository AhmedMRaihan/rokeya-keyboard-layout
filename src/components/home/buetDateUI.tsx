import React from "react";
import Script from "next/script";
import "./ui.module.css";

declare class buetDateConverter {
  convert(format: string): string;
}

type dateDisplayProps = object;
type dateDisplayState = {
  displayText: string;
};

export default class BuetDateUI extends React.Component<
  dateDisplayProps,
  dateDisplayState
> {

  constructor(props: dateDisplayProps) {
    super(props);
    this.state = {
      displayText: "",
    };
    
  }

  updateTime() {
    if (typeof buetDateConverter === "undefined") {
        console.error(`buetDateConverter is not defined yet. Cannot update time display.`);
        return;
    }

    const data = new buetDateConverter().convert(
      "এখন সময়: l, A gটা iমিনিট sসেকেন্ড, j F, Y (বঙ্গাব্দ)",
    );
    this.setState({ displayText: data });
  }

  componentDidMount() {
    // console.log("BuetDateUI mounted, initializing time display...");
    this.setState({ displayText: "BanglaDateJS > BUETDateConverter লোড হচ্ছে …" });

    setInterval(() => {
        this.updateTime();
    }, 10000);
  }

  render() {
    return (
      <div>
        <span>
          <code className="text-sm italic text-gray-500">
            <div id="currentTime">{this.state.displayText}</div>
          </code>
        </span>

        <Script
          src="https://cdn.jsdelivr.net/gh/AhmedMRaihan/BanglaDateJS@master/src/buetDateTime.js"
          strategy="afterInteractive"
        />
      </div>
    );
  }
}
