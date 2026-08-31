import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Dexie from "dexie";
import { migrateOldDatabase, db } from "./savedDraw";

describe("migrateOldDatabase", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("이전 데이터베이스가 존재하지 않으면 마이그레이션을 수행하지 않는다", async () => {
    const existsSpy = vi.spyOn(Dexie, "exists").mockResolvedValue(false);

    // open should not be called
    const openSpy = vi.spyOn(Dexie.prototype, "open");

    await migrateOldDatabase();

    expect(existsSpy).toHaveBeenCalledWith("savedDraws");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("데이터베이스 마이그레이션 중 오류 발생 시 로그를 남겨야 한다", async () => {
    // Mock Dexie.exists to return true so migration proceeds
    vi.spyOn(Dexie, "exists").mockResolvedValue(true);

    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock oldDb.open() to throw an error
    vi.spyOn(Dexie.prototype, "open").mockRejectedValue(new Error("Simulated open error"));

    await migrateOldDatabase();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[IndexedDB] Failed to migrate old database:",
      expect.any(Error)
    );
  });

  it("이전 데이터베이스의 데이터를 성공적으로 마이그레이션하고 이전 DB를 삭제해야 한다", async () => {
    vi.spyOn(Dexie, "exists").mockResolvedValue(true);

    const mockSavedDrawsData = [{ id: 1, round: 1, draws: [] }];
    const mockWinningHistoryData = [{ round: 1, numbers: [] }];

    vi.spyOn(Dexie.prototype, "open").mockResolvedValue(undefined as any);

    vi.spyOn(Dexie.prototype, "table").mockImplementation((tableName: string) => {
      return {
        toArray: vi.fn().mockResolvedValue(
          tableName === "savedDraws" ? mockSavedDrawsData : mockWinningHistoryData
        )
      } as any;
    });

    const bulkAddSavedDrawsSpy = vi.spyOn(db.savedDraws, "bulkAdd").mockResolvedValue(undefined as any);
    const bulkAddWinningHistorySpy = vi.spyOn(db.winningHistory, "bulkAdd").mockResolvedValue(undefined as any);

    const deleteSpy = vi.spyOn(Dexie.prototype, "delete").mockResolvedValue(undefined as any);

    await migrateOldDatabase();

    expect(bulkAddSavedDrawsSpy).toHaveBeenCalledWith(mockSavedDrawsData);
    expect(bulkAddWinningHistorySpy).toHaveBeenCalledWith(mockWinningHistoryData);
    expect(deleteSpy).toHaveBeenCalled();
  });
});
