import { create } from "zustand";

import {
  DrawList,
  DrawListItem,
  MenuKey,
  SavedListSortKey,
  ToastItem,
} from "@/types";
import { ModalItem } from "@/types/modal";

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
  clearItem: (idx: number) => void;
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
  clearItem: (idx) =>
    set((prevState) => {
      const nextList = [...prevState.drawList];
      nextList[idx] = initialDrawList[0];
      return {
        drawList: nextList as DrawList,
      };
    }),
}));

interface SavedPageState {
  sortKey: SavedListSortKey;
  setSort: (key: SavedListSortKey) => void;
}

export const useSavedPageStore = create<SavedPageState>((set) => ({
  sortKey: "CREATED_DESC",
  setSort: (key) => set(() => ({ sortKey: key })),
}));

interface ToastState {
  toastList: ToastItem[];
  initToast: () => void;
  addToast: (toast: ToastItem) => void;
  removeToast: (id: ToastItem["id"]) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toastList: [],
  initToast: () => set({ toastList: [] }),
  addToast: (toastItem) => {
    set((prevState) => ({
      toastList: [...prevState.toastList, toastItem],
    }));
  },
  removeToast: (removeId) => {
    set((prevState) => ({
      toastList: prevState.toastList.filter(
        (toastItem) => toastItem?.id !== removeId
      ),
    }));
  },
}));

interface ModalState {
  modals: ModalItem[];
  peek: () => ModalItem | null;
  clear: () => void;
  push: (modal: ModalItem) => Promise<void>;
  pop: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modals: [],
  peek: () => get().modals.at(-1) || null,
  clear: () => set({ modals: [] }),
  push: ({ component, props, options }) =>
    new Promise((resolve) => {
      const id = `${component.name}::${new Date().getTime()}`;
      const close = (value: void | PromiseLike<void>) => {
        get().pop();
        options?.onClose?.();
        resolve(value);
      };

      set((prevState) => ({
        modals: [
          ...prevState.modals,
          {
            id,
            component,
            props: { ...props, close },
            options,
          },
        ],
      }));
    }),
  pop: () => {
    set((prevState) => ({
      modals: [...prevState.modals.slice(0, -1)],
    }));
  },
}));
