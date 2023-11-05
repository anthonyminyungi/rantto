import _last from "lodash/last";
import _find from "lodash/find";

import { history as winningHistory } from "@/assets/winning_history.json";
import { WinningHistory } from "@/types";
import { useMemo } from "react";

export const useWinningHistory = (targetRound?: number): WinningHistory => {
  const {
    round = 0,
    numbers = [0, 0, 0, 0, 0, 0],
    bonus = 0,
    createdAt = "",
  } = useMemo<WinningHistory>(() => {
    const lastHistory = _last(winningHistory) || {};
    const recentHistory = _find(winningHistory, { round: targetRound }) || {};
    // 아직 존재하지 않는 회차에 대해 조회할 경우 최근 회차의 데이터 반환
    // TODO: 명시적으로 드러나도록 로직 개선 필요
    if (!targetRound || !recentHistory) {
      return lastHistory as WinningHistory;
    }
    return recentHistory as WinningHistory;
  }, [targetRound]);

  return {
    round,
    numbers,
    bonus,
    createdAt,
  };
};
