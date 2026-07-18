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
