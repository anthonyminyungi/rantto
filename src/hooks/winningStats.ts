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
      const rankCounts: Record<number, number> = { ...INITIAL_RANK_COUNTS };
      let totalGames = 0;
      let pendingDraws = 0;

      await db.savedDraws.each((draw) => {
        if (!draw.gameRanks) {
          pendingDraws++;
          return;
        }
        for (const rank of draw.gameRanks) {
          totalGames++;
          rankCounts[rank] = (rankCounts[rank] ?? 0) + 1;
        }
      });

      return { rankCounts, totalGames, pendingDraws };
    },
    [],
    { rankCounts: { ...INITIAL_RANK_COUNTS }, totalGames: 0, pendingDraws: 0 }
  );

  return stats;
}
