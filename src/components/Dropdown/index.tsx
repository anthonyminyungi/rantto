import cx from "clsx";
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

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="메뉴"
        className={cx(
          "flex items-center justify-center rounded-full p-1",
          "text-gray-300 dark:text-neutral-500",
          "cursor-pointer hover:bg-gray-200 transition-colors dark:hover:bg-neutral-800"
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <KebabIcon className="h-8 w-8" />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className={cx(
            "absolute top-full -right-6 z-50 mt-2 min-w-max overflow-hidden",
            "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white",
            "rounded-lg px-2 py-1 shadow-lg",
            "border border-gray-200 dark:border-neutral-700 dark:shadow-neutral-900/50"
          )}
        >
          {items.map(({ icon, text, onClick, disabled }) => (
            <li
              key={text}
              role="option"
              className={cx(
                "m-1.5 flex items-center gap-2 transition-colors",
                "text-neutral-900 dark:text-white",
                "hover:text-blue-600 dark:hover:text-blue-400",
                {
                  "pointer-events-none cursor-default opacity-50": disabled,
                  "cursor-pointer": !disabled,
                }
              )}
              onClick={() => {
                if (disabled) return;
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
