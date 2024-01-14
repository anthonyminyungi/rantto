import cx from "classnames";

import Spacer from "@/components/Spacer";
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
        /* sm */
        "max-sm:text-sm"
      )}
    >
      {icon && (
        <>
          {icon}
          <Spacer direction="horizontal" space="2" />
        </>
      )}
      {content}
      <Spacer direction="horizontal" space="2" />
      <button onClick={() => closeToast(id)}>
        <CloseIcon className={cx("w-5", "h-5")} />
      </button>
    </div>
  );
}
