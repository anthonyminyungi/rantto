import cx from "classnames";

import NumberBallSet from "@/components/NumberBallSet";
import { FixedSizeArray } from "@/types";
import { useWinningHistory } from "@/hooks/winningHistory";

export default function LastWeek() {
  const { bonus, numbers, round, createdAt } = useWinningHistory();
  return (
    <div className={cx("flex", "justify-center", "w-full")}>
      <div
        className={cx(
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "gap-4",
          "w-full",
          "py-6",
          "border",
          "border-gray-400",
          "rounded-lg",
          /* sm */
          "max-sm:py-4"
        )}
      >
        <div className={cx("text-center")}>
          <p className={cx("font-bold", "text-2xl", "max-sm:text-xl")}>
            지난 회차 당첨번호
          </p>
          <p>
            <a
              href="https://dhlottery.co.kr/lt645/result"
              target="_blank"
              className={cx(
                "text-blue-600",
                "font-semibold",
                "px-2",
                "py-1",
                "rounded-md",
                /* hover */
                "hover:bg-gray-100"
              )}
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
