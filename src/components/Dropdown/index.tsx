import cx from "classnames";
import { FunctionComponent, SVGProps, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks";

import KebabIcon from "@/assets/ellipsis-vertical.svg?react";

interface DropdownItem {
  text: string;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
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
          {items.map(({ icon: Icon, text, onClick, disabled }) => (
            <li
              key={text}
              role="option"
              className={cx(
                "flex",
                "items-center",
                "cursor-pointer",
                "m-1.5",
                { "cursor-default": disabled },
                { "opacity-40": disabled }
              )}
              onClick={() => {
                if (disabled) {
                  return;
                }
                onClick?.();
                setIsOpen(false);
              }}
            >
              {Icon && <Icon className={cx("w-5", "h-5", "mr-2")} />}
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
