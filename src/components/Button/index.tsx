import cx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

type ButtonColorVariant = "primary" | "secondary";

interface ButtonProps
  extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode | undefined;
  disabled?: boolean;
  variant?: ButtonColorVariant;
}

const getButtonBgColorByVariant = (variant: ButtonColorVariant) => {
  const obj = {
    primary: {
      normal: "bg-blue-600",
      hover: "hover:bg-blue-600",
    },
    secondary: {
      normal: "bg-neutral-500",
      hover: "hover:bg-neutral-600",
    },
  };
  return obj[variant];
};

export default function Button({
  icon,
  disabled,
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx(
        getButtonBgColorByVariant(variant).normal,
        "rounded-md px-4 py-2 align-middle text-xl font-semibold text-white",
        "flex items-center gap-2",
        "max-sm:px-2 max-sm:py-1 max-sm:text-lg",
        { "cursor-not-allowed opacity-50": disabled },
        {
          [cx("cursor-pointer", getButtonBgColorByVariant(variant).hover)]:
            !disabled,
        },
        "transition-colors",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
