import { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "clsx";

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
    <div className={cx("grid text-xs", GRID_COLS[items.length])}>
      {items.map(({ text, icon, className, disabled, ...rest }) => (
        <button
          key={text}
          className={cx(
            "first:rounded-s-md last:rounded-e-md",
            "bg-gray-400 p-3 align-middle font-semibold text-white dark:bg-neutral-700",
            "flex flex-col items-center justify-center transition-colors",
            { "cursor-not-allowed opacity-50": disabled },
            {
              "cursor-pointer hover:bg-gray-500 dark:hover:bg-neutral-600":
                !disabled,
            },
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
