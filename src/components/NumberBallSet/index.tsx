import cx from "classnames";
import { FixedSizeArray } from "@/types";
import NumberBall from "@/components/NumberBall";

interface NumberBallSetProps {
  numbers: FixedSizeArray<6, number>;
  bonus?: number;
}

export default function NumberBallSet({ numbers, bonus }: NumberBallSetProps) {
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
        <NumberBall key={num + idx} number={num} />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <NumberBall number={bonus} />
        </>
      )}
    </div>
  );
}
