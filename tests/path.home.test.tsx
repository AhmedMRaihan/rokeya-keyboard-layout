
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import BuetDateUI from "@/src/components/home/buetDateUI";
import Footer from "@/src/components/common/footer";

describe("Date UI render", () => {
  test("should load current time", async () => {
    render(<BuetDateUI />);

    await waitFor(() => {
      const currentTimeElement = screen.getByText(
        /এখন সময়/i,
      );
      return expect(currentTimeElement).toBeInTheDocument();
    }, {
      timeout: 15000, // default is 1000
      interval: 50, // default is 50
    });

    expect(screen.getByText(/এখন সময়/i)).toBeInTheDocument();
  });
});

describe("Footer render", () => {
  test("should load footer", () => {
    render(<Footer />);

    const homeLinkElement = screen.getByText(/🏠 Home/i);
    expect(homeLinkElement).toBeInTheDocument();
  });
});
