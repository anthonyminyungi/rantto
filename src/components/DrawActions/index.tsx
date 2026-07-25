import ButtonGroup from "@/components/ButtonGroup";
import Dropdown from "@/components/Dropdown";
import ManualSelectModal from "@/components/Modal/ManualSelectModal";
import { useShareDraw } from "@/hooks/useShareDraw";
import { drawNumbers, isDrawEmpty, isWebShareSupported } from "@/utils";
import { useDrawStore } from "@/store";
import { overlay } from "overlay-kit";
import { ICON_SIZE_SM } from "@/constants/styles";

import TicketIcon from "@/assets/ticket.svg?react";
import ShareIcon from "@/assets/share.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import ResetIcon from "@/assets/arrow-uturn-left.svg?react";
import WindowIcon from "@/assets/window.svg?react";

interface DrawActionsProps {
  index: number;
}

export default function DrawActions({ index }: DrawActionsProps) {
  const { drawList, drawItem, clearItem } = useDrawStore();
  const currentItem = drawList[index];
  const { copied, handleShare } = useShareDraw();

  const handleShareClick = () => handleShare(currentItem);

  const handleClickDraw = () => {
    const numbers = drawNumbers();
    drawItem(index, numbers);
  };

  const handleClickReset = () => clearItem(index);

  const handleClickSelect = () => {
    overlay.open(({ unmount }) => (
      <ManualSelectModal drawIdx={index} close={unmount} />
    ));
  };

  const shareIcon = isWebShareSupported ? (
    <ShareIcon className={ICON_SIZE_SM} />
  ) : (
    <ClipboardIcon className={ICON_SIZE_SM} />
  );

  return (
    <>
      <div className="sm:hidden">
        <Dropdown
          items={[
            {
              icon: <TicketIcon className={ICON_SIZE_SM} />,
              text: "뽑기",
              onClick: handleClickDraw,
            },
            {
              icon: <ResetIcon className={ICON_SIZE_SM} />,
              text: "초기화",
              onClick: handleClickReset,
              disabled: isDrawEmpty(currentItem),
            },
            {
              icon: shareIcon,
              text: isWebShareSupported ? "공유" : "복사",
              onClick: handleShareClick,
              disabled: isDrawEmpty(currentItem),
            },
            {
              icon: <WindowIcon className={ICON_SIZE_SM} />,
              text: "선택",
              onClick: handleClickSelect,
            },
          ]}
        />
      </div>
      <div className="max-sm:hidden">
        <ButtonGroup
          items={[
            { icon: <TicketIcon />, text: "뽑기", onClick: handleClickDraw },
            {
              icon: <ResetIcon />,
              text: "초기화",
              onClick: handleClickReset,
              disabled: isDrawEmpty(currentItem),
            },
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
              disabled:
                isDrawEmpty(currentItem) || (!isWebShareSupported && copied),
            },
            {
              icon: <WindowIcon />,
              text: "선택",
              onClick: handleClickSelect,
            },
          ]}
        />
      </div>
    </>
  );
}
