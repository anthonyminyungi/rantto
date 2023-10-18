import { MouseEvent, useRef, useState } from "react";
import cx from "classnames";
import { useOutsideClick } from "@/hooks";

import ArrowDownIcon from "@/assets/chevron-down.svg?react";
import ArrowUpIcon from "@/assets/chevron-up.svg?react";

type SelectOption = [string, string];

interface SelectProps {
  options: SelectOption[];
  initialValue?: string;
  onSelect?: (selected: string) => void;
}

export default function Select({
  options,
  initialValue,
  onSelect,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(
    initialValue || options[0][0]
  );
  const ref = useRef<HTMLDivElement>(null);

  const selectedValue = options.find(([key]) => key === selected)?.[1];

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  const handleSelect = (key: string) => () => {
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
    <div className={cx("relative", "w-fit")}>
      <div
        ref={ref}
        onClick={handleToggle}
        className={cx(
          "flex",
          "justify-between",
          "items-center",
          "border",
          "w-32",
          "py-2",
          "px-3",
          "border-blue-500",
          "rounded-md",
          "cursor-pointer",
          "transition-all",
          /* active/inactive */
          {
            "bg-blue-500": isOpen,
            "text-white": isOpen,
            "bg-white": !isOpen,
            "text-blue-500": !isOpen,
          },
          /* hover */
          "hover:bg-blue-500",
          "hover:text-white",

          /* max-sm */
          "max-sm:w-28",
          "max-sm:p-2"
        )}
      >
        <span
          className={cx(
            // "font-semibold",
            "overflow-hidden",
            "leading-4",
            "text-ellipsis",
            "whitespace-nowrap"
          )}
        >
          {selectedValue}
        </span>
        {isOpen ? (
          <ArrowUpIcon
            viewBox="0 0 24 24"
            className={cx("w-6", "h-6", "max-sm:w-4", "max-sm:h-4")}
          />
        ) : (
          <ArrowDownIcon
            viewBox="0 0 24 24"
            className={cx("w-6", "h-6", "max-sm:w-4", "max-sm:h-4")}
          />
        )}
      </div>
      {isOpen && (
        <ul
          role="listbox"
          className={cx(
            "absolute",
            "z-50",
            "top-12",
            "w-full",
            "p-1",
            "rounded-md",
            "cursor-pointer",
            "border",
            "bg-white",
            "border-blue-500",
            "text-blue-500",
            /* max-sm */
            "max-sm:top-10"
          )}
        >
          {options.map(([key, text]) => (
            <li
              key={key}
              role="listitem"
              onClick={handleSelect(key)}
              className={cx(
                "rounded",
                "p-2",
                "m-1",
                "overflow-hidden",
                "leading-4",
                "text-ellipsis",
                "whitespace-nowrap",
                {
                  "bg-blue-500": selected === key,
                  "text-white": selected === key,
                },
                /* hover */
                {
                  "hover:bg-blue-300": selected !== key,
                  "hover:text-white": selected !== key,
                },
                /* max-sm */
                "max-sm:p-1",
                "max-sm:m-0.5"
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
