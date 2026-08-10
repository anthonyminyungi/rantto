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

  const actionItems = [
    {
      Icon: TicketIcon,
      text: "뽑기",
      onClick: handleClickDraw,
    },
    {
      Icon: ResetIcon,
      text: "초기화",
      onClick: handleClickReset,
      disabled: isDrawEmpty(currentItem),
    },
    {
      Icon: isWebShareSupported
        ? ShareIcon
        : copied
          ? ClipboardCheckIcon
          : ClipboardIcon,
      text: isWebShareSupported ? "공유" : `복사${copied ? "됨" : ""} `,
      onClick: handleShareClick,
      disabled: isDrawEmpty(currentItem) || (!isWebShareSupported && copied),
    },
    {
      Icon: WindowIcon,
      text: "선택",
      onClick: handleClickSelect,
    },
  ];

  return (
    <>
      <div className="sm:hidden">
        <Dropdown
          items={actionItems.map(({ Icon, ...rest }) => ({
            icon: <Icon className={ICON_SIZE_SM} />,
            ...rest,
            text: rest.text.trim(), // Dropdown does not need the trailing space on "복사됨 "
          }))}
        />
      </div>
      <div className="max-sm:hidden">
        <ButtonGroup
          items={actionItems.map(({ Icon, ...rest }) => ({
            icon: <Icon />,
            ...rest,
          }))}
        />
      </div>
    </>
  );
}
