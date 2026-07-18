import cx from "classnames";

import { ToastItem } from "@/types";
import { useToast } from "@/hooks";

import CloseIcon from "@/assets/x-mark.svg?react";

export default function ToastListItem({ id, icon, content }: ToastItem) {
  const { closeToast } = useToast();
  return (
    <div
      className={cx(
        "bg-white",
        "dark:bg-neutral-900",
        "text-neutral-900",
        "dark:text-neutral-100",
        "font-semibold",
        "transition-all",
        "mt-2",
        "px-3",
        "py-3",
        "border",
        "border-gray-400",
        "dark:border-neutral-700",
        "rounded-lg",
        "max-w-full",
        "shadow-lg",
        "dark:shadow-neutral-900/50",
        "flex",
        "justify-center",
        "items-center",
        "gap-2",
        /* sm */
        "max-sm:text-sm"
      )}
    >
      {icon}
      {content}
      <button aria-label="닫기" onClick={() => closeToast(id)}>
        <CloseIcon className={cx("w-5", "h-5")} />
      </button>
    </div>
  );
}
