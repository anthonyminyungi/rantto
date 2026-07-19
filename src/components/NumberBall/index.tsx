import cx from "clsx";
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
        "h-12 w-12 rounded-full py-1 text-center align-middle leading-10 font-semibold text-white",
        "max-sm:h-10 max-sm:w-10 max-sm:text-sm max-sm:leading-8",
        getBallBgColor(noBg ? 0 : number),
        { "opacity-35": blurred },
        { "cursor-pointer": Boolean(onClick) }
      )}
      onClick={onClick}
    >
      {number === 0 ? "" : number}
    </div>
  );
}
