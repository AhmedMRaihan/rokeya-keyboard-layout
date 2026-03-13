import { describe, expect, test, beforeEach } from "vitest";
import { LetterInformation } from "@/lib/LetterInformation";

let letterInfo = new LetterInformation();
const FOLLOWER_INDEX = 2; // Retrieves the 3rd follower in the sequence

describe("Consonants and Symbols Information", () => {
  test("should return correct follower for a symbol (।)", () => {
    // । → .
    expect(letterInfo.getFollower("\u0964", FOLLOWER_INDEX)).toBe("\u002e"); 
  });

  test("should return correct follower for a consonant (ব)", () => {
    // ব → ভ
    expect(letterInfo.getFollower("\u09ac", FOLLOWER_INDEX)).toBe("\u09ad"); 
  });

  test("should return empty string for a non-existent key", () => {
    expect(letterInfo.getFollower("non-existent", FOLLOWER_INDEX)).toBe("");
  });
});

describe("Vowels Information", () => {
  test("should return correct follower from kar-form to full-form", () => {
    // া → আ
    expect(letterInfo.getFollower("\u09be", FOLLOWER_INDEX)).toBe("\u0986"); 
  });

    // উ → ঊ
  test("should return correct follower for consecutive vowels in full-form", () => {
    expect(letterInfo.getConsecutiveVowel("\u09c1")).toBe("\u09c2");  
  });
});

describe("Digits Information", () => {
  test("should return correct follower for a number (১)", () => {
    // ১ → ২
    expect(letterInfo.getFollower("\u09e7", FOLLOWER_INDEX)).toBe("\u09e8"); 
  });
});

describe("Non-existence check", () => {
  test("should return empty string for a non-existent key", () => {
    expect(letterInfo.getFollower("non-existent", FOLLOWER_INDEX)).toBe("");
  });
})
