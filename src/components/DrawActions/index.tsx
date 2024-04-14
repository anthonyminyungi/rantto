import { useMemo, useState } from "react";
import cx from "classnames";

import { MOBILE_WIDTH } from "@/constants";
import ButtonGroup from "@/components/ButtonGroup";
import Dropdown from "@/components/Dropdown";
import ManualSelectModal from "@/components/Modal/ManualSelectModal";
import { useToast, useWindowSize } from "@/hooks";
import { copyDrawList, drawNumbers, isDrawEmpty } from "@/utils";
import { useDrawStore, useModalStore } from "@/store";
import { DrawListItem } from "@/types";

import TicketIcon from "@/assets/ticket.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import CheckCircleIcon from "@/assets/check-circle.svg?react";
import ResetIcon from "@/assets/arrow-uturn-left.svg?react";
import WindowIcon from "@/assets/window.svg?react";

interface DrawActionsProps {
  index: number;
}

export default function DrawActions({ index }: DrawActionsProps) {
  const { drawList, drawItem, clearItem } = useDrawStore();
  const currentItem: DrawListItem = drawList[index];
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < MOBILE_WIDTH, [width]);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const { push } = useModalStore();

  const handleCopy = () => {
    copyDrawList(currentItem, () => {
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

  const handleClickDraw = () => {
    const numbers = drawNumbers();
    drawItem(index, numbers);
  };

  const handleClickReset = () => {
    clearItem(index);
  };

  const handleClickSelect = async () => {
    await push({
      component: ManualSelectModal,
      props: {
        drawIdx: index,
      },
    });
  };

  return isMobile ? (
    <Dropdown
      items={[
        {
          icon: <TicketIcon className={cx("w-5", "h-5")} />,
          text: "뽑기",
          onClick: handleClickDraw,
        },
        {
          icon: <ResetIcon className={cx("w-5", "h-5")} />,
          text: "초기화",
          onClick: handleClickReset,
          disabled: isDrawEmpty(currentItem),
        },
        {
          icon: <ClipboardIcon className={cx("w-5", "h-5")} />,
          text: "복사",
          onClick: handleCopy,
          disabled: isDrawEmpty(currentItem),
        },
        {
          icon: <WindowIcon className={cx("w-5", "h-5")} />,
          text: "선택",
          onClick: handleClickSelect,
        },
      ]}
    />
  ) : (
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
          icon: copied ? <ClipboardCheckIcon /> : <ClipboardIcon />,
          text: `복사${copied ? "됨" : ""} `,
          onClick: handleCopy,
          disabled: isDrawEmpty(currentItem) || copied,
        },
        {
          icon: <WindowIcon />,
          text: "선택",
          onClick: handleClickSelect,
        },
      ]}
    />
  );
}
