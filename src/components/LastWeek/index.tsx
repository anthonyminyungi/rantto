import cx from "classnames";
import NumberBallSet from "@/components/NumberBallSet";

export default function LastWeek() {
  return (
    <div className={cx("flex", "justify-center", "w-full")}>
      <div
        className={cx(
          "grow",
          "flex",
          "flex-col",
          "justify-between",
          "items-center",
          "max-w-2xl",
          "h-48",
          "py-6",
          "border-2",
          "border-gray-400",
          "rounded-lg",
          /* sm */
          "max-sm:h-40",
          "max-sm:py-4"
        )}
      >
        <div className={cx("text-center")}>
          <p className={cx("font-bold", "text-2xl", "max-sm:text-xl")}>
            지난 회차 당첨번호
          </p>
          <p>1087회 (2023.09.30)</p>
        </div>
        <NumberBallSet numbers={[1, 12, 23, 34, 44, 45]} bonus={21} />
      </div>
    </div>
  );
}
