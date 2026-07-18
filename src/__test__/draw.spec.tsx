import { getByText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { useDrawStore } from "@/store";

describe("번호 뽑기 테스트", () => {
  test("5회 뽑기 테스트", async () => {
    render(<App />);
    const { drawList: beforeDraw } = useDrawStore.getState();
    await userEvent.click(await screen.findByText("5회 뽑기"));
    const { drawList: afterDraw } = useDrawStore.getState();

    const allSetDrawn = beforeDraw.reduce((acc, beforeDrawnItem, idx) => {
      const afterDrawnItem = afterDraw[idx];
      const isAllDifferentNumbers =
        beforeDrawnItem.filter((x) => afterDrawnItem.includes(x)).length === 0;
      return acc && isAllDifferentNumbers;
    }, true);

    await waitFor(() => expect(allSetDrawn).toBe(true));
  });

  test("1회 뽑기 테스트", async () => {
    render(<App />);
    const { drawList: beforeDraw } = useDrawStore.getState();

    const firstDrawItem = await screen.findByTestId("draw-item-0");
    await userEvent.click(getByText(firstDrawItem, "뽑기"));

    const { drawList: afterDraw } = useDrawStore.getState();

    const isDrawn =
      beforeDraw[0].filter((x) => afterDraw[0].includes(x)).length === 0;

    await waitFor(() => expect(isDrawn).toBe(true));
  });
});
