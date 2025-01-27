import cx from "classnames";
import { getBallBgColor } from "@/utils";

interface NumberBallProps {
  number: number;
  blurred?: boolean;
  noBg?: boolean;
  onClick?: () => void;
}

export default function NumberBall({
  number,
  blurred,
  noBg,
  onClick,
}: NumberBallProps) {
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
        getBallBgColor(noBg ? 0 : number),
        { "bg-opacity-35": blurred },
        { "cursor-pointer": Boolean(onClick) },
        /* sm */
        "max-sm:w-10",
        "max-sm:h-10",
        "max-sm:leading-8",
        "max-sm:text-sm"
      )}
      onClick={onClick}
    >
      {number === 0 ? "" : number}
    </div>
  );
}
