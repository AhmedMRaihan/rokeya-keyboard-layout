import { describe, expect, test, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import ManagedTextarea from "@/src/components/common/managedTextarea";

describe("Keyboard Functionality", function () {
  const placeholderID = "placeholderForTests";
  render(<ManagedTextarea id={placeholderID} rows={4} />);
  const inputNode = screen.getByRole("textbox", { name: placeholderID });

  afterEach(() => {
    (inputNode as HTMLTextAreaElement).value = "";
  });

  const test_key_conversion = function (
    givenKey: string,
    expectedString: string,
    msgOnError: string,
    doAssert: boolean = true,
    ctrlKey: boolean = false,
  ) {
    fireEvent.keyDown(inputNode, { key: givenKey, ctrlKey: ctrlKey });

    if (doAssert) {
      const inputNodeValue = (inputNode as HTMLTextAreaElement).value;
      expect(inputNodeValue, msgOnError).toEqual(expectedString);
    }
  };

  test("should handle numbers and single characters", () => {
    // Regular functionality
    test_key_conversion("1", "১", "Number conversion failed");
    test_key_conversion("$", "১৳", "$ is not converted to BDT symbol");
    test_key_conversion(".", "১৳।", "। is not inserted by dot symbol");
  });

  test("should handle vowels and consonants", () => {
    // Regular functionality
    test_key_conversion("a", "আ", "আ is not inserted initially in full-form");
    test_key_conversion("k", "আক", "ক is not inserted");
    test_key_conversion("i", "আকি", "ই-কার is not inserted after a consonant");
    test_key_conversion("P", "আকিফ", "ফ is not inserted");
    test_key_conversion("Backspace", "আকি", "Backspace is not working");
  });

  test("should switch letter(s) by special combinations", () => {
    // Change by h
    test_key_conversion("k", "ক", "N/A - prep step", false);
    test_key_conversion("h", "খ", "ক is not switched to খ");
    test_key_conversion("i", "খি", "N/A - prep step", false);
    test_key_conversion(
      "i",
      "খী",
      "Vowels in car-form is not switched by typing again",
    );
    test_key_conversion(".", "খী।", "N/A - prep step", false);
    test_key_conversion(
      ".",
      "খী.",
      "। is not switched to dot by pressing it twice",
    );
    test_key_conversion(
      "A",
      "খী.অ",
      "Vowel should be inserted in full-form after a dot symbol",
    );
    test_key_conversion(
      "A",
      "খী.অঅ",
      "Vowel without any follower will be inserted in full-form",
    );
  });

  test("should conjugate letters", () => {
    test_key_conversion("k", "ক", "N/A - prep step", false);
    test_key_conversion("q", "ক্", "N/A - prep step", false);
    test_key_conversion(
      "r",
      "ক্র",
      "Consonant conjugation using hasanta is not working",
    );
    test_key_conversion(
      "Backspace",
      "ক",
      "Backspace is not auto-removing preceeding hasanta",
    );

    test_key_conversion("+", "ক্", "N/A - prep step", false);
    test_key_conversion(
      "T",
      "ক্ত",
      "Consonant conjugation using hasanta is not working",
    );
  });

  test("should handle special combinations", () => {
    test_key_conversion("s", "স", "N/A - prep step", false);
    test_key_conversion("Z", "সৎ", "N/A - prep step", false);
    test_key_conversion(
      "a",
      "সৎআ",
      `Vowels in Full form are not appearing after MANDATORY_END letters`,
    );
    test_key_conversion(
      "b",
      "সৎআ",
      "CTRL+B should not change text contents",
      true,
      true,
    );
    test_key_conversion(
      "Backspace",
      "সৎ",
      "Backspace should remove the vowel but not the MANDATORY_END letter",
    );
    test_key_conversion(
      "%",
      "সৎ",
      "Special characters should not be handled in library",
    );
  });

  test("should change language", () => {
    test_key_conversion("k", "ক", "N/A - prep step", false);
    test_key_conversion(
      "F9",
      "ক",
      "Language switching key should not change text contents",
    );
    test_key_conversion(
      "i",
      "ক",
      "Library should skip if the current language is set to en_US",
    );
    test_key_conversion(
      "m",
      "ক",
      "N/A - revert language to bn_BD",
      false,
      true,
    );
    test_key_conversion(
      "i",
      "কি",
      "Language should switch back to bn_BD and allow normal typing",
    );
  });
});
