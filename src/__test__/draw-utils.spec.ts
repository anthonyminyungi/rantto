import { describe, expect, it } from "vitest";
import { drawNumbers } from "../utils";

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
