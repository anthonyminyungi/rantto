import cx from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import Spacer from "@/components/Spacer";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode | undefined;
  disabled?: boolean;
}

export default function Button({ icon, children, ...rest }: ButtonProps) {
  return (
    <button
      className={cx(
        "bg-blue-500",
        "py-2",
        "px-4",
        "text-white",
        "rounded-md",
        "text-xl",
        "font-semibold",
        "align-middle",
        "flex",
        "items-center",
        /* hover */
        "hover:bg-blue-600",
        "hover:transition",
        /* sm */
        "max-sm:py-1",
        "max-sm:px-2",
        "max-sm:text-lg"
      )}
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
