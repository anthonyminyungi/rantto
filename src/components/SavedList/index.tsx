import { useState } from "react";
import cx from "clsx";
import { useLiveQuery } from "dexie-react-hooks";

import SavedItem from "@/components/SavedItem";
import { db } from "@/db/savedDraw";
import { WinningHistory } from "@/types";
import { useSavedPageStore } from "@/store";
import { SAVE_ITEM_COUNT_PER_PAGE } from "@/constants";

export default function SavedList() {
  const [page, setPage] = useState(1);
  const { sortKey, filterRank } = useSavedPageStore();
  const list = useLiveQuery(
    async () => {
      const collection = db.savedDraws.toCollection();

      let items =
        sortKey === "CREATED_DESC"
          ? await collection.reverse().sortBy("createdAt")
          : await collection.sortBy("createdAt");

      if (filterRank != null) {
        items = items.filter((item) => item.gameRanks?.includes(filterRank));
      }

      return items.slice(0, page * SAVE_ITEM_COUNT_PER_PAGE);
    },
    [sortKey, filterRank, page],
    []
  );
  const total = useLiveQuery(
    async () => {
      if (filterRank != null) {
        return db.savedDraws
          .filter((item) => !!item.gameRanks?.includes(filterRank))
          .count();
      }
      return db.savedDraws.count();
    },
    [filterRank],
    0
  );

  const historiesMap = useLiveQuery(
    async () => {
      if (!list || list.length === 0) return new Map<number, WinningHistory>();

      const roundsSet = new Set<number>();
      for (const item of list) {
        roundsSet.add(item.round);
      }
      const rounds = [...roundsSet];

      const [historyRecords, lastRecord] = await Promise.all([
        db.winningHistory.where("round").anyOf(rounds).toArray(),
        db.winningHistory.orderBy("round").last(),
      ]);

      const map = new Map<number, WinningHistory>();
      for (const record of historyRecords) {
        map.set(record.round, record as WinningHistory);
      }
      if (lastRecord && !map.has(lastRecord.round)) {
        map.set(lastRecord.round, lastRecord as WinningHistory);
      }

      return map;
    },
    [list],
    new Map<number, WinningHistory>()
  );

  const lastHistory = useLiveQuery(
    () => db.winningHistory.orderBy("round").last(),
    [],
    null
  );

  const loadMore = () => setPage((prev) => prev + 1);

  if (!list || list?.length === 0) {
    return (
      <div className="h-auto text-center font-semibold">
        {filterRank != null
          ? "해당 등수의 당첨 기록이 없습니다."
          : "보관함이 비었습니다."}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {list.map((item) => {
        const history = historiesMap.get(item.round) ?? lastHistory;
        return (
          <SavedItem
            key={item.id}
            data={item}
            wonRound={history?.round ?? 0}
            wonNumbers={history?.numbers ?? [0, 0, 0, 0, 0, 0]}
            wonBonus={history?.bonus ?? 0}
          />
        );
      })}
      {list.length < total && (
        <button
          className={cx(
            "my-4 cursor-pointer rounded-full px-6 py-4",
            "border border-gray-200 dark:border-neutral-700",
            "bg-gray-100 text-gray-500 dark:bg-neutral-900 dark:text-neutral-400",
            "hover:bg-gray-200 dark:hover:bg-neutral-800",
            "max-sm:my-2 max-sm:px-4 max-sm:py-3 max-sm:text-sm max-sm:font-normal"
          )}
          onClick={loadMore}
        >
          더 보기
        </button>
      )}
    </div>
  );
}
