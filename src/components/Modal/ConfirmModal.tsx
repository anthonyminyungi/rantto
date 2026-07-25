import cx from "clsx";
import ModalItemWrapper from "./ModalItemWrapper";
import Button from "../Button";
import { MODAL_PANEL_STYLES } from "@/constants/styles";

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
          MODAL_PANEL_STYLES,
          "flex w-80 max-w-full flex-col items-center justify-center gap-4 px-6 py-8"
        )}
      >
        <div className="text-center text-lg font-medium">{content}</div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" onClick={close}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </div>
    </ModalItemWrapper>
  );
}
