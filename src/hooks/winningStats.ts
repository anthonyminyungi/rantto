import { useLiveQuery } from "dexie-react-hooks";

import { db, WinningStatsResult } from "@/db/savedDraw";

const INITIAL_RANK_COUNTS: Record<number, number> = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  [-1]: 0,
};

export function useWinningStats(): WinningStatsResult {
  const stats = useLiveQuery(
    async () => {
      await db.initializeStatsCache();

      // We read from db.savedDraws to ensure useLiveQuery tracks the table.
      await db.savedDraws.count();

      // We must return a new object to ensure React state updates correctly
      // if cachedStats has been mutated in-place by Dexie hooks.
      return {
        rankCounts: { ...db.cachedStats.rankCounts },
        totalGames: db.cachedStats.totalGames,
        pendingDraws: db.cachedStats.pendingDraws,
      };
    },
    [],
    { rankCounts: { ...INITIAL_RANK_COUNTS }, totalGames: 0, pendingDraws: 0 }
  );

  return stats;
}
