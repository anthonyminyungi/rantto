import { ReactNode, useState } from "react";

import { useToast } from "@/hooks";
import { isWebShareSupported, shareDrawList } from "@/utils";
import { DrawList, DrawListItem } from "@/types";

import ShareIcon from "@/assets/share.svg?react";
import ClipboardIcon from "@/assets/clipboard-document.svg?react";
import ClipboardCheckIcon from "@/assets/clipboard-document-check.svg?react";

interface UseShareDrawOptions {
  isAll?: boolean;
}

/**
 * 번호 공유/복사 기능을 캡슐화하는 커스텀 훅.
 * DrawSection, DrawActions, SavedActions에서 공통으로 사용.
 */
export function useShareDraw({ isAll = false }: UseShareDrawOptions = {}) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleShare = (numbers: DrawList | DrawListItem) => {
    shareDrawList(numbers, (type) => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      showToast({
        content:
          type === "share"
            ? "공유 화면이 열립니다."
            : "클립보드에 복사되었습니다.",
      });
    });
  };

  const shareIcon = (className?: string): ReactNode => {
    return isWebShareSupported ? (
      <ShareIcon className={className} />
    ) : copied ? (
      <ClipboardCheckIcon className={className} />
    ) : (
      <ClipboardIcon className={className} />
    );
  };

  const shareText = isWebShareSupported
    ? isAll
      ? "전체 공유"
      : "공유"
    : copied
      ? "복사됨"
      : isAll
        ? "전체복사"
        : "복사";

  return { copied, handleShare, shareIcon, shareText };
}
