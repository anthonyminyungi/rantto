import { useState } from "react";
import cx from "classnames";

import { useToast } from "@/hooks";
import Dropdown from "@/components/Dropdown";
import ButtonGroup from "@/components/ButtonGroup";
import { SavedDraw, db } from "@/db/savedDraw";
import { copyDrawList } from "@/utils";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { overlay } from "overlay-kit";

import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import TrashIcon from "@/assets/trash.svg?react";
import CheckCircleIcon from "@/assets/check-circle.svg?react";

interface SavedActionsProps {
  data: SavedDraw;
}

export default function SavedActions({ data }: SavedActionsProps) {
  const { id, draws } = data;
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const copyToClipboard = () => {
    copyDrawList(draws, () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      showToast({
        content: "클립보드에 복사되었습니다.",
        icon: (
          <CheckCircleIcon className={cx("text-green-500", "w-6", "h-6")} />
        ),
      });
    });
  };

  const handleDelete = () => {
    if (id) {
      overlay.open(({ unmount }) => (
        <ConfirmModal
          content="정말 삭제하시겠습니까?"
          close={unmount}
          onConfirm={() => {
            db.savedDraws.delete(id);
            showToast({
              content: "보관함에서 삭제되었습니다.",
              icon: (
                <CheckCircleIcon className={cx("text-green-500", "w-6", "h-6")} />
              ),
            });
          }}
        />
      ));
    }
  };

  return (
    <div className={cx("h-fit", "max-sm:pt-2")}>
      <div className="sm:hidden">
        <Dropdown
          items={[
            {
              icon: <ClipboardIcon className={cx("w-5", "h-5")} />,
              text: "복사",
              onClick: copyToClipboard,
              disabled: copied,
            },
            {
              icon: <TrashIcon className={cx("w-5", "h-5")} />,
              text: "삭제",
              onClick: handleDelete,
            },
          ]}
        />
      </div>
      <div className="max-sm:hidden">
        <ButtonGroup
          items={[
            {
              icon: copied ? <ClipboardCheckIcon /> : <ClipboardIcon />,
              text: `복사${copied ? "됨" : ""} `,
              onClick: copyToClipboard,
              disabled: copied,
            },
            {
              icon: <TrashIcon />,
              text: "삭제",
              onClick: handleDelete,
            },
          ]}
        />
      </div>
    </div>
  );
}
