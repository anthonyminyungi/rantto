import Dexie, { Table } from "dexie";
import { DrawList } from "@/types";

export interface SavedDraw {
  id?: number;
  draws: DrawList;
  round: number;
  createdAt: Date;
}

export interface WinningHistoryRecord {
  round: number;
  numbers: number[];
  bonus: number;
  createdAt: string;
}

const NEW_DB_NAME = "rantto";
const OLD_DB_NAME = "savedDraws";

class AppDB extends Dexie {
  savedDraws!: Table<SavedDraw>;
  winningHistory!: Table<WinningHistoryRecord>;

  constructor() {
    super(NEW_DB_NAME);

    this.version(1).stores({
      savedDraws: "++id, draws, round, createdAt",
      winningHistory: "round",
    });
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
    console.log("[IndexedDB] Successfully migrated from 'savedDraws' to 'rantto'");
  } catch (error) {
    console.error("[IndexedDB] Failed to migrate old database:", error);
  }
}
