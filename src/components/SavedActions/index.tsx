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

import TrashIcon from "@/assets/trash.svg?react";
import CheckCircleIcon from "@/assets/check-circle.svg?react";

interface SavedActionsProps {
  data: SavedDraw;
}

export default function SavedActions({ data }: SavedActionsProps) {
  const { id, draws } = data;
  const { copied, handleShare, shareIcon, shareText } = useShareDraw();
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

  const actions = [
    {
      icon: shareIcon,
      text: shareText,
      onClick: handleShareClick,
      disabled: !isWebShareSupported && copied,
    },
    {
      icon: (className?: string) => <TrashIcon className={className} />,
      text: "삭제",
      onClick: handleDelete,
    },
  ];

  return (
    <div className={cx("h-fit max-sm:pt-2")}>
      <div className="sm:hidden">
        <Dropdown
          items={actions.map(({ icon, ...rest }) => ({
            icon: icon(ICON_SIZE_SM),
            ...rest,
          }))}
        />
      </div>
      <div className="max-sm:hidden">
        <ButtonGroup
          items={actions.map(({ icon, ...rest }) => ({
            icon: icon(),
            ...rest,
          }))}
        />
      </div>
    </div>
  );
}
