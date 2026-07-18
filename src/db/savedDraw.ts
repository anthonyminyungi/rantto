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

class AppDB extends Dexie {
  savedDraws!: Table<SavedDraw>;
  winningHistory!: Table<WinningHistoryRecord>;

  constructor() {
    // DB 이름을 "savedDraws"로 유지하여 기존 사용자 데이터 보존
    super("savedDraws");

    this.version(1).stores({
      savedDraws: "++id, draws, round, createdAt",
    });

    this.version(2).stores({
      savedDraws: "++id, draws, round, createdAt",
      winningHistory: "round",
    });
  }
}

export const db = new AppDB();
