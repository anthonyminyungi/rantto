import cx from "classnames";
import { ReactNode, useRef, useState } from "react";

import { useOutsideClick } from "@/hooks";

import KebabIcon from "@/assets/ellipsis-vertical.svg?react";

interface DropdownItem {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
}

export default function Dropdown({ items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className={cx("relative")}>
      <button
        aria-label="메뉴"
        className={cx(
          "p-1",
          "text-gray-300",
          "dark:text-neutral-500",
          "rounded-full",
          "flex",
          "justify-center",
          "items-center",
          /* hover */
          "hover:bg-gray-200",
          "dark:hover:bg-neutral-800",
          "hover:transition"
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <KebabIcon className={cx("w-8", "w-8")} />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className={cx(
            "absolute",
            "-right-6",
            "top-full",
            "overflow-hidden",
            "min-w-max",
            "bg-white",
            "dark:bg-neutral-800",
            "text-neutral-900",
            "dark:text-white",
            "mt-2",
            "z-50",
            "rounded-lg",
            "py-1",
            "px-2",
            "shadow-lg",
            "border",
            "border-gray-200",
            "dark:border-neutral-700",
            "dark:shadow-neutral-900/50"
          )}
        >
          {items.map(({ icon, text, onClick, disabled }) => (
            <li
              key={text}
              role="option"
              className={cx(
                "flex",
                "items-center",
                "gap-2",
                "cursor-pointer",
                "m-1.5",
                "text-neutral-900",
                "dark:text-white",
                "hover:text-blue-600",
                "dark:hover:text-blue-400",
                "transition-colors",
                { "pointer-events-none cursor-default opacity-50": disabled }
              )}
              onClick={() => {
                if (disabled) {
                  return;
                }
                onClick?.();
                setIsOpen(false);
              }}
            >
              {icon}
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
