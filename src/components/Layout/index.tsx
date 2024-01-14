import { PropsWithChildren } from "react";
import cx from "classnames";

import NavMenu from "@/components/NavMenu";
import ToastList from "@/components/ToastList";
import { MENU_TABS } from "@/constants";
import { entriesFromObject } from "@/utils";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      /** child fixed element가 parent element의 box에 영향을 받도록 하려면
       * transform, perspective, filter attribute가 필요
       * https://developer.mozilla.org/ko/docs/Web/CSS/transform
       */
      className={cx(
        "m-0",
        "p-0",
        "outline-none",
        "bg-transparent",
        /* sm */
        "sm:rotate-0"
      )}
    >
      <main className={cx("max-w-5xl", "mx-auto", "px-4", "py-2")}>
        <NavMenu tabs={entriesFromObject(MENU_TABS)} />
        {children}
      </main>
      <ToastList />
    </div>
  );
}
