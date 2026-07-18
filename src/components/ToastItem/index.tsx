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
        "font-semibold",
        "transition-all",
        "mt-2",
        "px-3",
        "py-3",
        "border",
        "rounded-lg",
        "max-w-full",
        "border-gray-400",
        "shadow-lg",
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
