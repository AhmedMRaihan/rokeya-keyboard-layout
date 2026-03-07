
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import BuetDateUI from "@/src/components/home/buetDateUI";
import Footer from "@/src/components/common/footer";

declare global {
  interface Window {
    buetDateConverter: { new(): { convert(): string } } | undefined;
  }
}

// Mock the external class
beforeEach(() => {
  window.buetDateConverter = class {
    convert(): string {
      return `এখন সময়: সোমবার, রাত ৯টা ৩মিনিট ৪০সেকেন্ড, ১ বৈশাখ, ১৪৩১ (বঙ্গাব্দ)`;
    }
  };
});

afterEach(() => {
  window.buetDateConverter = undefined;
});

describe("Date UI render", () => {
  test("should load current time", async () => {
    render(<BuetDateUI />);

    // First: loading text should be visible immediately
    expect(screen.getByText(/BanglaDateJS > BUETDateConverter/i)).toBeInTheDocument();

    // Then: wait for loading text to disappear
    await waitForElementToBeRemoved(() =>
      screen.getByText(/BanglaDateJS > BUETDateConverter/i)
    );

    // Finally: real content should be visible
    expect(screen.getByText(/এখন সময়/i)).toBeInTheDocument();
  });
});

describe("Footer render", () => {
  test("should load footer", () => {
    render(<Footer />);

    const homeLinkElement = screen.getByText(/🏠 Home/i);
    expect(homeLinkElement).toBeInTheDocument();
  });
});
