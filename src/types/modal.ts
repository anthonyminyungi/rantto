/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, ComponentType, PropsWithChildren } from "react";

export interface ModalComponentProps {
  close: (value?: any) => void;
}

export interface ModalItemWrapperProps extends PropsWithChildren {
  backdrop?: "blur" | "dimmed" | "none";
  center?: boolean;
}

export interface ModalItemOptions {
  onClose?: () => void;
}

export interface ModalItem {
  id?: string;
  /* TODO: any 대체 고민 */
  component: ComponentType<any>;
  props?: ComponentProps<any>;
  options?: ModalItemOptions;
  wrapperProps?: ModalItemWrapperProps;
}
