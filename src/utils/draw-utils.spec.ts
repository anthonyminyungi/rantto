import { describe, expect, it } from "vitest";
import { DrawList, DrawListItem } from "@/types";
import { drawNumbers, drawAllNumbers, isDrawEmpty } from "./index";

describe("drawNumbers 테스트", () => {
  it("6개의 숫자를 반환해야 한다", () => {
    const numbers = drawNumbers();
    expect(numbers).toHaveLength(6);
  });

  it("1에서 45 사이의 숫자를 반환해야 한다", () => {
    const numbers = drawNumbers();
    numbers.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(45);
    });
  });

  it("숫자들이 오름차순으로 정렬되어 있어야 한다", () => {
    const numbers = drawNumbers();
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });

  it("중복된 숫자가 없어야 한다", () => {
    const numbers = drawNumbers();
    const unique = new Set(numbers);
    expect(unique.size).toBe(6);
  });
});

describe("isDrawEmpty", () => {
  it("should return true when a single item has all zeros", () => {
    const emptyItem: DrawListItem = [0, 0, 0, 0, 0, 0];
    expect(isDrawEmpty(emptyItem)).toBe(true);
  });

  it("should return false when a single item has no zeros", () => {
    const filledItem: DrawListItem = [1, 2, 3, 4, 5, 6];
    expect(isDrawEmpty(filledItem)).toBe(false);
  });

  it("should return true when a single item has some zeros", () => {
    const partialItem: DrawListItem = [1, 2, 0, 4, 0, 6];
    expect(isDrawEmpty(partialItem)).toBe(true);
  });

  it("should return true when a list has all empty items", () => {
    const emptyList: DrawList = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(isDrawEmpty(emptyList)).toBe(true);
  });

  it("should return true when a list has items with some zeros", () => {
    const partialList: DrawList = [
      [1, 2, 0, 4, 0, 6],
      [0, 0, 0, 0, 0, 0],
      [1, 0, 3, 0, 5, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 4, 0, 6],
    ];
    expect(isDrawEmpty(partialList)).toBe(true);
  });

  it("should return false when a list has at least one valid non-empty item", () => {
    const validList: DrawList = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 2, 3, 4, 5, 6],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(isDrawEmpty(validList)).toBe(false);
  });
});

describe("drawAllNumbers 테스트", () => {
  it("5개의 게임을 반환해야 한다", () => {
    const allNumbers = drawAllNumbers();
    expect(allNumbers).toHaveLength(5);
  });

  it("각 게임은 6개의 숫자를 가져야 한다", () => {
    const allNumbers = drawAllNumbers();
    allNumbers.forEach((numbers) => {
      expect(numbers).toHaveLength(6);
    });
  });
});
