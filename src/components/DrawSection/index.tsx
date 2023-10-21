import { Fragment, useState } from "react";
import cx from "classnames";

import Spacer from "@/components/Spacer";
import DrawItem from "@/components/DrawItem";
import Button from "@/components/Button";
import { drawAllNumbers } from "@/utils";
import { useDrawStore } from "@/store";
import { DrawListItem } from "@/types";

import TicketIcon from "@/assets/ticket.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import InboxIcon from "@/assets/inbox-arrow-down.svg?react";

export default function DrawSection() {
  const { drawList, drawAll } = useDrawStore();
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDrawAll = () => {
    const drawnList = drawAllNumbers();
    drawAll(drawnList);
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
          onClick={copyToClipboard}
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
        >
          보관하기
        </Button>
      </div>
    </div>
  );
}
