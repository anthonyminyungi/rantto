import cx from "clsx";

import Dropdown from "@/components/Dropdown";
import ButtonGroup from "@/components/ButtonGroup";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { SavedDraw, db } from "@/db/savedDraw";
import { useShareDraw } from "@/hooks/useShareDraw";
import { useToast } from "@/hooks";
import { isWebShareSupported } from "@/utils";
import { overlay } from "overlay-kit";
import { ICON_SIZE_SM } from "@/constants/styles";

import ShareIcon from "@/assets/share.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import TrashIcon from "@/assets/trash.svg?react";
import CheckCircleIcon from "@/assets/check-circle.svg?react";

interface SavedActionsProps {
  data: SavedDraw;
}

export default function SavedActions({ data }: SavedActionsProps) {
  const { id, draws } = data;
  const { copied, handleShare } = useShareDraw();
  const { showToast } = useToast();

  const handleShareClick = () => handleShare(draws);

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
              icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
            });
          }}
        />
      ));
    }
  };

  const shareIcon = isWebShareSupported ? (
    <ShareIcon className={ICON_SIZE_SM} />
  ) : (
    <ClipboardIcon className={ICON_SIZE_SM} />
  );

  return (
    <div className={cx("h-fit max-sm:pt-2")}>
      <div className="sm:hidden">
        <Dropdown
          items={[
            {
              icon: shareIcon,
              text: isWebShareSupported ? "공유" : "복사",
              onClick: handleShareClick,
              disabled: !isWebShareSupported && copied,
            },
            {
              icon: <TrashIcon className={ICON_SIZE_SM} />,
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
              icon: isWebShareSupported ? (
                <ShareIcon />
              ) : copied ? (
                <ClipboardCheckIcon />
              ) : (
                <ClipboardIcon />
              ),
              text: isWebShareSupported ? "공유" : `복사${copied ? "됨" : ""} `,
              onClick: handleShareClick,
              disabled: !isWebShareSupported && copied,
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
