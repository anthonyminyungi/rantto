import { PropsWithChildren } from "react";
import { Link } from "react-router";

import NavMenu from "@/components/NavMenu";
import ToastList from "@/components/ToastList";
import ThemeToggle from "@/components/ThemeToggle";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-2">
        <header className="mb-4 flex items-center justify-between py-4">
          <div className="flex-1">
            <Link
              to="/"
              className="text-xl font-black text-blue-600 select-none dark:text-blue-400"
            >
              Rantto
            </Link>
          </div>
          <div className="flex flex-auto justify-center">
            <NavMenu />
          </div>
          <div className="flex flex-1 justify-end">
            <ThemeToggle />
          </div>
        </header>
        {children}
      </main>
      <ToastList />
    </>
  );
}
