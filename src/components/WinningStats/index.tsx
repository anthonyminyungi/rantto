import { useState } from "react";
import cx from "classnames";

import { useWinningStats } from "@/hooks/winningStats";
import { useSavedPageStore } from "@/store";

import ArrowDownIcon from "@/assets/chevron-down.svg?react";
import ArrowUpIcon from "@/assets/chevron-up.svg?react";

const RANK_LABELS: { rank: number; label: string }[] = [
  { rank: 1, label: "1등" },
  { rank: 2, label: "2등" },
  { rank: 3, label: "3등" },
  { rank: 4, label: "4등" },
  { rank: 5, label: "5등" },
  { rank: -1, label: "낙첨" },
];

export default function WinningStats() {
  const [isOpen, setIsOpen] = useState(false);
  const { rankCounts } = useWinningStats();
  const { filterRank, setFilterRank } = useSavedPageStore();

  const handleChipClick = (rank: number) => {
    if (filterRank === rank) {
      setFilterRank(null);
    } else {
      setFilterRank(rank);
    }
  };

  return (
    <div
      className={cx(
        "max-w-xl",
        "w-full",
        "bg-white",
        "dark:bg-neutral-900",
        "border",
        "border-gray-200",
        "dark:border-neutral-800",
        "rounded-lg",
        "overflow-hidden"
      )}
    >
      <button
        className={cx(
          "w-full",
          "flex",
          "items-center",
          "justify-between",
          "px-4",
          "py-3",
          "text-left",
          "text-gray-700",
          "dark:text-neutral-300",
          "font-semibold",
          "hover:bg-gray-50",
          "dark:hover:bg-neutral-800",
          "transition-colors",
          /* sm */
          "max-sm:px-3",
          "max-sm:py-2.5",
          "max-sm:text-sm"
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>당첨 통계</span>
        {isOpen ? (
          <ArrowUpIcon className={cx("w-4", "h-4")} viewBox="0 0 24 24" />
        ) : (
          <ArrowDownIcon className={cx("w-4", "h-4")} viewBox="0 0 24 24" />
        )}
      </button>
      {isOpen && (
        <div
          className={cx(
            "flex",
            "flex-wrap",
            "gap-2",
            "px-4",
            "pb-3",
            /* sm */
            "max-sm:px-3",
            "max-sm:pb-2.5",
            "max-sm:gap-1.5"
          )}
        >
          {RANK_LABELS.map(({ rank, label }) => {
            const count = rankCounts[rank] ?? 0;
            const isActive = filterRank === rank;
            const isDisabled = count === 0;

            return (
              <button
                key={rank}
                disabled={isDisabled}
                className={cx(
                  "px-3",
                  "py-1.5",
                  "rounded-full",
                  "text-sm",
                  "font-medium",
                  "transition-colors",
                  "border",
                  /* sm */
                  "max-sm:px-2.5",
                  "max-sm:py-1",
                  "max-sm:text-xs",
                  {
                    /* active */
                    "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent":
                      isActive,
                    /* default */
                    "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border-gray-200 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700":
                      !isActive && !isDisabled,
                    /* disabled */
                    "bg-gray-50 dark:bg-neutral-900 text-gray-300 dark:text-neutral-600 border-gray-100 dark:border-neutral-800 cursor-not-allowed":
                      isDisabled,
                  }
                )}
                onClick={() => handleChipClick(rank)}
              >
                {label} {count}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
