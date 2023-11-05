import Dexie, { Table } from "dexie";
import { DrawList } from "@/types";

export interface SavedDraw {
  id?: number;
  draws: DrawList;
  round: number;
  createdAt: Date;
}

class SavedDrawDB extends Dexie {
  savedDraws!: Table<SavedDraw>;

  constructor() {
    super("savedDraws");
    this.version(1).stores({
      savedDraws: "++id, draws, round, createdAt",
    });
  }
}

export const db = new SavedDrawDB();
