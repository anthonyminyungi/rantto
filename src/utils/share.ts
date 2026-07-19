import { DrawList, DrawListItem } from "@/types";
import { isDrawEmpty } from "./draw";

export function generateDrawClipboardMsg(numbers: DrawList | DrawListItem) {
  const list = Array.isArray(numbers[0]) ? (numbers as DrawList) : [numbers];
  const numbersToText = list
    .filter((numbers) => !isDrawEmpty(numbers))
    .map(
      (numbers, index) =>
        `${list.length > 1 ? `${index + 1}게임: ` : ""}${numbers.join(", ")}`
    )
    .join("\n\n")
    .concat("\n\n나만의 당첨 번호를 뽑아보세요!\nhttps://rantto.app");
  return numbersToText;
}

export const isWebShareSupported =
  typeof navigator !== "undefined" && !!navigator.share;

export async function shareDrawList(
  numbers: DrawList | DrawListItem,
  onSuccess?: (type: "share" | "copy") => void
) {
  const textMessage = generateDrawClipboardMsg(numbers);
  if (isWebShareSupported) {
    try {
      await navigator.share({
        text: textMessage,
      });
      onSuccess?.("share");
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        console.error("Error sharing:", e);
      }
    }
  } else {
    try {
      await navigator.clipboard.writeText(textMessage);
      onSuccess?.("copy");
    } catch (e) {
      console.error(e);
    }
  }
}
