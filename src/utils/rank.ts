import { intersection } from "es-toolkit";

import { DrawList, DrawListItem } from "@/types";

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

  const highest = Math.min(...wins);
  if (wins.length === 1) return `${highest}등 당첨!`;
  return `${highest}등 외 ${wins.length - 1}회 당첨!`;
}

export function getRankBadge(rank: number): string | null {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    case 4:
      return "4⃣";
    case 5:
      return "5⃣";
    default:
      return null;
  }
}
