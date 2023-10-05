import cx from "classnames";
import { FixedSizeArray } from "@/types";
import NumberBall from "@/components/NumberBall";

interface SixBallsProps {
  numbers: FixedSizeArray<6, number>;
}

export default function SixBalls({ numbers }: SixBallsProps) {
  return (
    <div
      className={cx(
        "max-w-fit",
        "grid",
        "grid-cols-6",
        "gap-x-1",
        "p-2",
        "rounded-xl",
        "bg-gray-100"
      )}
    >
      {numbers.map((num) => (
        <NumberBall key={num} number={num} />
      ))}
    </div>
  );
}
