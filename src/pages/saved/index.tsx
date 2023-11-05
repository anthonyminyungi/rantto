import cx from "classnames";
import SavedList from "@/components/SavedList";
import Select from "@/components/Select";
import Spacer from "@/components/Spacer";
import { SAVED_LIST_SORT_OPTIONS } from "@/constants";
import { useSavedPageStore } from "@/store";
import { entriesFromObject } from "@/utils";

export default function SavedPage() {
  const { sortKey, setSort } = useSavedPageStore();
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
      <div className={cx("w-full", "flex", "justify-end", "max-w-xl")}>
        <Select
          options={entriesFromObject(SAVED_LIST_SORT_OPTIONS)}
          initialValue={sortKey}
          onSelect={(selected) => setSort(selected)}
        />
      </div>
      <Spacer direction="vertical" space={"4"} />
      <SavedList />
    </div>
  );
}
