import { RefObject, useEffect } from "react";

import { useToastStore } from "@/store";
import { ToastItem } from "@/types";

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  handler: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler(e);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [handler, ref]);
};

export const useToast = () => {
  const { addToast, removeToast } = useToastStore();

  const closeToast = (toastId: ToastItem["id"]) => {
    removeToast(toastId);
  };

  const showToast = (toastItem: ToastItem) => {
    let id: string;
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const buffer = new Uint8Array(16);
      crypto.getRandomValues(buffer);
      id = Array.from(buffer)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } else {
      id = `toast-${Date.now()}-${Math.random().toString(36).substring(2)}`;
    }

    addToast({ ...toastItem, id });
    setTimeout(() => removeToast(id), toastItem.duration ?? 3000);
  };

  return {
    closeToast,
    showToast,
  };
};
