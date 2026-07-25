import { sampleSize } from "es-toolkit";

import { DrawList, DrawListItem } from "@/types";
import { allNumbers } from "@/constants";

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
