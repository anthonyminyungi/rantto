import { useMemo, useState } from "react";
import cx from "classnames";
import { format } from "date-fns";

import NumberBallSet from "@/components/NumberBallSet";
import SavedActions from "@/components/SavedActions";
import Spacer from "@/components/Spacer";
import { SavedDraw } from "@/db/savedDraw";
import { useWinningHistory } from "@/hooks/winningHistory";
import { getHighestRankByDrawsDiff, getIntersectedNumbers } from "@/utils";

import ArrowDownIcon from "@/assets/chevron-down.svg?react";
import ArrowUpIcon from "@/assets/chevron-up.svg?react";

interface SavedItemProps {
  data: SavedDraw;
}

export default function SavedItem({ data }: SavedItemProps) {
  const { id, draws, round, createdAt } = data;
  const [isExtended, setExtended] = useState(false);
  const {
    round: wonRound,
    bonus: wonBonus,
    numbers: wonNumbers,
  } = useWinningHistory(round);
  const rank = useMemo(
    () => getHighestRankByDrawsDiff(draws, wonNumbers, wonBonus),
    [wonBonus, draws, wonNumbers]
  );

  /* 가장 최근 발표된 회차가 저장된 목표 회차와 동일할 때 */
  const isAfterAnnounce = round === wonRound;
  const hasWonDraw = rank > 0;

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
        <span
          className={cx("px-1.5", {
            "font-bold": isAfterAnnounce && hasWonDraw,
          })}
        >
          {!isAfterAnnounce && "추첨전"}
          {isAfterAnnounce && hasWonDraw && `${rank}등당첨!`}
          {isAfterAnnounce && !hasWonDraw && "낙첨"}
        </span>
        {"・"}
        <span className={cx("px-1.5")}>
          {format(createdAt, `yy.MM.dd${isExtended ? " HH:mm:ss" : ""}`)}
        </span>
      </p>
      <div className={cx("flex", "my-2", "justify-around")}>
        <div className={cx("flex", "flex-col")}>
          <NumberBallSet
            numbers={draws[0]}
            intersectedNumbers={
              isAfterAnnounce
                ? getIntersectedNumbers(draws[0], wonNumbers, wonBonus)
                : []
            }
          />
          {isExtended && (
            <>
              {draws.slice(1).map((draw, index) => (
                <NumberBallSet
                  key={index}
                  numbers={draw}
                  intersectedNumbers={
                    isAfterAnnounce
                      ? getIntersectedNumbers(draw, wonNumbers, wonBonus)
                      : []
                  }
                />
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
