import { useMemo, useState } from "react";
import cx from "classnames";

import { MOBILE_WIDTH } from "@/constants";
import { useWindowSize } from "@/hooks";
import Dropdown from "@/components/Dropdown";
import ButtonGroup from "@/components/ButtonGroup";

import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import TrashIcon from "@/assets/trash.svg?react";

export default function SavedActions() {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < MOBILE_WIDTH, [width]);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className={cx("h-fit", { "pt-2": isMobile })}>
      {isMobile ? (
        <Dropdown
          items={[
            {
              icon: ClipboardIcon,
              text: "복사",
            },
            {
              icon: TrashIcon,
              text: "삭제",
            },
          ]}
        />
      ) : (
        <ButtonGroup
          items={[
            {
              icon: copied ? <ClipboardCheckIcon /> : <ClipboardIcon />,
              text: `복사${copied ? "됨" : ""} `,
              onClick: copyToClipboard,
              disabled: copied,
            },
            {
              icon: <TrashIcon />,
              text: "삭제",
            },
          ]}
        />
      )}
    </div>
  );
}
