export type FixedSizeArray<N extends number, T> = N extends 0
  ? []
  : { length: N } & Array<T>;

export type MenuKey = "main" | "saved";

export type DrawListItem = FixedSizeArray<6, number>;

export type DrawList = [
  DrawListItem,
  DrawListItem,
  DrawListItem,
  DrawListItem,
  DrawListItem
];
