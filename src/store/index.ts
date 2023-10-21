import { create } from "zustand";
import { MenuKey } from "@/types";

interface MenuState {
  menu: MenuKey;
  setMenu: (menu: MenuKey) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menu: "main",
  setMenu: (selected) => set(() => ({ menu: selected })),
}));
