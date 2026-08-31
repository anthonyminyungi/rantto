import { sampleSize } from "es-toolkit";

import { DrawList, DrawListItem } from "@/types";
import { allNumbers } from "@/constants";

export function drawNumbers(): DrawListItem {
  return sampleSize(allNumbers, 6).toSorted((a, b) => a - b) as DrawListItem;
}

export function drawAllNumbers(): DrawList {
  return [
    drawNumbers(),
    drawNumbers(),
    drawNumbers(),
    drawNumbers(),
    drawNumbers(),
  ] as DrawList;
}

export function isDrawEmpty(numbers: DrawList | DrawListItem) {
  if ((numbers as unknown[]).length === 0) return true;
  const list = Array.isArray(numbers[0]) ? (numbers as DrawList) : [numbers];
  return (
    list.filter(
      (numbers) => numbers?.filter((number) => number === 0).length === 0
    ).length === 0
  );
}
