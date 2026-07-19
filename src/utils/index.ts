import { sampleSize, intersection } from "es-toolkit";

import { DrawList, DrawListItem, ObjectEntries } from "@/types";
import { allNumbers } from "@/constants";

export function getBallBgColor(num: number) {
  /* https://tailwindcss.com/docs/content-configuration#dynamic-class-names */
  return {
    "bg-gray-300 dark:bg-neutral-700": num === 0,
    "bg-yellow-500": num > 0 && num <= 10,
    "bg-sky-600": num > 10 && num <= 20,
    "bg-rose-600": num > 20 && num <= 30,
    "bg-zinc-500": num > 30 && num <= 40,
    "bg-lime-500": num > 40,
  };
}

export function drawNumbers(): DrawListItem {
  return sampleSize(allNumbers, 6).toSorted((a, b) => a - b) as DrawListItem;
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
  return (
    list.filter(
      (numbers) => numbers?.filter((number) => number === 0).length === 0
    ).length === 0
  );
}

export function generateDrawClipboardMsg(numbers: DrawList | DrawListItem) {
  const list = Array.isArray(numbers[0]) ? (numbers as DrawList) : [numbers];
  const numbersToText = list
    .filter((numbers) => !isDrawEmpty(numbers))
    .map(
      (numbers, index) =>
        `${list.length > 1 ? `${index + 1}게임: ` : ""}${numbers.join(", ")}`
    )
    .join("\n\n")
    .concat("\n\n나만의 당첨 번호를 뽑아보세요!\nhttps://rantto.app");
  return numbersToText;
}

export const isWebShareSupported = typeof navigator !== "undefined" && !!navigator.share;

export async function shareDrawList(
  numbers: DrawList | DrawListItem,
  onSuccess?: (type: "share" | "copy") => void
) {
  const textMessage = generateDrawClipboardMsg(numbers);
  if (isWebShareSupported) {
    try {
      await navigator.share({
        text: textMessage,
      });
      onSuccess?.("share");
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        console.error("Error sharing:", e);
      }
    }
  } else {
    try {
      await navigator.clipboard.writeText(textMessage);
      onSuccess?.("copy");
    } catch (e) {
      console.error(e);
    }
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
  const intersected = intersection(draw, won);
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

export function getRanksByDraw(
  draws: DrawListItem[],
  won: DrawListItem,
  bonus: number
): number[] {
  return draws.map((draw) => {
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
  });
}

export function formatRankText(gameRanks: number[]): string {
  const wins = gameRanks.filter((r) => r > 0);
  if (wins.length === 0) return "낙첨";

  const counts = new Map<number, number>();
  for (const rank of wins) {
    counts.set(rank, (counts.get(rank) ?? 0) + 1);
  }

  const sorted = [...counts.entries()].sort(([a], [b]) => a - b);
  const parts = sorted.map(([rank, count]) => `${rank}등 ${count}회`);
  return `${parts.join(", ")} 당첨`;
}

export function getRankBgColor(rank: number): Record<string, boolean> {
  return {
    "bg-amber-50 dark:bg-amber-950/30": rank === 1,
    "bg-slate-100 dark:bg-slate-800/30": rank === 2,
    "bg-orange-50 dark:bg-orange-950/30": rank === 3,
    "bg-sky-50 dark:bg-sky-950/30": rank === 4,
    "bg-emerald-50 dark:bg-emerald-950/30": rank === 5,
  };
}
