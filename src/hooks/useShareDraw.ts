import { useState } from "react";

import { useToast } from "@/hooks";
import { shareDrawList } from "@/utils";
import { DrawList, DrawListItem } from "@/types";

/**
 * 번호 공유/복사 기능을 캡슐화하는 커스텀 훅.
 * DrawSection, DrawActions, SavedActions에서 공통으로 사용.
 */
export function useShareDraw() {
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

  return { copied, handleShare };
}
