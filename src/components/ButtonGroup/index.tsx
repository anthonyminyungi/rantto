import { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "classnames";

interface ButtonGroupItem extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode | undefined;
}

interface ButtonGroupProps {
  items: ButtonGroupItem[];
}

export default function ButtonGroup({ items }: ButtonGroupProps) {
  return (
    <div
      className={cx(
        "grid",
        `grid-cols-${items.length}`,
        "text-xs",
        "grid-cols-"
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
            { "cursor-not-allowed": disabled },
            { "opacity-40": disabled },
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
