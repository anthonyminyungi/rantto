import cx from "classnames";
import NumberBallSet from "@/components/NumberBallSet";
import Spacer from "../Spacer";

export default function LastWeek() {
  return (
    <div className={cx("flex", "justify-center", "w-full")}>
      <div
        className={cx(
          "grow",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "max-w-2xl",
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
          <p>1087회 (2023.09.30)</p>
        </div>
        <Spacer direction="vertical" space={"4"} />
        <NumberBallSet numbers={[1, 12, 23, 34, 44, 45]} bonus={21} />
      </div>
    </div>
  );
}
