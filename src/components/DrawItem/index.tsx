import cx from "classnames";
import NumberBallSet from "@/components/NumberBallSet";
import DrawActions from "@/components/DrawActions";
import { DrawListItem } from "@/types";

interface DrawItemProps {
  numbers: DrawListItem;
  index: number;
}

export default function DrawItem({ numbers, index }: DrawItemProps) {
  return (
    <div
      className={cx(
        "bg-white",
        "shadow-sm",
        "dark:bg-neutral-900",
        "border",
        "border-gray-200",
        "dark:border-neutral-800",
        "rounded-lg",
        "flex",
        "justify-around",
        "items-center",
        "gap-2",
        "px-3",
        "py-4",
        /* sm */
        "max-sm:px-2",
        "max-sm:py-3"
      )}
      data-testid={`draw-item-${index}`}
    >
      <NumberBallSet numbers={numbers} />
      <DrawActions index={index} />
    </div>
  );
}
