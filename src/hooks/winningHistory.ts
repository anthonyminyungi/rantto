import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";

import { WinningHistory } from "@/types";
import { db, WinningHistoryRecord } from "@/db/savedDraw";

const WINNING_HISTORY_GIST_URL =
  "https://gist.githubusercontent.com/anthonyminyungi/a7237c0717400512855c890d5b0e1ba3/raw/lotto-winning-history.json";

/**
 * Gist에서 당첨번호를 가져와 IndexedDB에 캐싱하고,
 * useLiveQuery로 실시간 반영합니다.
 *
 * - 최초 방문: Gist fetch → IndexedDB에 bulkPut → useLiveQuery가 자동 반영
 * - 재방문: IndexedDB 캐시 즉시 반환 → 백그라운드 Gist fetch로 신규 회차만 추가
 */
export const useWinningHistory = (targetRound?: number): WinningHistory => {
  const allHistory = useLiveQuery(
    () => db.winningHistory.orderBy("round").toArray(),
    [],
    [] as WinningHistoryRecord[]
  );

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

  // targetRound에 해당하는 회차 또는 최신 회차 반환
  const lastHistory = allHistory[allHistory.length - 1];
  const targetHistory = targetRound
    ? allHistory.find((item) => item.round === targetRound)
    : undefined;

  const result = targetHistory ?? lastHistory;

  return {
    round: result?.round ?? 0,
    numbers: (result?.numbers ?? [0, 0, 0, 0, 0, 0]) as WinningHistory["numbers"],
    bonus: result?.bonus ?? 0,
    createdAt: result?.createdAt ?? "",
  };
};
