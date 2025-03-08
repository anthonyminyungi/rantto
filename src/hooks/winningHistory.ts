import _last from "lodash/last";
import _find from "lodash/find";

import { WinningHistory } from "@/types";
import { useEffect, useMemo, useState } from "react";

const WINNING_HISTORY_GIST_URL =
  "https://gist.githubusercontent.com/anthonyminyungi/a7237c0717400512855c890d5b0e1ba3/raw/lotto-winning-history.json";

export const useWinningHistory = (targetRound?: number): WinningHistory => {
  const [winningHistory, setWinningHistory] = useState<WinningHistory[]>();
  useEffect(() => {
    let active = true;
    const getWinningHistoryData = async () => {
      const res = await fetch(WINNING_HISTORY_GIST_URL);
      const data = await res.json();
      if (active) {
        setWinningHistory(data.history);
      }
    };
    getWinningHistoryData();
    return () => {
      active = false;
    };
  }, []);
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
  }, [targetRound, winningHistory]);

  return {
    round,
    numbers,
    bonus,
    createdAt,
  };
};
