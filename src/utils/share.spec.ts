import { describe, expect, it, vi, beforeEach } from "vitest";
import { DrawList, DrawListItem } from "@/types";

describe("share.ts", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe("generateDrawClipboardMsg", () => {
    it("단일 게임(DrawListItem) 포맷팅", async () => {
      const { generateDrawClipboardMsg } = await import("./share");
      const numbers: DrawListItem = [1, 2, 3, 4, 5, 6];
      const result = generateDrawClipboardMsg(numbers);
      expect(result).toBe(
        "1, 2, 3, 4, 5, 6\n\n나만의 당첨 번호를 뽑아보세요!\nhttps://rantto.app"
      );
    });

    it("여러 게임(DrawList) 포맷팅", async () => {
      const { generateDrawClipboardMsg } = await import("./share");
      const numbers: DrawList = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const result = generateDrawClipboardMsg(numbers);
      expect(result).toBe(
        "1게임: 1, 2, 3, 4, 5, 6\n\n2게임: 7, 8, 9, 10, 11, 12\n\n나만의 당첨 번호를 뽑아보세요!\nhttps://rantto.app"
      );
    });

    it("비어있는 게임이 있는 경우 필터링", async () => {
      const { generateDrawClipboardMsg } = await import("./share");
      const numbers: DrawList = [
        [1, 2, 3, 4, 5, 6],
        [0, 0, 0, 0, 0, 0], // 비어있는 게임
        [13, 14, 15, 16, 17, 18],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      const result = generateDrawClipboardMsg(numbers);
      // 빈 게임은 필터링 되어야 함
      expect(result).toBe(
        "1게임: 1, 2, 3, 4, 5, 6\n\n2게임: 13, 14, 15, 16, 17, 18\n\n나만의 당첨 번호를 뽑아보세요!\nhttps://rantto.app"
      );
    });
  });

  describe("isWebShareSupported", () => {
    it("navigator.share가 있을 때 true 반환", async () => {
      vi.stubGlobal("navigator", { share: vi.fn() });
      const { isWebShareSupported } = await import("./share");
      expect(isWebShareSupported).toBe(true);
    });

    it("navigator.share가 없을 때 false 반환", async () => {
      vi.stubGlobal("navigator", {});
      const { isWebShareSupported } = await import("./share");
      expect(isWebShareSupported).toBe(false);
    });
  });

  describe("shareDrawList", () => {
    it("Web Share API가 지원될 때 navigator.share 호출", async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", { share: mockShare });
      const { shareDrawList } = await import("./share");
      const onSuccess = vi.fn();

      const numbers: DrawListItem = [1, 2, 3, 4, 5, 6];
      await shareDrawList(numbers, onSuccess);

      expect(mockShare).toHaveBeenCalledWith({
        text: "1, 2, 3, 4, 5, 6\n\n나만의 당첨 번호를 뽑아보세요!\nhttps://rantto.app",
      });
      expect(onSuccess).toHaveBeenCalledWith("share");
    });

    it("Web Share API가 지원되지 않을 때 clipboard.writeText 호출", async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", { clipboard: { writeText: mockWriteText } });
      const { shareDrawList } = await import("./share");
      const onSuccess = vi.fn();

      const numbers: DrawListItem = [1, 2, 3, 4, 5, 6];
      await shareDrawList(numbers, onSuccess);

      expect(mockWriteText).toHaveBeenCalledWith(
        "1, 2, 3, 4, 5, 6\n\n나만의 당첨 번호를 뽑아보세요!\nhttps://rantto.app"
      );
      expect(onSuccess).toHaveBeenCalledWith("copy");
    });

    it("Web Share API 취소(AbortError) 시 예외가 발생하지 않음", async () => {
      const error = new Error("Abort");
      error.name = "AbortError";
      const mockShare = vi.fn().mockRejectedValue(error);
      vi.stubGlobal("navigator", { share: mockShare });

      const { shareDrawList } = await import("./share");
      const numbers: DrawListItem = [1, 2, 3, 4, 5, 6];
      const onSuccess = vi.fn();

      await expect(shareDrawList(numbers, onSuccess)).resolves.toBeUndefined();
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it("Web Share API 다른 에러 시 예외가 발생하지 않음", async () => {
      const error = new Error("Some other error");
      const mockShare = vi.fn().mockRejectedValue(error);
      vi.stubGlobal("navigator", { share: mockShare });

      const { shareDrawList } = await import("./share");
      const numbers: DrawListItem = [1, 2, 3, 4, 5, 6];
      const onSuccess = vi.fn();

      await expect(shareDrawList(numbers, onSuccess)).resolves.toBeUndefined();
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });
});
