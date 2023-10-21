import cx from "classnames";
import SavedList from "@/components/SavedList";
import Select from "@/components/Select";
import Spacer from "@/components/Spacer";

export default function SavedPage() {
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
          options={[
            ["created_asc", "오래된순"],
            ["created_desc", "최신순"],
          ]}
        />
      </div>
      <Spacer direction="vertical" space={"4"} />
      <SavedList />
    </div>
  );
}
