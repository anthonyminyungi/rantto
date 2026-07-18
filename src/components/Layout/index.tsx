import { PropsWithChildren } from "react";
import cx from "classnames";
import { Link } from "react-router";

import NavMenu from "@/components/NavMenu";
import ToastList from "@/components/ToastList";
import ThemeToggle from "@/components/ThemeToggle";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className={cx("max-w-3xl", "mx-auto", "px-4", "py-2")}>
        <header className={cx("flex", "items-center", "justify-between", "py-4", "mb-4")}>
          <div className="flex-1">
            <Link to="/" className="text-xl font-black text-blue-600 dark:text-blue-400 select-none">
              Rantto
            </Link>
          </div>
          <div className="flex-auto flex justify-center">
            <NavMenu />
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </header>
        {children}
      </main>
      <ToastList />
    </>
  );
}
