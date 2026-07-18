/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren } from "react";

export interface ModalComponentProps {
  close: (value?: any) => void;
}

export interface ModalItemWrapperProps extends PropsWithChildren {
  backdrop?: "blur" | "dimmed" | "none";
  center?: boolean;
}

