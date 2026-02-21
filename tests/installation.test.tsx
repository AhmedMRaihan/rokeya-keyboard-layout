import { describe, expect, test, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ManagedTextarea from "@/src/common/managedTextarea";

/***** Tests start here */
describe("Installation", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have correct initial value", async () => {
    const placeholderID = "placeholderForTests";
    render(<ManagedTextarea id={placeholderID} rows={4} />);

    const inputNode = screen.getByRole("textbox", { name: placeholderID });
    expect(inputNode).toBeInTheDocument();
    expect(inputNode).toHaveTextContent("");
  });

  test("should propagate changes via followup function", async () => {
    const placeholderID = "placeholderForTests";
    const testKeyToSend = "a";
    let payloadToTest = false;
    const followupAction = (eventKey: string) => {
      payloadToTest = eventKey === testKeyToSend;
    };
    render(
      <ManagedTextarea
        id={placeholderID}
        rows={4}
        followupAction={followupAction}
      />,
    );

    const inputNode = screen.getByRole("textbox", { name: placeholderID });
    // inputNode.dispatchEvent(new KeyboardEvent("keydown", { key: testKeyToSend }));
    fireEvent.keyDown(inputNode, { key: testKeyToSend });

    expect(payloadToTest).toBe(true);
  });
});
