import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import _intersection from "lodash/intersection";

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
        _intersection(beforeDrawnItem, afterDrawnItem).length === 0;
      return acc && isAllDifferentNumbers;
    }, true);

    expect(allSetDrawn).toBe(true);
  });

  test("1회 뽑기 테스트", async () => {
    render(<App />);
    const { drawList: beforeDraw } = useDrawStore.getState();

    const firstDrawItem = await screen.findByTestId("draw-item-0");
    await userEvent.click(getByText(firstDrawItem, "뽑기"));

    const { drawList: afterDraw } = useDrawStore.getState();

    const isDrawn = _intersection(beforeDraw[0], afterDraw[0]).length === 0;

    expect(isDrawn).toBe(true);
  });
});
