import cx from "clsx";

import { ToastItem } from "@/types";
import { useToast } from "@/hooks";

import CloseIcon from "@/assets/x-mark.svg?react";

export default function ToastListItem({ id, icon, content }: ToastItem) {
  const { closeToast } = useToast();
  return (
    <div
      className={cx(
        "mt-2 max-w-full rounded-lg px-3 py-3 font-semibold transition-colors",
        "bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
        "border border-gray-400 dark:border-neutral-700",
        "shadow-lg dark:shadow-neutral-900/50",
        "flex items-center justify-center gap-2",
        "max-sm:text-sm"
      )}
    >
      {icon}
      {content}
      <button
        aria-label="닫기"
        onClick={() => closeToast(id)}
        className="cursor-pointer"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
