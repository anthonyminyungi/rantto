import cx from "classnames";

import DrawSection from "@/components/DrawSection";
import LastWeek from "@/components/LastWeek";
import Spacer from "@/components/Spacer";
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
        "items-center"
      )}
    >
      <div className={cx("my-6", "m-auto")}>
        <InfoLink />
      </div>
      <Spacer direction="vertical" space={"4"} />
      <LastWeek />
      <Spacer direction="vertical" space={"4"} />
      <DrawSection />
    </div>
  );
}
