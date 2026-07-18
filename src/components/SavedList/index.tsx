import { useState } from "react";
import cx from "classnames";
import { useLiveQuery } from "dexie-react-hooks";

import SavedItem from "@/components/SavedItem";
import { db } from "@/db/savedDraw";
import { useSavedPageStore } from "@/store";
import { SAVE_ITEM_COUNT_PER_PAGE } from "@/constants";

export default function SavedList() {
  const [page, setPage] = useState(1);
  const { sortKey } = useSavedPageStore();
  const list = useLiveQuery(
    async () => {
      const collection = db.savedDraws
        .toCollection()
        .limit(page * SAVE_ITEM_COUNT_PER_PAGE);
      if (sortKey === "CREATED_DESC") {
        return collection.reverse().sortBy("createdAt");
      }
      return collection.sortBy("createdAt");
    },
    [sortKey, page],
    []
  );
  const total = useLiveQuery(() => db.savedDraws.count(), [], 0);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (!list || list?.length === 0) {
    return (
      <div className={cx("h-auto", "text-center", "font-semibold")}>
        보관함이 비었습니다.
      </div>
    );
  }

  return (
    <div className={cx("w-full", "flex", "flex-col", "items-center", "gap-2")}>
      {list.map((item) => (
        <SavedItem key={item.id} data={item} />
      ))}
      {list.length < total && (
        <button
          className={cx(
            "border",
            "border-gray-200",
            "dark:border-neutral-700",
            "bg-gray-100",
            "dark:bg-neutral-900",
            "text-gray-500",
            "dark:text-neutral-400",
            "px-6",
            "py-4",
            "my-4",
            "rounded-full",
            /* hover */
            "hover:bg-gray-200",
            "dark:hover:bg-neutral-800",
            /* sm */
            "max-sm:px-4",
            "max-sm:py-3",
            "max-sm:font-normal",
            "max-sm:text-sm",
            "max-sm:my-2"
          )}
          onClick={loadMore}
        >
          더 보기
        </button>
      )}
    </div>
  );
}
