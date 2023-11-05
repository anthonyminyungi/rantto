import _sampleSize from "lodash/sampleSize";
import _sortBy from "lodash/sortBy";
import _isEmpty from "lodash/isEmpty";
import _intersection from "lodash/intersection";

import { DrawList, DrawListItem, ObjectEntries } from "@/types";
import { allNumbers } from "@/constants";

export function getBallBgColor(num: number) {
  /* https://tailwindcss.com/docs/content-configuration#dynamic-class-names */
  return {
    "bg-gray-300": num === 0,
    "bg-yellow-500": num > 0 && num <= 10,
    "bg-sky-500": num > 10 && num <= 20,
    "bg-rose-500": num > 20 && num <= 30,
    "bg-zinc-500": num > 30 && num <= 40,
    "bg-lime-500": num > 40,
  };
}

export function drawNumbers(): DrawListItem {
  return _sortBy(_sampleSize(allNumbers, 6)) as DrawListItem;
}

export function drawAllNumbers(): DrawList {
  const res = [];
  for (let i = 0; i < 5; i++) {
    res[i] = drawNumbers();
  }
  return res as DrawList;
}

export function isDrawEmpty(numbers: DrawList | DrawListItem) {
  const list = Array.isArray(numbers[0]) ? (numbers as DrawList) : [numbers];
  return _isEmpty(
    list.filter(
      (numbers) => numbers?.filter((number) => number === 0).length === 0
    )
  );
}

export async function copyDrawList(
  numbers: DrawList | DrawListItem,
  onCopy?: () => void
) {
  const list = Array.isArray(numbers[0]) ? (numbers as DrawList) : [numbers];
  const numbersToText = list
    .filter((numbers) => !isDrawEmpty(numbers))
    .map((numbers, index) => `${index + 1}게임: ${numbers.join(", ")}`)
    .join("\n\n");
  /* TODO: 유입 유도용 템플릿 메시지 추가 */
  try {
    await navigator.clipboard.writeText(numbersToText);
  } catch (e) {
    console.error(e);
  } finally {
    onCopy?.();
  }
}

export function entriesFromObject<T extends object>(obj: T): ObjectEntries<T> {
  return Object.entries(obj) as ObjectEntries<T>;
}

export function getIntersectedNumbers(
  draw: DrawListItem,
  won: DrawListItem,
  bonus: number
): number[] {
  const intersected = _intersection(draw, won);
  if (intersected.length === 6) {
    return draw;
  } else if (intersected.length === 5 && draw.includes(bonus)) {
    return [...intersected, bonus];
  } else {
    return intersected;
  }
}

export function getHighestRankByDrawsDiff(
  draws: DrawList,
  won: DrawListItem,
  bonus: number
): number {
  const ranks = draws
    .map((draw) => {
      const intersected = getIntersectedNumbers(draw, won, bonus);
      const hasBonus = intersected.includes(bonus);
      switch (intersected.length) {
        case 6:
          return hasBonus ? 2 : 1;
        case 5:
          return 3;
        case 4:
          return 4;
        case 3:
          return 5;
        default:
          return -1;
      }
    })
    .filter((rank) => rank > 0);
  return ranks.length > 0 ? Math.min(...ranks) : -1;
}
