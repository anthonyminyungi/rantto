import { create } from "zustand";
import { DrawList, DrawListItem, MenuKey, SavedListSortKey } from "@/types";

interface MenuState {
  menu: MenuKey;
  setMenu: (menu: MenuKey) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menu: "main",
  setMenu: (selected) => set(() => ({ menu: selected })),
}));

interface DrawState {
  drawList: DrawList;
  drawItem: (idx: number, numbers: DrawListItem) => void;
  drawAll: (list: DrawList) => void;
  clearDraw: () => void;
}

const initialDrawList = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
] as DrawList;

export const useDrawStore = create<DrawState>((set) => ({
  drawList: initialDrawList,
  drawItem: (idx, numbers) =>
    set((prevState) => {
      const nextList = [...prevState.drawList];
      nextList[idx] = [...numbers] as DrawListItem;
      return {
        drawList: nextList as DrawList,
      };
    }),
  drawAll: (list) => set(() => ({ drawList: [...list] as DrawList })),
  clearDraw: () => set(() => ({ drawList: initialDrawList })),
}));

interface SavedPageState {
  sortKey: SavedListSortKey;
  setSort: (key: SavedListSortKey) => void;
}

export const useSavedPageStore = create<SavedPageState>((set) => ({
  sortKey: "CREATED_DESC",
  setSort: (key) => set(() => ({ sortKey: key })),
}));
