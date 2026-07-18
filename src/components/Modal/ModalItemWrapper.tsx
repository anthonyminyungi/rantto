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
          className={cx("fixed", "inset-0", "z-40", {
            "backdrop-blur-xs": backdrop === "blur-sm",
            "bg-black/30": backdrop === "dimmed",
          })}
        />
      )}
      <div
        className={cx(
          "fixed",
          "inset-0",
          "z-50",
          { "modal-center": center }
        )}
      >
        {children}
      </div>
    </>
  );
}
