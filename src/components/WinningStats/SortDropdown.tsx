import { useRef, useState } from "react";
import cx from "clsx";

import { useOutsideClick } from "@/hooks";
import { SAVED_LIST_SORT_OPTIONS } from "@/constants";
import { useSavedPageStore } from "@/store";
import { entriesFromObject } from "@/utils";
import { SavedListSortKey } from "@/types";

import ArrowDownIcon from "@/assets/chevron-down.svg?react";

const sortOptions = entriesFromObject(SAVED_LIST_SORT_OPTIONS);

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { sortKey, setSort } = useSavedPageStore();

  useOutsideClick(ref, () => setIsOpen(false));

  const handleSelect = (key: SavedListSortKey) => {
    setSort(key);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        className={cx(
          "cursor-pointer flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors",
          "text-gray-500 dark:text-neutral-400",
          "hover:bg-gray-100 dark:hover:bg-neutral-800",
          "max-sm:px-2 max-sm:text-sm",
          { "bg-gray-100 dark:bg-neutral-800": isOpen }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{SAVED_LIST_SORT_OPTIONS[sortKey]}</span>
        <ArrowDownIcon
          className={cx("h-3.5 w-3.5", { "rotate-180": isOpen })}
          viewBox="0 0 24 24"
        />
      </button>
      {isOpen && (
        <ul
          className={cx(
            "absolute top-full right-0 z-50 mt-1 min-w-24 rounded-md py-1",
            "border border-gray-200 dark:border-neutral-700",
            "bg-white shadow-lg dark:bg-neutral-800"
          )}
        >
          {sortOptions.map(([key, text]) => (
            <li
              key={key}
              onClick={() => handleSelect(key)}
              className={cx(
                "cursor-pointer px-3 py-1.5 whitespace-nowrap",
                "max-sm:px-2 max-sm:py-1 max-sm:text-sm",
                {
                  "font-medium text-gray-900 dark:text-neutral-100":
                    sortKey === key,
                  "text-gray-500 hover:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-700":
                    sortKey !== key,
                }
              )}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
