import { MouseEvent, useRef, useState } from "react";
import cx from "clsx";
import { useOutsideClick } from "@/hooks";

import ArrowDownIcon from "@/assets/chevron-down.svg?react";
import ArrowUpIcon from "@/assets/chevron-up.svg?react";

type SelectOption<TKey extends string> = [TKey, string];

interface SelectProps<TKey extends string> {
  options: SelectOption<TKey>[];
  initialValue?: TKey;
  onSelect?: (selected: TKey) => void;
}

export default function Select<TKey extends string>({
  options,
  initialValue,
  onSelect,
}: SelectProps<TKey>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TKey>(initialValue || options[0][0]);
  const ref = useRef<HTMLDivElement>(null);

  const selectedValue = options.find(([key]) => key === selected)?.[1];

  useOutsideClick(ref, () => setIsOpen(false));

  const handleSelect = (key: TKey) => () => {
    if (selected !== key) {
      setSelected(key);
      onSelect?.(key);
    }
    setIsOpen(false);
  };

  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    setIsOpen((prev) => !prev);
    e.stopPropagation();
  };

  return (
    <div className="relative w-fit">
      <div
        ref={ref}
        onClick={handleToggle}
        className={cx(
          "flex w-40 items-center justify-between border px-3 py-2",
          "cursor-pointer rounded-md border-blue-600 transition-colors",
          "hover:bg-blue-600 hover:text-white",
          "max-sm:w-28 max-sm:p-2",
          {
            "bg-blue-600 text-white": isOpen,
            "bg-white text-blue-600 dark:bg-neutral-900 dark:text-blue-400":
              !isOpen,
          }
        )}
      >
        <span className="overflow-hidden leading-4 text-ellipsis whitespace-nowrap">
          {selectedValue}
        </span>
        {isOpen ? (
          <ArrowUpIcon
            viewBox="0 0 24 24"
            className="h-6 w-6 max-sm:h-4 max-sm:w-4"
          />
        ) : (
          <ArrowDownIcon
            viewBox="0 0 24 24"
            className="h-6 w-6 max-sm:h-4 max-sm:w-4"
          />
        )}
      </div>
      {isOpen && (
        <ul
          role="listbox"
          className={cx(
            "absolute top-12 z-50 w-full cursor-pointer rounded-md p-1",
            "border border-blue-600 dark:border-blue-400",
            "bg-white text-blue-600 dark:bg-neutral-900 dark:text-blue-400",
            "max-sm:top-10"
          )}
        >
          {options.map(([key, text]) => (
            <li
              key={key}
              role="listitem"
              onClick={handleSelect(key)}
              className={cx(
                "m-1 overflow-hidden rounded-sm p-2 leading-4 text-ellipsis whitespace-nowrap",
                "max-sm:m-0.5 max-sm:p-1",
                {
                  "bg-blue-600 text-white": selected === key,
                },
                {
                  "hover:bg-blue-300 hover:text-white": selected !== key,
                }
              )}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
