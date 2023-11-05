export const spacing = [
  "px",
  "0",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96",
] as const;

export type SpacingKey = (typeof spacing)[number];

export const MOBILE_WIDTH = 576;

export const allNumbers = Array.from(Array(45), (_, index) => index + 1);

export const MENU_TABS = {
  main: "메인",
  saved: "보관함",
} as const;

export const SAVED_LIST_SORT_OPTIONS = {
  CREATED_ASC: "오래된순",
  CREATED_DESC: "최신순",
} as const;

export const SAVE_ITEM_COUNT_PER_PAGE = 10;
