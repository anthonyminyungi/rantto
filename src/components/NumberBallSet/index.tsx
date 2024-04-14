import cx from "classnames";

import NumberBall from "@/components/NumberBall";
import { FixedSizeArray } from "@/types";

import PlusIcon from "@/assets/plus.svg?react";

interface NumberBallSetProps {
  numbers: FixedSizeArray<6, number>;
  bonus?: number;
  intersectedNumbers?: number[];
}

export default function NumberBallSet({
  numbers,
  bonus,
  intersectedNumbers,
}: NumberBallSetProps) {
  return (
    <div
      className={cx(
        "max-w-fit",
        "grid",
        "gap-x-1",
        "grid-cols-6",
        "p-2",
        "rounded-xl",
        "bg-gray-100",
        {
          "grid-cols-8": !!bonus,
          "max-sm:gap-x-0.5": !!bonus,
        },
        "max-sm:px-1"
      )}
    >
      {numbers.map((num, idx) => (
        <NumberBall
          key={`index-${idx}::number-${num}`}
          number={num}
          blurred={intersectedNumbers && !intersectedNumbers.includes(num)}
        />
      ))}
      {bonus && (
        <>
          <div
            className={cx(
              "flex",
              "justify-center",
              "items-center",
              "text-gray-400"
            )}
          >
            <PlusIcon />
          </div>
          <NumberBall number={bonus} />
        </>
      )}
    </div>
  );
}
