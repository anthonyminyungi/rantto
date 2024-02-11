import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { db } from "../db/savedDraw";

describe("보관함 테스트", () => {
  test("보관함 추가 테스트", async () => {
    render(<App />);

    await userEvent.click(await screen.findByText("5회 뽑기"));
    await userEvent.click(await screen.findByText("보관하기"));

    await waitFor(async () => expect(await db.savedDraws.count()).toBe(1));
  });

  test("보관함 삭제 테스트", async () => {
    render(<App />);

    await userEvent.click(await screen.findByText("5회 뽑기"));
    await userEvent.click(await screen.findByText("보관하기"));

    // 삭제 버튼 클릭 시 노출되는 window.confirm mocking
    vi.spyOn(window, "confirm").mockImplementationOnce(() => true);

    await userEvent.click(await screen.findByText("보관함"));
    await userEvent.click(await screen.findByText("삭제"));

    await waitFor(async () => expect(await db.savedDraws.count()).toBe(0));
  });
});
