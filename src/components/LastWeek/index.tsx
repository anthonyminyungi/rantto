import cx from "classnames";

import NumberBallSet from "@/components/NumberBallSet";
import Spacer from "@/components/Spacer";
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
            {round}회 ({createdAt} 추첨)
          </p>
        </div>
        <Spacer direction="vertical" space={"4"} />
        <NumberBallSet
          numbers={numbers as FixedSizeArray<6, number>}
          bonus={bonus}
        />
      </div>
    </div>
  );
}
