import { describe, expect, it } from "vitest";
import { getIntersectedNumbers, getHighestRankByDrawsDiff } from "../utils";
import { DrawList, DrawListItem } from "../types";

describe("getIntersectedNumbers 테스트", () => {
  const won: DrawListItem = [1, 2, 3, 4, 5, 6];
  const bonus = 7;

  it("1등: 6개 모두 일치", () => {
    const draw: DrawListItem = [1, 2, 3, 4, 5, 6];
    expect(getIntersectedNumbers(draw, won, bonus)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("2등: 5개 일치 + 보너스 번호 일치", () => {
    const draw: DrawListItem = [1, 2, 3, 4, 5, 7];
    expect(getIntersectedNumbers(draw, won, bonus)).toEqual([1, 2, 3, 4, 5, 7]);
  });

  it("3등: 5개 일치", () => {
    const draw: DrawListItem = [1, 2, 3, 4, 5, 8];
    expect(getIntersectedNumbers(draw, won, bonus)).toEqual([1, 2, 3, 4, 5]);
  });

  it("4등: 4개 일치", () => {
    const draw: DrawListItem = [1, 2, 3, 4, 8, 9];
    expect(getIntersectedNumbers(draw, won, bonus)).toEqual([1, 2, 3, 4]);
  });

  it("5등: 3개 일치", () => {
    const draw: DrawListItem = [1, 2, 3, 8, 9, 10];
    expect(getIntersectedNumbers(draw, won, bonus)).toEqual([1, 2, 3]);
  });

  it("낙첨: 2개 이하 일치", () => {
    const draw: DrawListItem = [1, 2, 8, 9, 10, 11];
    expect(getIntersectedNumbers(draw, won, bonus)).toEqual([1, 2]);
  });
});

describe("getHighestRankByDrawsDiff 테스트", () => {
  const won: DrawListItem = [1, 2, 3, 4, 5, 6];
  const bonus = 7;

  it("복수 게임 중 최고 등수가 1등일 때", () => {
    const draws: DrawList = [
      [1, 2, 3, 8, 9, 10], // 5등
      [1, 2, 3, 4, 5, 6], // 1등
      [1, 2, 8, 9, 10, 11], // 낙첨
    ];
    expect(getHighestRankByDrawsDiff(draws, won, bonus)).toBe(1);
  });

  it("복수 게임 중 최고 등수가 2등일 때", () => {
    const draws: DrawList = [
      [1, 2, 3, 4, 5, 8], // 3등
      [1, 2, 3, 4, 5, 7], // 2등
    ];
    expect(getHighestRankByDrawsDiff(draws, won, bonus)).toBe(2);
  });

  it("최고 등수가 5등일 때", () => {
    const draws: DrawList = [
      [1, 2, 3, 8, 9, 10], // 5등
      [1, 2, 8, 9, 10, 11], // 낙첨
    ];
    expect(getHighestRankByDrawsDiff(draws, won, bonus)).toBe(5);
  });

  it("모두 낙첨일 때", () => {
    const draws: DrawList = [
      [1, 2, 8, 9, 10, 11], // 낙첨
      [8, 9, 10, 11, 12, 13], // 낙첨
    ];
    expect(getHighestRankByDrawsDiff(draws, won, bonus)).toBe(-1);
  });
});
