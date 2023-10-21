import cx from "classnames";
import Spacer from "@/components/Spacer";
import NumberBallSet from "@/components/NumberBallSet";
import DrawActions from "@/components/DrawActions";

export default function DrawItem() {
  return (
    <div
      className={cx(
        "bg-gray-100",
        "border",
        "border-gray-200",
        "rounded-lg",
        "flex",
        "justify-around",
        "items-center",
        "px-3",
        "py-4",
        // "max-w-xl",
        /* sm */
        "max-sm:px-2",
        "max-sm:py-3"
      )}
    >
      <NumberBallSet numbers={[1, 11, 22, 33, 44, 45]} />
      <Spacer direction="horizontal" space={"2"} />
      <DrawActions />
    </div>
  );
}
