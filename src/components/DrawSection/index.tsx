import { Fragment, useState } from "react";
import cx from "classnames";

import Spacer from "@/components/Spacer";
import DrawItem from "@/components/DrawItem";
import Button from "@/components/Button";
import { db } from "@/db/savedDraw";
import { useWinningHistory } from "@/hooks/winningHistory";
import { useToast } from "@/hooks";
import { copyDrawList, drawAllNumbers, isDrawEmpty } from "@/utils";
import { useDrawStore } from "@/store";
import { DrawList, DrawListItem } from "@/types";

import TicketIcon from "@/assets/ticket.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import InboxIcon from "@/assets/inbox-arrow-down.svg?react";
import CheckCircleIcon from "@/assets/check-circle.svg?react";
import ResetIcon from "@/assets/arrow-uturn-left.svg?react";

export default function DrawSection() {
  const { drawList, drawAll, clearDraw } = useDrawStore();
  const [copied, setCopied] = useState(false);
  const { round: recentRound } = useWinningHistory();
  const { showToast } = useToast();

  const handleCopy = () => {
    copyDrawList(drawList, () => {
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

  const handleDrawAll = () => {
    const drawnList = drawAllNumbers();
    drawAll(drawnList);
  };

  const handleSave = async () => {
    await db.savedDraws.add({
      draws: drawList.filter((item) => !isDrawEmpty(item)) as DrawList,
      round: recentRound + 1,
      createdAt: new Date(),
    });
    showToast({
      content: "보관함에 추가되었습니다.",
      icon: <CheckCircleIcon className={cx("text-green-500", "w-6", "h-6")} />,
    });
    clearDraw();
  };

  return (
    <div
      className={cx(
        "flex",
        "flex-col",
        "items-center",
        "w-full",
        "border",
        "border-gray-400",
        "rounded-lg",
        "py-6",
        /* sm */
        "max-sm:px-2",
        "max-sm:py-4"
      )}
    >
      <Button
        icon={
          <TicketIcon
            className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
          />
        }
        onClick={handleDrawAll}
      >
        5회 뽑기
      </Button>
      <Spacer direction="vertical" space={"4"} />
      <div className={cx("max-w-xl", "w-full")}>
        {Array.from(Array(drawList.length)).map((_, index) => (
          <Fragment key={index}>
            <DrawItem numbers={drawList[index] as DrawListItem} index={index} />
            {index < drawList.length - 1 && (
              <Spacer direction="vertical" space="2" />
            )}
          </Fragment>
        ))}
      </div>
      <Spacer direction="vertical" space={"4"} />
      <div className={cx("flex")}>
        <Button
          icon={
            copied ? (
              <ClipboardCheckIcon
                className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
              />
            ) : (
              <ClipboardIcon
                className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
              />
            )
          }
          onClick={handleCopy}
          disabled={isDrawEmpty(drawList) || copied}
        >
          {copied ? "복사됨" : "전체복사"}
        </Button>
        <Spacer direction="horizontal" space={"2"} />
        <Button
          icon={
            <InboxIcon
              className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
            />
          }
          disabled={isDrawEmpty(drawList)}
          onClick={handleSave}
        >
          보관하기
        </Button>
        <Spacer direction="horizontal" space={"2"} />
        <Button
          icon={
            <ResetIcon
              className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
            />
          }
          disabled={isDrawEmpty(drawList)}
          onClick={clearDraw}
        >
          초기화
        </Button>
      </div>
    </div>
  );
}
