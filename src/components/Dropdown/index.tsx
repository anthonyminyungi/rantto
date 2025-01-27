import cx from "classnames";
import { ReactNode, useRef, useState } from "react";

import Spacer from "@/components/Spacer";
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
        className={cx(
          "p-1",
          "text-gray-300",
          "rounded-full",
          "flex",
          "justify-center",
          "items-center",
          /* hover */
          "hover:bg-gray-200",
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
            "bg-gray-400",
            "text-white",
            "mt-2",
            "z-50",
            "rounded-lg",
            "py-1",
            "px-2"
          )}
        >
          {items.map(({ icon, text, onClick, disabled }) => (
            <li
              key={text}
              role="option"
              className={cx(
                "flex",
                "items-center",
                "cursor-pointer",
                "m-1.5",
                "text-white",
                { "cursor-default": disabled },
                { "text-opacity-50": disabled }
              )}
              onClick={() => {
                if (disabled) {
                  return;
                }
                onClick?.();
                setIsOpen(false);
              }}
            >
              {icon && (
                <>
                  {icon}
                  <Spacer direction="horizontal" space="2" />
                </>
              )}
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
