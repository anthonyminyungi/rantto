import "@testing-library/jest-dom";
import "fake-indexeddb/auto";
import { db } from "./db/savedDraw";

vi.mock("zustand"); // to make it works like Jest (auto-mocking)

beforeAll(() => {
  /* Initialize portal container */
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  div1.setAttribute("id", "global-toast-container");
  div2.setAttribute("id", "global-modal-container");
  document.body.appendChild(div1);
  document.body.appendChild(div2);
});

afterEach(async () => {
  vi.restoreAllMocks();
  await db.savedDraws.clear();
});
