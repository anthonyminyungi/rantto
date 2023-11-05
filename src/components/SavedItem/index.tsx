import { useState } from "react";
import cx from "classnames";
import { format } from "date-fns";

import NumberBallSet from "@/components/NumberBallSet";
import SavedActions from "@/components/SavedActions";
import Spacer from "@/components/Spacer";
import { SavedDraw } from "@/db/savedDraw";

import ArrowDownIcon from "@/assets/chevron-down.svg?react";
import ArrowUpIcon from "@/assets/chevron-up.svg?react";

interface SavedItemProps {
  data: SavedDraw;
}

export default function SavedItem({ data }: SavedItemProps) {
  const { id, draws, round, createdAt } = data;
  const [isExtended, setExtended] = useState(false);
  return (
    <div
      className={cx(
        "max-w-xl",
        "w-full",
        "transition-all",
        "bg-gray-100",
        "border",
        "border-gray-200",
        "rounded-lg",
        "px-3",
        "py-4",
        /* sm */
        "max-sm:px-2",
        "max-sm:py-3"
      )}
    >
      <p
        className={cx(
          "flex",
          "mb-1",
          "text-gray-400",
          "pl-2",
          /* sm */
          "max-sm:text-sm",
          "max-sm:pl-0"
        )}
      >
        <span className={cx("px-1.5")}>#{id}</span>
        {"・"}
        <span className={cx("px-1.5")}>{round}회</span>
        {"・"}
        <span className={cx("px-1.5")}>추첨전</span>
        {"・"}
        <span className={cx("px-1.5")}>
          {format(createdAt, "yy.MM.dd")}에 저장
        </span>
      </p>
      <div className={cx("flex", "my-2", "justify-around")}>
        <div className={cx("flex", "flex-col")}>
          <NumberBallSet numbers={draws[0]} />
          {isExtended && (
            <>
              {draws.slice(1).map((arr, index) => (
                <NumberBallSet key={index} numbers={arr} />
              ))}
            </>
          )}
        </div>
        <SavedActions data={data} />
      </div>
      <hr className="my-1" />
      {draws.length - 1 > 0 && (
        <div
          className={cx(
            "-mx-3",
            "-mb-3",
            "mt-1",
            "py-1",
            "text-center",
            "text-gray-500",
            "cursor-pointer",
            "flex",
            "justify-center",
            "items-center",
            /* sm */
            "max-sm:-mx-2",
            "max-sm:-mb-2.5",
            "max-sm:text-sm"
          )}
          onClick={() => {
            setExtended((prev) => !prev);
          }}
        >
          {isExtended ? (
            <>
              <span>접기</span>
              <Spacer direction="horizontal" space="1" />
              <ArrowUpIcon className={cx("w-4", "h-4")} viewBox="0 0 24 24" />
            </>
          ) : (
            <>
              <span>{`외 ${draws.length - 1}개 더 보기`}</span>
              <Spacer direction="horizontal" space="1" />
              <ArrowDownIcon className={cx("w-4", "h-4")} viewBox="0 0 24 24" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
