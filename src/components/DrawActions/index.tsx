import { useMemo, useState } from "react";

import { useWindowSize } from "@/hooks";
import { MOBILE_WIDTH } from "@/constants";
import ButtonGroup from "@/components/ButtonGroup";
import Dropdown from "@/components/Dropdown";

import TicketIcon from "@/assets/ticket.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
// import WindowIcon from "@/assets/window.svg?react";

export default function DrawActions() {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < MOBILE_WIDTH, [width]);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return isMobile ? (
    <Dropdown
      items={[
        { icon: TicketIcon, text: "뽑기" },
        { icon: ClipboardIcon, text: "복사", onClick: copyToClipboard },
        // { icon: WindowIcon, text: "직접선택" },
      ]}
    />
  ) : (
    <ButtonGroup
      items={[
        { icon: <TicketIcon />, text: "뽑기" },
        {
          icon: copied ? <ClipboardCheckIcon /> : <ClipboardIcon />,
          text: `복사${copied ? "됨" : ""} `,
          onClick: copyToClipboard,
          disabled: copied,
        },
        // { icon: <WindowIcon />, text: "직접선택" },
      ]}
    />
  );
}
