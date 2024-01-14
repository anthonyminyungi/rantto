import cx from "classnames";

import ToastItem from "@/components/ToastItem";
import { useToastStore } from "@/store";

export default function ToastList() {
  const { toastList } = useToastStore();
  return (
    toastList.length > 0 && (
      <div
        className={cx(
          "fixed",
          "m-0",
          "flex",
          "flex-col",
          "items-center",
          "max-w-full",
          "px-3",
          "pb-4",
          "bottom-0",
          "left-0",
          "right-0"
        )}
      >
        {toastList.map((toastItem) => (
          <ToastItem key={toastItem.id} {...toastItem} />
        ))}
      </div>
    )
  );
}
