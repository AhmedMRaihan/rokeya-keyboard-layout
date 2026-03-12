import { describe, expect, test, beforeEach } from "vitest";
import { LetterInformation } from "@/lib/LetterInformation";

describe("LetterInformation", () => {
  let letterInfo: LetterInformation;
  const FOLLOWER_INDEX = 2; // Retrieves the 3rd follower in the sequence

  beforeEach(() => {
    letterInfo = new LetterInformation();
  });

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
    test("should return correct follower for a vowel (া)", () => {
      // া → আ
      expect(letterInfo.getFollower("\u09be", FOLLOWER_INDEX)).toBe("\u0986"); 
    });

    test("should return correct follower for consecutive vowels ", () => {
      expect(letterInfo.getConsecutiveVowel("\u09c1")).toBe("\u09c2");  
    });

    test("should return empty string for a non-existent key", () => {
      expect(letterInfo.getConsecutiveVowel("non-existent")).toBe("");
    });
  });
});