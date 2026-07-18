import cx from "classnames";
import { Link, useLocation } from "react-router";

import { MENU_TABS } from "@/constants";
import { useToastStore } from "@/store";
import { entriesFromObject } from "@/utils";

export default function NavMenu() {
  const location = useLocation();
  const { initToast } = useToastStore();

  const handleTabClick = () => {
    initToast();
  };

  const tabs = entriesFromObject(MENU_TABS);

  return (
    <div className={cx("flex", "items-center", "bg-gray-200/50", "dark:bg-neutral-800", "rounded-full", "p-1")}>
      {tabs.map(([key, tab]) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={key}
            to={tab.path}
            onClick={handleTabClick}
            className={cx(
              "px-4",
              "py-1.5",
              "text-sm",
              "font-medium",
              "rounded-full",
              "transition-all",
              "duration-200",
              /* active */
              {
                "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white": isActive,
              },
              /* not active */
              {
                "text-gray-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100": !isActive,
              }
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
