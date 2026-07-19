import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";

import { db } from "@/db/savedDraw";

interface WinningStatsResult {
  /** 등수별 게임 수 */
  rankCounts: Record<number, number>;
  /** gameRanks가 존재하는 전체 게임 수 */
  totalGames: number;
  /** gameRanks가 undefined인 SavedDraw 수 (미추첨) */
  pendingDraws: number;
}

const INITIAL_RANK_COUNTS: Record<number, number> = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  [-1]: 0,
};

export function useWinningStats(): WinningStatsResult {
  const allDraws = useLiveQuery(
    () => db.savedDraws.toArray(),
    [],
    []
  );

  return useMemo(() => {
    const rankCounts: Record<number, number> = { ...INITIAL_RANK_COUNTS };
    let totalGames = 0;
    let pendingDraws = 0;

    for (const draw of allDraws) {
      if (!draw.gameRanks) {
        pendingDraws++;
        continue;
      }
      for (const rank of draw.gameRanks) {
        totalGames++;
        rankCounts[rank] = (rankCounts[rank] ?? 0) + 1;
      }
    }

    return { rankCounts, totalGames, pendingDraws };
  }, [allDraws]);
}
