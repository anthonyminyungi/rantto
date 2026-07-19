import cx from "clsx";

import { useWinningStats } from "@/hooks/winningStats";
import { useSavedPageStore } from "@/store";

const RANK_LABELS: { rank: number; label: string }[] = [
  { rank: 1, label: "🥇" },
  { rank: 2, label: "🥈" },
  { rank: 3, label: "🥉" },
  { rank: 4, label: "4⃣" },
  { rank: 5, label: "5⃣" },
  { rank: -1, label: "낙첨" },
];

export default function WinningStats() {
  const { rankCounts } = useWinningStats();
  const { filterRank, setFilterRank } = useSavedPageStore();

  const handleChipClick = (rank: number) => {
    setFilterRank(filterRank === rank ? null : rank);
  };

  return (
    <div
      className={cx(
        "w-full max-w-xl rounded-lg",
        "bg-white dark:bg-neutral-900",
        "border border-gray-200 dark:border-neutral-800",
      )}
    >
      <div
        className={cx(
          "flex flex-wrap items-center gap-2 px-4 py-3",
          "max-sm:gap-1.5 max-sm:px-3 max-sm:py-2.5",
        )}
      >
        <span
          className={cx(
            "mr-1 font-semibold",
            "text-gray-700 dark:text-neutral-300",
            "max-sm:text-sm",
          )}
        >
          당첨 필터
        </span>
        {RANK_LABELS.map(({ rank, label }) => {
          const count = rankCounts[rank] ?? 0;
          const isActive = filterRank === rank;
          const isDisabled = count === 0;

          return (
            <button
              key={rank}
              disabled={isDisabled}
              className={cx(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                "max-sm:px-2.5 max-sm:py-1 max-sm:text-xs",
                {
                  "cursor-pointer border-transparent bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900":
                    isActive,
                  "cursor-pointer border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700":
                    !isActive && !isDisabled,
                  "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-600":
                    isDisabled,
                },
              )}
              onClick={() => handleChipClick(rank)}
            >
              {label} {count}
            </button>
          );
        })}
      </div>
    </div>
  );
}
