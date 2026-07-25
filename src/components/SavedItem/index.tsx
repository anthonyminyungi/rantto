import { useMemo, useState } from "react";
import cx from "clsx";

import NumberBallSet from "@/components/NumberBallSet";
import SavedActions from "@/components/SavedActions";
import SavedItemHeader from "./SavedItemHeader";

import { SavedDraw } from "@/db/savedDraw";
import { useWinningHistory } from "@/hooks/winningHistory";
import { getHighestRankByDrawsDiff, getIntersectedNumbers } from "@/utils";
import { CARD_STYLES } from "@/constants/styles";

import ArrowDownIcon from "@/assets/chevron-down.svg?react";
import ArrowUpIcon from "@/assets/chevron-up.svg?react";

interface SavedItemProps {
  data: SavedDraw;
}

export default function SavedItem({ data }: SavedItemProps) {
  const { id, draws, round, createdAt, gameRanks } = data;
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
        CARD_STYLES,
        "w-full max-w-xl px-3 py-4 transition-colors",
        "max-sm:px-2 max-sm:py-3"
      )}
    >
      <SavedItemHeader
        id={id}
        round={round}
        createdAt={createdAt}
        gameRanks={gameRanks}
        isAfterAnnounce={isAfterAnnounce}
        hasWonDraw={hasWonDraw}
        rank={rank}
        isExtended={isExtended}
      />
      <div className="my-2 flex justify-around">
        <div className="flex flex-col">
          <NumberBallSet
            numbers={draws[0]}
            intersectedNumbers={
              isAfterAnnounce
                ? getIntersectedNumbers(draws[0], wonNumbers, wonBonus)
                : []
            }
            rank={isAfterAnnounce ? gameRanks?.[0] : undefined}
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
                  rank={isAfterAnnounce ? gameRanks?.[index + 1] : undefined}
                />
              ))}
            </>
          )}
        </div>
        <SavedActions data={data} />
      </div>
      <hr className="my-1 border-gray-200 dark:border-neutral-800" />
      {draws.length - 1 > 0 && (
        <div
          className={cx(
            "-mx-3 mt-1 -mb-3 cursor-pointer py-1 text-center",
            "text-gray-500 dark:text-neutral-400",
            "flex items-center justify-center gap-1",
            "max-sm:-mx-2 max-sm:-mb-2.5 max-sm:text-sm"
          )}
          onClick={() => setExtended((prev) => !prev)}
        >
          {isExtended ? (
            <>
              <span>접기</span>
              <ArrowUpIcon className="h-4 w-4" viewBox="0 0 24 24" />
            </>
          ) : (
            <>
              <span>{`외 ${draws.length - 1}개 더 보기`}</span>
              <ArrowDownIcon className="h-4 w-4" viewBox="0 0 24 24" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
