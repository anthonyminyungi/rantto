import cx from "classnames";

import DrawSection from "@/components/DrawSection";
import LastWeek from "@/components/LastWeek";
import Spacer from "@/components/Spacer";

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
      <LastWeek />
      <Spacer direction="vertical" space={"4"} />
      <DrawSection />
    </div>
  );
}
