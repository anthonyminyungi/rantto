import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";

import { useToastStore } from "@/store";
import { useToast } from "./index";

vi.mock("@/store", () => ({
  useToastStore: vi.fn(),
}));

describe("useToast", () => {
  let addToastMock: Mock;
  let removeToastMock: Mock;

  beforeEach(() => {
    vi.useFakeTimers();

    addToastMock = vi.fn();
    removeToastMock = vi.fn();

    (useToastStore as unknown as Mock).mockReturnValue({
      addToast: addToastMock,
      removeToast: removeToastMock,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("should call addToast and then removeToast after default duration (3000ms)", () => {
    const { result } = renderHook(() => useToast());

    result.current.showToast({ content: "Test Toast" });

    expect(addToastMock).toHaveBeenCalledTimes(1);
    expect(addToastMock).toHaveBeenCalledWith(
      expect.objectContaining({ content: "Test Toast", id: expect.any(String) })
    );

    const toastId = addToastMock.mock.calls[0][0].id;

    expect(removeToastMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2999);
    expect(removeToastMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(removeToastMock).toHaveBeenCalledTimes(1);
    expect(removeToastMock).toHaveBeenCalledWith(toastId);
  });

  it("should call addToast and then removeToast after custom duration", () => {
    const { result } = renderHook(() => useToast());

    result.current.showToast({ content: "Custom Toast", duration: 5000 });

    expect(addToastMock).toHaveBeenCalledTimes(1);
    const toastId = addToastMock.mock.calls[0][0].id;

    vi.advanceTimersByTime(3000);
    expect(removeToastMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2000);
    expect(removeToastMock).toHaveBeenCalledTimes(1);
    expect(removeToastMock).toHaveBeenCalledWith(toastId);
  });

  it("should allow manually closing a toast", () => {
    const { result } = renderHook(() => useToast());

    result.current.closeToast("manual-id");

    expect(removeToastMock).toHaveBeenCalledTimes(1);
    expect(removeToastMock).toHaveBeenCalledWith("manual-id");
  });
});
