import cx from "classnames";
import { useLiveQuery } from "dexie-react-hooks";

import SavedList from "@/components/SavedList";
import Select from "@/components/Select";
import Spacer from "@/components/Spacer";
import { SAVED_LIST_SORT_OPTIONS } from "@/constants";
import { useSavedPageStore } from "@/store";
import { entriesFromObject } from "@/utils";
import { db } from "@/db/savedDraw";

export default function SavedPage() {
  const { sortKey, setSort } = useSavedPageStore();
  const total = useLiveQuery(() => db.savedDraws.count(), [], 0);

  return (
    <div
      className={cx(
        "max-w-2xl",
        "m-auto",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
      )}
    >
      {total > 0 && (
        <div className={cx("w-full", "flex", "justify-end", "max-w-xl")}>
          <Select
            options={entriesFromObject(SAVED_LIST_SORT_OPTIONS)}
            initialValue={sortKey}
            onSelect={(selected) => setSort(selected)}
          />
        </div>
      )}
      <Spacer direction="vertical" space={"4"} />
      <SavedList />
    </div>
  );
}
