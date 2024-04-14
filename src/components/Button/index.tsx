import cx from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import Spacer from "@/components/Spacer";

type ButtonColorVariant = "primary" | "secondary";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode | undefined;
  disabled?: boolean;
  variant?: ButtonColorVariant;
}

const getButtonBgColorByVariant = (variant: ButtonColorVariant) => {
  const obj = {
    primary: {
      normal: "bg-blue-500",
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
        "py-2",
        "px-4",
        "text-white",
        "rounded-md",
        "text-xl",
        "font-semibold",
        "align-middle",
        "flex",
        "items-center",
        { "cursor-not-allowed": disabled },
        { "opacity-40": disabled },
        /* hover */
        {
          [getButtonBgColorByVariant(variant).hover]: !disabled,
        },
        "hover:transition",
        /* sm */
        "max-sm:py-1",
        "max-sm:px-2",
        "max-sm:text-lg",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && (
        <>
          {icon}
          <Spacer direction="horizontal" space="2" />
        </>
      )}
      {children}
    </button>
  );
}
