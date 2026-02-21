import { describe, expect, test, beforeEach } from "vitest";
import { LetterInformation } from "@/lib/LetterInformation";

describe("LetterInformation", () => {
  let letterInfo: LetterInformation;
  const followerIndex = 2;

  beforeEach(() => {
    letterInfo = new LetterInformation();
  });

  test("should return the correct follower value for a symbol", () => {
    const inputValue = "\u0964";
    const expectedValue = "\u002e";
    expect(letterInfo.getFollower(inputValue, followerIndex)).toBe(
      expectedValue,
    );
  });

  test("should return the correct follower value for a vowel", () => {
    const inputValue = "\u09be";
    const expectedValue = "\u0986";
    expect(letterInfo.getFollower(inputValue, followerIndex)).toBe(
      expectedValue,
    );

    const inputValue2 = "non-existent";
    const expectedValue2 = "";
    expect(letterInfo.getConsecutiveVowel(inputValue2)).toBe(expectedValue2);
  });

  test("should return the correct follower value for a consonant", () => {
    const inputValue = "\u09ac";
    const expectedValue = "\u09ad";
    expect(letterInfo.getFollower(inputValue, followerIndex)).toBe(
      expectedValue,
    );
  });

  test("should return an empty string for a non-existent letter_info value", () => {
    const inputValue = "non-existent";
    expect(letterInfo.getFollower(inputValue, followerIndex)).toBe("");
  });
});
