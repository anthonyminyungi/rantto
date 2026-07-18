import cx from "classnames";
import ModalItemWrapper from "./ModalItemWrapper";
import Button from "../Button";

interface ConfirmModalProps {
  content: string;
  close: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  content,
  close,
  onConfirm,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <ModalItemWrapper>
      <div
        className={cx(
          "bg-white",
          "dark:bg-neutral-900",
          "border",
          "border-gray-200",
          "dark:border-neutral-700",
          "shadow-lg",
          "dark:shadow-neutral-900/50",
          "rounded-xl",
          "px-6",
          "py-8",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "gap-4",
          "w-80",
          "max-w-full",
          "text-neutral-900",
          "dark:text-neutral-100"
        )}
      >
        <div className={cx("text-center", "font-medium", "text-lg")}>
          {content}
        </div>
        <div className={cx("flex", "gap-2", "mt-4")}>
          <Button variant="secondary" onClick={close}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </div>
    </ModalItemWrapper>
  );
}
