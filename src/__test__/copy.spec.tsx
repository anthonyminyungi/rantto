import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { useDrawStore } from "@/store";
import { generateDrawClipboardMsg } from "@/utils";

describe("클립보드 복사 테스트", () => {
  test("전체 복사 테스트", async () => {
    render(<App />);

    const user = userEvent.setup({ writeToClipboard: true });

    await user.click(await screen.findByText("5회 뽑기"));
    await user.click(await screen.findByText("전체복사"));
    const { drawList } = useDrawStore.getState();

    const clipboardText = await navigator.clipboard.readText();
    const generatedText = generateDrawClipboardMsg(drawList);

    expect(clipboardText).toEqual(generatedText);
  });

  test("단건 복사 테스트", async () => {
    render(<App />);

    const user = userEvent.setup({ writeToClipboard: true });

    const firstDrawItem = await screen.findByTestId("draw-item-0");
    const drawBtn = getByText(firstDrawItem, "뽑기");
    const copyBtn = getByText(firstDrawItem, "복사");
    await user.click(drawBtn);
    await user.click(copyBtn);
    const { drawList } = useDrawStore.getState();

    const clipboardText = await navigator.clipboard.readText();
    const generatedText = generateDrawClipboardMsg(drawList[0]);

    expect(clipboardText).toEqual(generatedText);
  });
});
