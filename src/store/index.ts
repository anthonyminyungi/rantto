import { create } from "zustand";
import { DrawList, DrawListItem, MenuKey } from "@/types";

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
}

export const useDrawStore = create<DrawState>((set) => ({
  drawList: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  drawItem: (idx, numbers) =>
    set((prevState) => {
      const nextList = [...prevState.drawList];
      nextList[idx] = [...numbers] as DrawListItem;
      return {
        drawList: nextList as DrawList,
      };
    }),
  drawAll: (list) => set(() => ({ drawList: [...list] as DrawList })),
}));
