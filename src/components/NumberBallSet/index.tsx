import cx from "clsx";

import NumberBall from "@/components/NumberBall";
import { FixedSizeArray } from "@/types";
import { getRankBadge } from "@/utils";

import PlusIcon from "@/assets/plus.svg?react";

interface NumberBallSetProps {
  numbers: FixedSizeArray<6, number>;
  bonus?: number;
  intersectedNumbers?: number[];
  rank?: number;
}

export default function NumberBallSet({
  numbers,
  bonus,
  intersectedNumbers,
  rank,
}: NumberBallSetProps) {
  const badge = rank != null ? getRankBadge(rank) : null;

  return (
    <div className="relative max-w-fit">
      {badge && (
        <span className="absolute top-1 -left-1 z-10 leading-none drop-shadow-sm">
          {badge}
        </span>
      )}
      <div
        className={cx("grid grid-cols-6 gap-x-1 rounded-xl p-2 max-sm:px-1", {
          "grid-cols-8 max-sm:gap-x-0.5": !!bonus,
        })}
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
            <div className="flex items-center justify-center text-gray-400 dark:text-neutral-500">
              <PlusIcon />
            </div>
            <NumberBall number={bonus} />
          </>
        )}
      </div>
    </div>
  );
}
