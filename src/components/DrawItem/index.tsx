import cx from "clsx";

import NumberBallSet from "@/components/NumberBallSet";
import DrawActions from "@/components/DrawActions";
import { CARD_STYLES } from "@/constants/styles";
import { DrawListItem } from "@/types";

interface DrawItemProps {
  numbers: DrawListItem;
  index: number;
}

export default function DrawItem({ numbers, index }: DrawItemProps) {
  return (
    <div
      className={cx(
        CARD_STYLES,
        "flex items-center justify-around gap-2 px-3 py-4",
        "max-sm:px-2 max-sm:py-3"
      )}
      data-testid={`draw-item-${index}`}
    >
      <NumberBallSet numbers={numbers} />
      <DrawActions index={index} />
    </div>
  );
}
