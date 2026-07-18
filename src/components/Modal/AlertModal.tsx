import cx from "classnames";
import ModalItemWrapper from "./ModalItemWrapper";
import Button from "../Button";

interface AlertModalProps {
  content: string;
  close: () => void;
}

export default function AlertModal({ content, close }: AlertModalProps) {
  return (
    <ModalItemWrapper>
      <div
        className={cx(
          "bg-white",
          "border",
          "border-gray-400",
          "rounded-xl",
          "px-6",
          "py-8",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "gap-4",
          "w-80",
          "max-w-full"
        )}
      >
        <div className={cx("text-center", "font-medium", "text-lg")}>
          {content}
        </div>
        <div className={cx("flex", "mt-4")}>
          <Button onClick={close}>확인</Button>
        </div>
      </div>
    </ModalItemWrapper>
  );
}
