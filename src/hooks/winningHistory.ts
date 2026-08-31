import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";

import { DrawListItem, WinningHistory } from "@/types";
import { db, SavedDraw, WinningHistoryRecord } from "@/db/savedDraw";
import { getRanksByDraw } from "@/utils";

const WINNING_HISTORY_GIST_URL =
  "https://gist.githubusercontent.com/anthonyminyungi/a7237c0717400512855c890d5b0e1ba3/raw/lotto-winning-history.json";

async function backfillGameRanks() {
  const pending = await db.savedDraws
    .filter((item) => !item.gameRanks)
    .toArray();

  if (pending.length === 0) return;

  const roundsSet = new Set<number>();
  for (const item of pending) {
    roundsSet.add(item.round);
  }
  const rounds = [...roundsSet];
  const historyRecords = await db.winningHistory
    .where("round")
    .anyOf(rounds)
    .toArray();

  const historyMap = new Map(historyRecords.map((h) => [h.round, h]));

  const updatedItems: SavedDraw[] = [];

  for (const item of pending) {
    const history = historyMap.get(item.round);
    if (!history) continue;

    const won = history.numbers as DrawListItem;
    const gameRanks = getRanksByDraw(item.draws, won, history.bonus);
    if (item.id != null) {
      updatedItems.push({ ...item, gameRanks });
    }
  }

  if (updatedItems.length > 0) {
    await db.savedDraws.bulkPut(updatedItems);
  }
}

/**
 * Gist에서 당첨번호를 가져와 IndexedDB에 캐싱하고,
 * useLiveQuery로 실시간 반영합니다.
 *
 * - 최초 방문: Gist fetch → IndexedDB에 bulkPut → useLiveQuery가 자동 반영
 * - 재방문: IndexedDB 캐시 즉시 반환 → 백그라운드 Gist fetch로 신규 회차만 추가
 */
export const useWinningHistory = (targetRound?: number): WinningHistory => {
  const result = useLiveQuery(() => {
    if (targetRound) {
      return db.winningHistory.get(targetRound);
    }
    return db.winningHistory.orderBy("round").reverse().first();
  }, [targetRound]);

  // 백그라운드에서 Gist fetch → IndexedDB 동기화
  useEffect(() => {
    let active = true;
    const syncFromGist = async () => {
      try {
        const res = await fetch(WINNING_HISTORY_GIST_URL);
        const data = await res.json();
        const history: WinningHistoryRecord[] = data.history ?? [];
        if (active && history.length > 0) {
          // bulkPut은 round(PK) 기준으로 upsert하므로 중복 걱정 없음
          await db.winningHistory.bulkPut(history);
          await backfillGameRanks();
        }
      } catch (e) {
        // 네트워크 실패 시 IndexedDB 캐시로 동작
        console.warn("Gist fetch 실패, 캐시 데이터로 동작합니다:", e);
      }
    };
    syncFromGist();
    return () => {
      active = false;
    };
  }, []);

  return {
    round: result?.round ?? 0,
    numbers: (result?.numbers ?? [
      0, 0, 0, 0, 0, 0,
    ]) as WinningHistory["numbers"],
    bonus: result?.bonus ?? 0,
    createdAt: result?.createdAt ?? "",
  };
};
