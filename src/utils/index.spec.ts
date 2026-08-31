import { describe, it, expect } from "vitest";
import { getBallBgColor, entriesFromObject, formatDate } from "./index";

describe("getBallBgColor", () => {
  it("returns gray/neutral for 0", () => {
    expect(getBallBgColor(0)).toEqual({
      "bg-gray-300 dark:bg-neutral-700": true,
      "bg-yellow-500": false,
      "bg-sky-600": false,
      "bg-rose-600": false,
      "bg-zinc-500": false,
      "bg-lime-500": false,
    });
  });

  it("returns yellow for 1 to 10", () => {
    const expected = {
      "bg-gray-300 dark:bg-neutral-700": false,
      "bg-yellow-500": true,
      "bg-sky-600": false,
      "bg-rose-600": false,
      "bg-zinc-500": false,
      "bg-lime-500": false,
    };
    expect(getBallBgColor(1)).toEqual(expected);
    expect(getBallBgColor(10)).toEqual(expected);
  });

  it("returns sky for 11 to 20", () => {
    const expected = {
      "bg-gray-300 dark:bg-neutral-700": false,
      "bg-yellow-500": false,
      "bg-sky-600": true,
      "bg-rose-600": false,
      "bg-zinc-500": false,
      "bg-lime-500": false,
    };
    expect(getBallBgColor(11)).toEqual(expected);
    expect(getBallBgColor(20)).toEqual(expected);
  });

  it("returns rose for 21 to 30", () => {
    const expected = {
      "bg-gray-300 dark:bg-neutral-700": false,
      "bg-yellow-500": false,
      "bg-sky-600": false,
      "bg-rose-600": true,
      "bg-zinc-500": false,
      "bg-lime-500": false,
    };
    expect(getBallBgColor(21)).toEqual(expected);
    expect(getBallBgColor(30)).toEqual(expected);
  });

  it("returns zinc for 31 to 40", () => {
    const expected = {
      "bg-gray-300 dark:bg-neutral-700": false,
      "bg-yellow-500": false,
      "bg-sky-600": false,
      "bg-rose-600": false,
      "bg-zinc-500": true,
      "bg-lime-500": false,
    };
    expect(getBallBgColor(31)).toEqual(expected);
    expect(getBallBgColor(40)).toEqual(expected);
  });

  it("returns lime for > 40", () => {
    const expected = {
      "bg-gray-300 dark:bg-neutral-700": false,
      "bg-yellow-500": false,
      "bg-sky-600": false,
      "bg-rose-600": false,
      "bg-zinc-500": false,
      "bg-lime-500": true,
    };
    expect(getBallBgColor(41)).toEqual(expected);
    expect(getBallBgColor(45)).toEqual(expected);
  });
});

describe("entriesFromObject", () => {
  it("returns correct entries from a mock object", () => {
    const obj = { a: 1, b: "two" };
    const entries = entriesFromObject(obj);
    expect(entries).toEqual([
      ["a", 1],
      ["b", "two"],
    ]);
  });

  it("handles empty objects", () => {
    expect(entriesFromObject({})).toEqual([]);
  });
});

describe("formatDate", () => {
  it("formats date without extended flag", () => {
    const date = new Date(2023, 0, 5, 4, 3, 2);
    expect(formatDate(date, false)).toBe("23.01.05");
  });

  it("formats date with extended flag", () => {
    const date = new Date(2023, 0, 5, 4, 3, 2);
    expect(formatDate(date, true)).toBe("23.01.05 04:03:02");
  });

  it("formats correctly without padding", () => {
    const date = new Date(2024, 11, 15, 14, 23, 52);
    expect(formatDate(date, true)).toBe("24.12.15 14:23:52");
  });

  it('formats exactly midnight (00:00:00) with proper zero-padding', () => {
    const date = new Date(2024, 0, 1, 0, 0, 0);
    expect(formatDate(date, true)).toBe('24.01.01 00:00:00');
  });

  it('formats the last second of the day (23:59:59)', () => {
    const date = new Date(2023, 11, 31, 23, 59, 59);
    expect(formatDate(date, true)).toBe('23.12.31 23:59:59');
  });

  it('formats a leap year date (Feb 29)', () => {
    const date = new Date(2024, 1, 29, 12, 0, 0);
    expect(formatDate(date, true)).toBe('24.02.29 12:00:00');
  });
});
