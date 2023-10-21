import _sampleSize from "lodash/sampleSize";
import _sortBy from "lodash/sortBy";

import { FixedSizeArray } from "@/types";
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

export function drawNumbers(): FixedSizeArray<6, number> {
  return _sortBy(_sampleSize(allNumbers, 6)) as FixedSizeArray<6, number>;
}

export function drawAllNumbers(): FixedSizeArray<5, FixedSizeArray<6, number>> {
  const res = [];
  for (let i = 0; i < 5; i++) {
    res[i] = drawNumbers();
  }
  return res as FixedSizeArray<5, FixedSizeArray<6, number>>;
}
