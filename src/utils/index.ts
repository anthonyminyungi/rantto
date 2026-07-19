import { ObjectEntries } from "@/types";

export { drawNumbers, drawAllNumbers, isDrawEmpty } from "./draw";
export {
  getIntersectedNumbers,
  getHighestRankByDrawsDiff,
  getRanksByDraw,
  formatRankText,
  getRankBadge,
} from "./rank";
export {
  generateDrawClipboardMsg,
  isWebShareSupported,
  shareDrawList,
} from "./share";

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

export function entriesFromObject<T extends object>(obj: T): ObjectEntries<T> {
  return Object.entries(obj) as ObjectEntries<T>;
}

export function formatDate(date: Date, extended: boolean): string {
  const y = String(date.getFullYear()).slice(2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  if (!extended) return `${y}.${m}.${d}`;
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}.${m}.${d} ${h}:${min}:${s}`;
}
