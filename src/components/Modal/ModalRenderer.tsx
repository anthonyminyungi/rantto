import { useModalStore } from "@/store";
import ModalItemWrapper from "./ModalItemWrapper";
import { createPortal } from "react-dom";
import { useLayoutEffect } from "react";
import { startScroll, stopScroll } from "@/utils";

export default function ModalRenderer() {
  const { modals } = useModalStore();
  const container = document.getElementById(
    "global-modal-container"
  ) as Element;

  useLayoutEffect(() => {
    if (modals.length === 0 && container.classList.contains("active")) {
      container.classList.remove("active");
      startScroll();
    } else if (modals.length > 0 && !container.classList.contains("active")) {
      stopScroll();
      container.classList.add("active");
    }
    return () => {
      if (modals.length === 0 && container.classList.contains("active")) {
        container.classList.remove("active");
        startScroll();
      }
    };
  }, [container.classList, modals.length]);

  return (
    <>
      {modals.length > 0 &&
        modals.map(({ id, component: Component, props, wrapperProps }) => {
          return createPortal(
            <ModalItemWrapper key={id} {...wrapperProps}>
              <Component {...props} />
            </ModalItemWrapper>,
            container
          );
        })}
    </>
  );
}
