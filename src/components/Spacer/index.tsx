import { SpacingKey } from "@/constants";
import cx from "classnames";

interface SpacerProps {
  direction: "vertical" | "horizontal";
  space: SpacingKey;
}

export default function Spacer({ direction, space }: SpacerProps) {
  if (direction === "horizontal") {
    return <div className={cx("h-full", `w-${space}`)} />;
  }
  return <div className={cx("w-full", `h-${space}`)} />;
}
