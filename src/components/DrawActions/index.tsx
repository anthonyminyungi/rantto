import ButtonGroup from "@/components/ButtonGroup";
import Dropdown from "@/components/Dropdown";
import ManualSelectModal from "@/components/Modal/ManualSelectModal";
import { useShareDraw } from "@/hooks/useShareDraw";
import { drawNumbers, isDrawEmpty, isWebShareSupported } from "@/utils";
import { useDrawStore } from "@/store";
import { overlay } from "overlay-kit";
import { ICON_SIZE_SM } from "@/constants/styles";

import TicketIcon from "@/assets/ticket.svg?react";
import ResetIcon from "@/assets/arrow-uturn-left.svg?react";
import WindowIcon from "@/assets/window.svg?react";

interface DrawActionsProps {
  index: number;
}

export default function DrawActions({ index }: DrawActionsProps) {
  const { drawList, drawItem, clearItem } = useDrawStore();
  const currentItem = drawList[index];
  const { copied, handleShare, shareIcon, shareText } = useShareDraw();

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
      icon: (className?: string) => <TicketIcon className={className} />,
      text: "뽑기",
      onClick: handleClickDraw,
    },
    {
      icon: (className?: string) => <ResetIcon className={className} />,
      text: "초기화",
      onClick: handleClickReset,
      disabled: isDrawEmpty(currentItem),
    },
    {
      icon: shareIcon,
      text: shareText,
      onClick: handleShareClick,
      disabled: isDrawEmpty(currentItem) || (!isWebShareSupported && copied),
    },
    {
      icon: (className?: string) => <WindowIcon className={className} />,
      text: "선택",
      onClick: handleClickSelect,
    },
  ];

  return (
    <>
      <div className="sm:hidden">
        <Dropdown
          items={actionItems.map(({ icon, ...rest }) => ({
            icon: icon(ICON_SIZE_SM),
            ...rest,
          }))}
        />
      </div>
      <div className="max-sm:hidden">
        <ButtonGroup
          items={actionItems.map(({ icon, ...rest }) => ({
            icon: icon(),
            ...rest,
          }))}
        />
      </div>
    </>
  );
}
