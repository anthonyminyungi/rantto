import { useMemo, useState } from "react";

import { MOBILE_WIDTH } from "@/constants";
import ButtonGroup from "@/components/ButtonGroup";
import Dropdown from "@/components/Dropdown";
import { useWindowSize } from "@/hooks";
import { copyDrawList, drawNumbers, isDrawEmpty } from "@/utils";
import { useDrawStore } from "@/store";
import { DrawListItem } from "@/types";

import TicketIcon from "@/assets/ticket.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
// import WindowIcon from "@/assets/window.svg?react";

interface DrawActionsProps {
  index: number;
}

export default function DrawActions({ index }: DrawActionsProps) {
  const { drawList, drawItem } = useDrawStore();
  const currentItem: DrawListItem = drawList[index];
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < MOBILE_WIDTH, [width]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyDrawList(currentItem, () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  const handleClickDraw = () => {
    const numbers = drawNumbers();
    drawItem(index, numbers);
  };

  return isMobile ? (
    <Dropdown
      items={[
        { icon: TicketIcon, text: "뽑기", onClick: handleClickDraw },
        {
          icon: ClipboardIcon,
          text: "복사",
          onClick: handleCopy,
          disabled: isDrawEmpty(currentItem),
        },
        // { icon: WindowIcon, text: "직접선택" },
      ]}
    />
  ) : (
    <ButtonGroup
      items={[
        { icon: <TicketIcon />, text: "뽑기", onClick: handleClickDraw },
        {
          icon: copied ? <ClipboardCheckIcon /> : <ClipboardIcon />,
          text: `복사${copied ? "됨" : ""} `,
          onClick: handleCopy,
          disabled: isDrawEmpty(currentItem) || copied,
        },
        // { icon: <WindowIcon />, text: "직접선택" },
      ]}
    />
  );
}
