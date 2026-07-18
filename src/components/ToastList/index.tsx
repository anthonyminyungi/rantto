import cx from "classnames";

import ToastItem from "@/components/ToastItem";
import { useToastStore } from "@/store";

export default function ToastList() {
  const { toastList } = useToastStore();

  return (
    <div
      id="global-toast-container"
      className={cx(
        "fixed z-50 inset-x-0 bottom-0 mx-auto flex flex-col items-center max-w-full",
        { "p-4 px-3": toastList.length > 0 }
      )}
    >
      {toastList.map((toastItem) => (
        <ToastItem key={toastItem.id} {...toastItem} />
      ))}
    </div>
  );
}
