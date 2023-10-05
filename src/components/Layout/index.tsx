import { PropsWithChildren } from "react";
import cx from "classnames";
// import NavMenu from "@/components/NavMenu";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={cx("m-0", "p-0", "outline-none", "bg-transparent")}>
      <main className={cx("max-w-5xl", "mx-auto", "px-4", "py-2")}>
        {children}
      </main>
    </div>
  );
}
