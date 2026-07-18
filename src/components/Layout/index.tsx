import { PropsWithChildren } from "react";
import cx from "classnames";

import NavMenu from "@/components/NavMenu";
import ToastList from "@/components/ToastList";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className={cx("max-w-5xl", "mx-auto", "px-4", "py-2")}>
        <NavMenu />
        {children}
      </main>
      <ToastList />
    </>
  );
}
