import { useMemo, useState } from "react";
import cx from "classnames";

import { MOBILE_WIDTH } from "@/constants";
import { useWindowSize } from "@/hooks";
import Dropdown from "@/components/Dropdown";
import ButtonGroup from "@/components/ButtonGroup";
import { SavedDraw, db } from "@/db/savedDraw";

import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";
import TrashIcon from "@/assets/trash.svg?react";
import { copyDrawList } from "@/utils";

interface SavedActionsProps {
  data: SavedDraw;
}

export default function SavedActions({ data }: SavedActionsProps) {
  const { id, draws } = data;
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < MOBILE_WIDTH, [width]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    copyDrawList(draws, () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  const handleDelete = () => {
    if (id && confirm("정말 삭제하시겠습니까?")) {
      db.savedDraws.delete(id);
    }
  };

  return (
    <div className={cx("h-fit", { "pt-2": isMobile })}>
      {isMobile ? (
        <Dropdown
          items={[
            {
              /* TODO: 보관함 기능 구현 시 함께 적용 */
              icon: ClipboardIcon,
              text: "복사",
            },
            {
              icon: TrashIcon,
              text: "삭제",
              onClick: handleDelete,
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
              onClick: handleDelete,
            },
          ]}
        />
      )}
    </div>
  );
}
