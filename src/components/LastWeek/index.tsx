import cx from "classnames";
import SixBalls from "@/components/SixBalls";

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
          "max-w-3xl",
          "h-48",
          "py-6",
          "border-2",
          "border-gray-400",
          "rounded-lg"
        )}
      >
        <div className={cx("text-center")}>
          <p className={cx("font-bold", "text-2xl")}>지난 회차 당첨번호</p>
          <p>(2023.09.28)</p>
        </div>
        <SixBalls numbers={[1, 12, 23, 34, 44, 45]} />
      </div>
    </div>
  );
}
