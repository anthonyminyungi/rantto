import { describe, expect, it } from "vitest";
import { getRanksByDraw, formatRankText } from "../utils";
import { DrawListItem } from "../types";

describe("getRanksByDraw 테스트", () => {
  const won: DrawListItem = [1, 2, 3, 4, 5, 6];
  const bonus = 7;

  it("각 게임별 등수를 배열로 반환", () => {
    const draws: DrawListItem[] = [
      [1, 2, 3, 4, 5, 6], // 1등
      [1, 2, 3, 4, 5, 7], // 2등
      [1, 2, 3, 4, 5, 8], // 3등
      [1, 2, 3, 4, 8, 9], // 4등
      [1, 2, 3, 8, 9, 10], // 5등
    ];
    expect(getRanksByDraw(draws, won, bonus)).toEqual([1, 2, 3, 4, 5]);
  });

  it("낙첨 게임은 -1", () => {
    const draws: DrawListItem[] = [
      [1, 2, 8, 9, 10, 11], // 낙첨
      [8, 9, 10, 11, 12, 13], // 낙첨
    ];
    expect(getRanksByDraw(draws, won, bonus)).toEqual([-1, -1]);
  });

  it("혼합 결과", () => {
    const draws: DrawListItem[] = [
      [1, 2, 3, 8, 9, 10], // 5등
      [8, 9, 10, 11, 12, 13], // 낙첨
      [1, 2, 3, 4, 5, 6], // 1등
    ];
    expect(getRanksByDraw(draws, won, bonus)).toEqual([5, -1, 1]);
  });
});

describe("formatRankText 테스트", () => {
  it("전부 낙첨", () => {
    expect(formatRankText([-1, -1, -1])).toBe("낙첨");
  });

  it("단일 등수 당첨", () => {
    expect(formatRankText([-1, 5, -1])).toBe("5등 1회 당첨");
  });

  it("복수 등수 당첨 — 높은 등수부터 나열", () => {
    expect(formatRankText([5, -1, 3, 5, -1])).toBe("3등 1회, 5등 2회 당첨");
  });

  it("모든 등수 당첨", () => {
    expect(formatRankText([1, 2, 3, 4, 5])).toBe(
      "1등 1회, 2등 1회, 3등 1회, 4등 1회, 5등 1회 당첨"
    );
  });

  it("같은 등수 여러개", () => {
    expect(formatRankText([5, 5, 5])).toBe("5등 3회 당첨");
  });
});
