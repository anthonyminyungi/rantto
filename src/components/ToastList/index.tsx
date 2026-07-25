import cx from "clsx";

import ToastItem from "@/components/ToastItem";
import { useToastStore } from "@/store";

export default function ToastList() {
  const { toastList } = useToastStore();

  return (
    <div
      id="global-toast-container"
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-full flex-col items-center",
        { "p-4 px-3": toastList.length > 0 }
      )}
    >
      {toastList.map((toastItem) => (
        <ToastItem key={toastItem.id} {...toastItem} />
      ))}
    </div>
  );
}
