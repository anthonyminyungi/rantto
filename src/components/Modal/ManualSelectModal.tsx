import cx from "clsx";

import { ModalComponentProps } from "@/types/modal";
import { useDrawStore } from "@/store";
import { useCallback, useMemo, useState } from "react";
import { DrawListItem } from "@/types";
import NumberBallSet from "../NumberBallSet";
import { allNumbers } from "@/constants";
import NumberBall from "../NumberBall";
import Button from "../Button";
import ModalItemWrapper from "./ModalItemWrapper";
import AlertModal from "./AlertModal";
import { overlay } from "overlay-kit";
import { MODAL_PANEL_STYLES } from "@/constants/styles";

interface NumberSelectModalProps extends ModalComponentProps {
  drawIdx: number;
}

export default function ManualSelectModal({
  drawIdx,
  close,
}: NumberSelectModalProps) {
  const { drawList, drawItem } = useDrawStore();
  const [currentNumbers, setCurrentNumbers] = useState<DrawListItem>(
    () => drawList[drawIdx]
  );
  const zeroFiltered = useMemo(
    () => currentNumbers.filter((num) => num !== 0),
    [currentNumbers]
  );

  const handleSelectNumber = useCallback(
    (num: number) => () => {
      if (zeroFiltered.length === 6 && !zeroFiltered.includes(num)) {
        overlay.open(({ unmount }) => (
          <AlertModal content="최대 6개까지만 선택 가능" close={unmount} />
        ));
        return;
      }
      setCurrentNumbers((prev) => {
        const next = [...prev] as DrawListItem;
        if (next.includes(num)) {
          next.splice(next.indexOf(num), 1, 0);
        } else {
          next.splice(next.indexOf(0), 1, num);
        }
        return next.sort((a, b) => a - b);
      });
    },
    [zeroFiltered]
  );

  const handleClose = () => close();
  const handleApply = () => {
    drawItem(drawIdx, currentNumbers);
    close();
  };

  return (
    <ModalItemWrapper>
      <div
        className={cx(
          MODAL_PANEL_STYLES,
          "flex w-full flex-col items-center justify-center gap-4 px-6 py-8",
          "max-w-3xl max-sm:h-full max-sm:rounded-none max-sm:border-none max-sm:px-4"
        )}
      >
        <header className="text-2xl font-bold text-neutral-900 max-sm:text-xl dark:text-neutral-100">
          {drawIdx + 1}게임 번호 선택
        </header>
        <NumberBallSet numbers={currentNumbers} />
        <div
          className={cx(
            "flex w-full flex-wrap justify-center gap-x-2 gap-y-4 py-6",
            "rounded-xl bg-gray-100 dark:bg-neutral-800",
            "max-sm:gap-y-3 max-sm:py-4"
          )}
        >
          {allNumbers.map((num) => (
            <NumberBall
              key={`select-${num}`}
              number={num}
              noBg={!currentNumbers.includes(num)}
              onClick={handleSelectNumber(num)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button onClick={handleApply} disabled={zeroFiltered.length < 6}>
            적용하기
          </Button>
        </div>
      </div>
    </ModalItemWrapper>
  );
}
