import "@testing-library/jest-dom";
import "fake-indexeddb/auto";
import { db } from "./db/savedDraw";

vi.mock("zustand"); // to make it works like Jest (auto-mocking)

afterEach(async () => {
  vi.restoreAllMocks();
  await db.savedDraws.clear();
});
