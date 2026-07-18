import cx from "classnames";

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
        overlay.open(({ close }) => (
          <AlertModal content="최대 6개까지만 선택 가능" close={close} />
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

  const handleClose = () => {
    close();
  };

  const handleApply = () => {
    drawItem(drawIdx, currentNumbers);
    close();
  };

  return (
    <ModalItemWrapper>
      <div
        className={cx(
          "bg-white",
          "border",
          "border-gray-400",
          "rounded-xl",
          "px-6",
          "py-8",
          "w-full",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "gap-4",
          /* sm */
          "max-w-3xl",
          "max-sm:h-full",
          "max-sm:px-4",
          "max-sm:rounded-none",
          "max-sm:border-none"
        )}
      >
        <header
          className={cx("text-2xl", "font-bold", "text-black", "max-sm:text-xl")}
        >
          {drawIdx + 1}게임 번호 선택
        </header>
        <NumberBallSet numbers={currentNumbers} />
        <div
          className={cx(
            "py-6",
            // "my-4",
            "w-full",
            "flex",
            "flex-wrap",
            "justify-center",
            "bg-gray-100",
            "rounded-xl",
            "gap-x-2",
            "gap-y-4",
            /* sm */
            "max-sm:gap-y-3",
            "max-sm:py-4"
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
        <div className={cx("flex", "gap-2")}>
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
