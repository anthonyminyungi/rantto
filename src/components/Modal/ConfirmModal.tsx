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
