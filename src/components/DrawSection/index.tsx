import { useState } from "react";
import cx from "classnames";
import Spacer from "@/components/Spacer";
import DrawItem from "@/components/DrawItem";

import TicketIcon from "@/assets/ticket.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import InboxIcon from "@/assets/inbox-arrow-down.svg?react";

export default function DrawSection() {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className={cx("flex", "justify-center", "w-full")}>
      <div
        className={cx(
          "grow",
          "flex",
          "flex-col",
          "items-center",
          "border",
          "border-gray-400",
          "max-w-2xl",
          "rounded-lg",
          "py-6",
          "px-4",
          "max-sm:px-2"
        )}
      >
        <button
          className={cx(
            "bg-blue-500",
            "py-2",
            "px-4",
            "text-white",
            "rounded-md",
            "text-xl",
            "font-semibold",
            "align-middle",
            "flex",
            "items-center",
            /* hover */
            "hover:bg-blue-600",
            "hover:transition",
            /* sm */
            "max-sm:py-1",
            "max-sm:px-2",
            "max-sm:text-lg"
          )}
        >
          <TicketIcon
            className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
          />
          &nbsp; 5회 뽑기
        </button>
        <Spacer direction="vertical" space={"4"} />
        <div>
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
        </div>
        <Spacer direction="vertical" space={"4"} />
        <div className={cx("flex")}>
          <button
            className={cx(
              "bg-blue-500",
              "py-2",
              "px-4",
              "text-white",
              "rounded-md",
              "text-xl",
              "font-semibold",
              "align-middle",
              "flex",
              "items-center",
              /* hover */
              "hover:bg-blue-600",
              "hover:transition",
              /* sm */
              "max-sm:py-1",
              "max-sm:px-2",
              "max-sm:text-lg"
            )}
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <ClipboardCheckIcon
                  className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
                />
                &nbsp;복사됨
              </>
            ) : (
              <>
                <ClipboardIcon
                  className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
                />
                &nbsp;전체복사
              </>
            )}
          </button>
          <Spacer direction="horizontal" space={"2"} />
          <button
            className={cx(
              "bg-blue-500",
              "py-2",
              "px-4",
              "text-white",
              "rounded-md",
              "text-xl",
              "font-semibold",
              "align-middle",
              "flex",
              "items-center",
              /* hover */
              "hover:bg-blue-600",
              "hover:transition",
              /* sm */
              "max-sm:py-1",
              "max-sm:px-2",
              "max-sm:text-lg"
            )}
          >
            <InboxIcon
              className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
            />
            &nbsp; 보관하기
          </button>
        </div>
      </div>
    </div>
  );
}
