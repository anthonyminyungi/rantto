import cx from "classnames";
import { ModalItemWrapperProps } from "@/types/modal";

export default function ModalItemWrapper({
  children,
  backdrop = "blur-sm",
  center = true,
}: ModalItemWrapperProps) {
  return (
    <>
      {backdrop !== "none" && (
        <div
          className={cx("absolute", "z-0", "w-full", "h-full", {
            "backdrop-blur-xs": backdrop === "blur-sm",
          })}
        />
      )}
      <div
        className={cx(
          { "modal-center": center },
          "absolute",
          "z-20",
          "w-full",
          "h-full",
          "max-sm:h-screen"
        )}
      >
        {children}
      </div>
    </>
  );
}
