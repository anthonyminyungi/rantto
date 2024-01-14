import { useToastStore } from "@/store";
import { ToastItem } from "@/types";
import { RefObject, useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
};

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
