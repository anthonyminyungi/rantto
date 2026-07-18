import { RefObject, useEffect } from "react";

import { useToastStore } from "@/store";
import { ToastItem } from "@/types";


export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
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
    const id = String(new Date().getTime());
    addToast({ ...toastItem, id });
    setTimeout(() => removeToast(id), toastItem.duration ?? 3000);
  };

  return {
    closeToast,
    showToast,
  };
};
