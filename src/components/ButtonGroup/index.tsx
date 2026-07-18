import { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "classnames";

interface ButtonGroupItem extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode | undefined;
}

interface ButtonGroupProps {
  items: ButtonGroupItem[];
}

const GRID_COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function ButtonGroup({ items }: ButtonGroupProps) {
  return (
    <div
      className={cx(
        "grid",
        GRID_COLS[items.length],
        "text-xs"
      )}
    >
      {items.map(({ text, icon, className, disabled, ...rest }) => (
        <button
          key={text}
          className={cx(
            "first:rounded-s-md",
            "last:rounded-e-md",
            "bg-gray-400",
            "p-3",
            "text-white",
            "font-semibold",
            "align-middle",
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "transition-all",
            { "cursor-not-allowed opacity-50": disabled },
            /* hover */
            { "hover:bg-gray-500": !disabled },
            className
          )}
          disabled={disabled}
          {...rest}
        >
          {icon}
          {text && <span>{text}</span>}
        </button>
      ))}
    </div>
  );
}
