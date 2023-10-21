import cx from "classnames";
import Spacer from "@/components/Spacer";
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
        "bg-gray-100",
        "border",
        "border-gray-200",
        "rounded-lg",
        "flex",
        "justify-around",
        "items-center",
        "px-3",
        "py-4",
        /* sm */
        "max-sm:px-2",
        "max-sm:py-3"
      )}
    >
      <NumberBallSet numbers={numbers} />
      <Spacer direction="horizontal" space={"2"} />
      <DrawActions index={index} />
    </div>
  );
}
