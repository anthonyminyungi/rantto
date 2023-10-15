import cx from "classnames";
import { useMemo, useRef, useState } from "react";
import { useOutsideClick, useWindowSize } from "@/hooks";
import { MOBILE_WIDTH } from "@/constants";

import TicketIcon from "@/assets/ticket.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import WindowIcon from "@/assets/window.svg?react";

function ActionButtonGroup() {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className={cx("grid", "grid-cols-3", "p-2", "text-xs")}>
      <button
        className={cx(
          "bg-gray-400",
          "p-3",
          "text-white",
          "rounded-s-md",
          "font-semibold",
          "align-middle",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          /* hover */
          "hover:bg-gray-500",
          "hover:transition"
        )}
      >
        <TicketIcon />
        <span>뽑기</span>
      </button>
      <button
        className={cx(
          "p-3",
          "text-white",
          "font-semibold",
          "align-middle",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          { "bg-gray-500": copied, "bg-gray-400": !copied },
          /* hover */
          "hover:bg-gray-500",
          "hover:transition"
        )}
        onClick={copyToClipboard}
        disabled={copied}
      >
        {copied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
        <span>복사{copied && "됨"}</span>
      </button>
      <button
        className={cx(
          "bg-gray-400",
          "p-3",
          "text-white",
          "rounded-e-md",
          "font-semibold",
          "align-middle",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          /* hover */
          "hover:bg-gray-500",
          "hover:transition"
        )}
      >
        <WindowIcon />
        <span>선택창</span>
      </button>
    </div>
  );
}

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className={cx("relative")}>
      <button
        className={cx(
          "p-1",
          "text-gray-300",
          "rounded-full",
          "flex",
          "justify-center",
          "items-center",
          /* hover */
          "hover:bg-gray-200",
          "hover:transition"
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className={cx(
            "absolute",
            "-right-6",
            "top-full",
            "overflow-hidden",
            "w-24",
            "bg-gray-400",
            "text-white",
            "mt-2",
            "z-50",
            "rounded-lg",
            "py-1",
            "px-2",
            "text-sm"
          )}
        >
          <li
            role="option"
            className={cx("flex", "items-center", "cursor-pointer", "my-1")}
          >
            <TicketIcon className={cx("w-5", "h-5", "mr-2")} />
            <span>뽑기</span>
          </li>
          <li
            role="option"
            className={cx("flex", "items-center", "cursor-pointer", "my-1")}
          >
            <ClipboardIcon className={cx("w-5", "h-5", "mr-2")} />
            <span>복사</span>
          </li>
          <li
            role="option"
            className={cx("flex", "items-center", "cursor-pointer", "my-1")}
          >
            <WindowIcon className={cx("w-5", "h-5", "mr-2")} />
            <span>선택창</span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default function DrawActions() {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < MOBILE_WIDTH, [width]);

  return isMobile ? <Dropdown /> : <ActionButtonGroup />;
}
