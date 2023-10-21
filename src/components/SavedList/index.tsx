import cx from "classnames";

import SavedItem from "@/components/SavedItem";
import Spacer from "@/components/Spacer";

export default function SavedList() {
  const list = Array.from(Array(10), () => true);

  if (list.length === 0) {
    return (
      <div className={cx("h-auto", "text-center", "font-semibold")}>
        보관함이 비었습니다.
      </div>
    );
  }

  return (
    <div className={cx("w-full", "flex", "flex-col", "items-center")}>
      {list.map((_, index) => (
        <>
          <SavedItem />
          {index < list.length - 1 && (
            <Spacer direction="vertical" space={"2"} />
          )}
        </>
      ))}
    </div>
  );
}
