import { MENU_TABS, SAVED_LIST_SORT_OPTIONS } from "@/constants";

export type FixedSizeArray<N extends number, T> = N extends 0
  ? []
  : { length: N } & Array<T>;

export type Tab = [MenuKey, (typeof MENU_TABS)[MenuKey]];

export type MenuKey = keyof typeof MENU_TABS;

export type DrawListItem = FixedSizeArray<6, number>;

export type DrawList = [
  DrawListItem,
  DrawListItem,
  DrawListItem,
  DrawListItem,
  DrawListItem
];

export type SavedListSortKey = keyof typeof SAVED_LIST_SORT_OPTIONS;
