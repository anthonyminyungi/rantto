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

    await userEvent.click(await screen.findByText("보관함"));
    await userEvent.click(await screen.findByText("삭제"));

    // ConfirmModal 렌더링 대기 후 확인 버튼 클릭
    await userEvent.click(await screen.findByText("확인"));

    await waitFor(async () => expect(await db.savedDraws.count()).toBe(0));
  });
});
