import cx from "classnames";
import { getBallBgColor } from "@/utils";

interface NumberBallProps {
  number: number;
  size?: "lg" | "sm";
}

export default function NumberBall({ number }: NumberBallProps) {
  return (
    <div
      className={cx(
        "leading-10",
        "py-1",
        "w-12",
        "h-12",
        "rounded-full",
        "text-center",
        "align-middle",
        "text-white",
        "font-semibold",
        getBallBgColor(number),
        /* sm */
        "max-sm:w-10",
        "max-sm:h-10",
        "max-sm:leading-8",
        "max-sm:text-sm"
      )}
    >
      {number}
    </div>
  );
}
