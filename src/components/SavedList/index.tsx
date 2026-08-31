import { useState } from "react";
import cx from "clsx";
import { useLiveQuery } from "dexie-react-hooks";

import SavedItem from "@/components/SavedItem";
import { db } from "@/db/savedDraw";
import { useSavedPageStore } from "@/store";
import { SAVE_ITEM_COUNT_PER_PAGE } from "@/constants";

export default function SavedList() {
  const [page, setPage] = useState(1);
  const { sortKey, filterRank } = useSavedPageStore();
  const limit = page * SAVE_ITEM_COUNT_PER_PAGE;

  const rawList = useLiveQuery(
    async () => {
      let collection = db.savedDraws.orderBy("createdAt");

      if (sortKey === "CREATED_DESC") {
        collection = collection.reverse();
      }

      if (filterRank != null) {
        collection = collection.filter(
          (item) => !!item.gameRanks?.includes(filterRank)
        );
      }

      // Fetch one extra item to determine if there are more pages
      return await collection.limit(limit + 1).toArray();
    },
    [sortKey, filterRank, limit],
    []
  );

  const loadMore = () => setPage((prev) => prev + 1);

  if (!rawList || rawList.length === 0) {
    return (
      <div className="h-auto text-center font-semibold">
        {filterRank != null
          ? "해당 등수의 당첨 기록이 없습니다."
          : "보관함이 비었습니다."}
      </div>
    );
  }

  const hasMore = rawList.length > limit;
  const list = rawList.slice(0, limit);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {list.map((item) => (
        <SavedItem key={item.id} data={item} />
      ))}
      {hasMore && (
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
