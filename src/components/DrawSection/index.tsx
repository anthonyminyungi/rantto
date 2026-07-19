import cx from "clsx";

import DrawItem from "@/components/DrawItem";
import Button from "@/components/Button";
import { db } from "@/db/savedDraw";
import { useWinningHistory } from "@/hooks/winningHistory";
import { useShareDraw } from "@/hooks/useShareDraw";
import { useToast } from "@/hooks";
import { drawAllNumbers, isDrawEmpty, isWebShareSupported } from "@/utils";
import { useDrawStore } from "@/store";
import { ICON_SIZE } from "@/constants/styles";
import { DrawList } from "@/types";

import TicketIcon from "@/assets/ticket.svg?react";
import ShareIcon from "@/assets/share.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import InboxIcon from "@/assets/inbox-arrow-down.svg?react";
import CheckCircleIcon from "@/assets/check-circle.svg?react";
import ResetIcon from "@/assets/arrow-uturn-left.svg?react";

export default function DrawSection() {
  const { drawList, drawAll, clearDraw } = useDrawStore();
  const { copied, handleShare } = useShareDraw();
  const { round: recentRound } = useWinningHistory();
  const { showToast } = useToast();

  const handleShareClick = () => handleShare(drawList);

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
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    });
    clearDraw();
  };

  const shareIcon = isWebShareSupported ? (
    <ShareIcon className={ICON_SIZE} />
  ) : copied ? (
    <ClipboardCheckIcon className={ICON_SIZE} />
  ) : (
    <ClipboardIcon className={ICON_SIZE} />
  );

  const shareLabel = isWebShareSupported
    ? "전체 공유"
    : copied
      ? "복사됨"
      : "전체복사";

  return (
    <div
      className={cx(
        "flex w-full flex-col items-center gap-4 py-6",
        "rounded-lg border border-gray-400 dark:border-neutral-800",
        "max-sm:px-2 max-sm:py-4"
      )}
    >
      <Button
        icon={<TicketIcon className={ICON_SIZE} />}
        onClick={handleDrawAll}
      >
        5회 뽑기
      </Button>
      <div className="w-full max-w-xl space-y-2">
        {drawList.map((item, index) => (
          <DrawItem key={index} numbers={item} index={index} />
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          icon={shareIcon}
          onClick={handleShareClick}
          disabled={isDrawEmpty(drawList) || (!isWebShareSupported && copied)}
        >
          {shareLabel}
        </Button>
        <Button
          icon={<InboxIcon className={ICON_SIZE} />}
          disabled={isDrawEmpty(drawList)}
          onClick={handleSave}
        >
          보관하기
        </Button>
        <Button
          icon={<ResetIcon className={ICON_SIZE} />}
          disabled={isDrawEmpty(drawList)}
          onClick={clearDraw}
        >
          초기화
        </Button>
      </div>
    </div>
  );
}
