import { createPortal } from "react-dom";

import ToastItem from "@/components/ToastItem";
import { useToastStore } from "@/store";
import { useLayoutEffect } from "react";

export default function ToastList() {
  const { toastList } = useToastStore();
  const container = document.getElementById(
    "global-toast-container"
  ) as Element;

  useLayoutEffect(() => {
    if (toastList.length === 0) {
      container.classList.remove("active");
    } else {
      if (!container.classList.contains("active")) {
        container.classList.add("active");
      }
    }
    return () => {
      container.classList.remove("active");
    };
  }, [container.classList, toastList.length]);

  return (
    toastList.length > 0 && (
      <>
        {toastList.map((toastItem) =>
          createPortal(
            <ToastItem key={toastItem.id} {...toastItem} />,
            container
          )
        )}
      </>
    )
  );
}
