import { MENU_TABS, SAVED_LIST_SORT_OPTIONS } from "@/constants";

export type FixedSizeArray<N extends number, T> = N extends 0
  ? []
  : { length: N } & Array<T>;

export type ObjectEntry<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export type ObjectEntries<T extends object> = ObjectEntry<T>[];

export type MenuKey = keyof typeof MENU_TABS;

export type Tab = ObjectEntry<typeof MENU_TABS>;

export type DrawListItem = FixedSizeArray<6, number>;

export type DrawList = [
  DrawListItem,
  DrawListItem,
  DrawListItem,
  DrawListItem,
  DrawListItem
];

export type SavedListSortKey = keyof typeof SAVED_LIST_SORT_OPTIONS;

export type WinningHistory = {
  round: number;
  numbers: DrawListItem;
  bonus: number;
  createdAt: string;
};
