import Dexie, { Table } from "dexie";
import { DrawList } from "@/types";

export interface SavedDraw {
  id?: number;
  draws: DrawList;
  round: number;
  createdAt: Date;
  gameRanks?: number[];
}

export interface WinningHistoryRecord {
  round: number;
  numbers: number[];
  bonus: number;
  createdAt: string;
}

export interface WinningStatsResult {
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

const NEW_DB_NAME = "rantto";
const OLD_DB_NAME = "savedDraws";

class AppDB extends Dexie {
  savedDraws!: Table<SavedDraw>;
  winningHistory!: Table<WinningHistoryRecord>;

  cachedStats: WinningStatsResult = {
    rankCounts: { ...INITIAL_RANK_COUNTS },
    totalGames: 0,
    pendingDraws: 0,
  };
  private _isStatsInitialized = false;
  private _statsInitPromise: Promise<void> | null = null;

  constructor() {
    super(NEW_DB_NAME);

    this.version(1).stores({
      savedDraws: "++id, draws, round, createdAt",
      winningHistory: "round",
    });

    this.savedDraws.hook("creating", (_primKey, obj) => {
      if (this._isStatsInitialized) {
        this.addDrawToStats(obj);
      }
    });

    this.savedDraws.hook("updating", (modifications, _primKey, obj) => {
      if (this._isStatsInitialized) {
        this.removeDrawFromStats(obj);
        const newObj = { ...obj, ...modifications } as SavedDraw;
        this.addDrawToStats(newObj);
      }
    });

    this.savedDraws.hook("deleting", (_primKey, obj) => {
      if (this._isStatsInitialized) {
        this.removeDrawFromStats(obj);
      }
    });
  }

  private addDrawToStats(draw: SavedDraw) {
    if (!draw.gameRanks) {
      this.cachedStats.pendingDraws++;
      return;
    }
    for (const rank of draw.gameRanks) {
      this.cachedStats.totalGames++;
      this.cachedStats.rankCounts[rank] =
        (this.cachedStats.rankCounts[rank] ?? 0) + 1;
    }
  }

  private removeDrawFromStats(draw: SavedDraw) {
    if (!draw.gameRanks) {
      this.cachedStats.pendingDraws--;
      return;
    }
    for (const rank of draw.gameRanks) {
      this.cachedStats.totalGames--;
      this.cachedStats.rankCounts[rank] =
        (this.cachedStats.rankCounts[rank] ?? 0) - 1;
    }
  }

  public async initializeStatsCache(): Promise<void> {
    if (this._isStatsInitialized) return;
    if (this._statsInitPromise) return this._statsInitPromise;

    this._statsInitPromise = (async () => {
      const rankCounts: Record<number, number> = { ...INITIAL_RANK_COUNTS };
      let totalGames = 0;
      let pendingDraws = 0;

      await this.savedDraws.each((draw) => {
        if (!draw.gameRanks) {
          pendingDraws++;
          return;
        }
        for (const rank of draw.gameRanks) {
          totalGames++;
          rankCounts[rank] = (rankCounts[rank] ?? 0) + 1;
        }
      });

      this.cachedStats = { rankCounts, totalGames, pendingDraws };
      this._isStatsInitialized = true;
    })();

    return this._statsInitPromise;
  }
}

export const db = new AppDB();

export async function migrateOldDatabase() {
  const oldDbExists = await Dexie.exists(OLD_DB_NAME);
  if (!oldDbExists) return;

  const oldDb = new Dexie(OLD_DB_NAME);
  // 기존 DB의 버전 스키마 (1, 2)
  oldDb.version(1).stores({
    savedDraws: "++id, draws, round, createdAt",
  });
  oldDb.version(2).stores({
    savedDraws: "++id, draws, round, createdAt",
    winningHistory: "round",
  });

  try {
    await oldDb.open();
    const savedDrawsData = await oldDb.table("savedDraws").toArray();
    // v2 사용자의 경우 winningHistory 데이터가 있을 수 있음
    const winningHistoryData = await oldDb.table("winningHistory").toArray();

    if (savedDrawsData.length > 0) {
      await db.savedDraws.bulkAdd(savedDrawsData);
    }
    if (winningHistoryData.length > 0) {
      await db.winningHistory.bulkAdd(winningHistoryData);
    }

    // 마이그레이션 성공 후 기존 DB 삭제
    await oldDb.delete();
  } catch (error) {
    console.error("[IndexedDB] Failed to migrate old database:", error);
  }
}
