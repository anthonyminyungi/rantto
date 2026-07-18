import cx from "classnames";

import DrawSection from "@/components/DrawSection";
import LastWeek from "@/components/LastWeek";
import InfoLink from "@/components/InfoLink";

export default function MainPage() {
  return (
    <div
      className={cx(
        "max-w-2xl",
        "m-auto",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "gap-4"
      )}
    >
      <div className={cx("my-6", "m-auto")}>
        <InfoLink />
      </div>
      <LastWeek />
      <DrawSection />
    </div>
  );
}
