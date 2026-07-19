import cx from "clsx";

import { SavedDraw } from "@/db/savedDraw";
import { formatDate, formatRankText } from "@/utils";

interface SavedItemHeaderProps {
  id: SavedDraw["id"];
  round: number;
  createdAt: Date;
  gameRanks?: number[];
  isAfterAnnounce: boolean;
  hasWonDraw: boolean;
  rank: number;
  isExtended: boolean;
}

export default function SavedItemHeader({
  id,
  round,
  createdAt,
  gameRanks,
  isAfterAnnounce,
  hasWonDraw,
  rank,
  isExtended,
}: SavedItemHeaderProps) {
  return (
    <p
      className={cx(
        "mb-1 flex pl-2 text-gray-400 dark:text-neutral-500",
        "max-sm:pl-0 max-sm:text-sm"
      )}
    >
      <span className="px-1.5">#{id}</span>
      {"・"}
      <span className="px-1.5">{round}회</span>
      {"・"}
      <span
        className={cx("px-1.5", {
          "font-bold": isAfterAnnounce && hasWonDraw,
        })}
      >
        {!isAfterAnnounce && "추첨전"}
        {isAfterAnnounce && gameRanks && formatRankText(gameRanks)}
        {isAfterAnnounce && !gameRanks && hasWonDraw && `${rank}등당첨!`}
        {isAfterAnnounce && !gameRanks && !hasWonDraw && "낙첨"}
      </span>
      {"・"}
      <span className="px-1.5">{formatDate(createdAt, isExtended)}</span>
    </p>
  );
}
