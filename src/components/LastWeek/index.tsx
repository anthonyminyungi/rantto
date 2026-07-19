import cx from "clsx";

import NumberBallSet from "@/components/NumberBallSet";
import { FixedSizeArray } from "@/types";
import { useWinningHistory } from "@/hooks/winningHistory";

export default function LastWeek() {
  const { bonus, numbers, round, createdAt } = useWinningHistory();
  return (
    <div className="flex w-full justify-center">
      <div
        className={cx(
          "flex w-full flex-col items-center justify-center gap-4 py-6",
          "rounded-lg border border-gray-400 dark:border-neutral-800",
          "max-sm:py-4"
        )}
      >
        <div className="text-center">
          <p className="text-2xl font-bold max-sm:text-xl">
            지난 회차 당첨번호
          </p>
          <p>
            <a
              href="https://dhlottery.co.kr/lt645/result"
              target="_blank"
              className="rounded-md px-2 py-1 font-semibold text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-neutral-800"
            >
              {round}회
            </a>{" "}
            ({createdAt} 추첨)
          </p>
        </div>
        <NumberBallSet
          numbers={numbers as FixedSizeArray<6, number>}
          bonus={bonus}
        />
      </div>
    </div>
  );
}
