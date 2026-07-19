import cx from "clsx";
import { Link, useLocation } from "react-router";

import { MENU_TABS } from "@/constants";
import { useToastStore } from "@/store";
import { entriesFromObject } from "@/utils";

export default function NavMenu() {
  const location = useLocation();
  const { initToast } = useToastStore();

  const handleTabClick = () => initToast();

  const tabs = entriesFromObject(MENU_TABS);

  return (
    <div className="flex items-center rounded-full bg-gray-200/50 p-1 dark:bg-neutral-800">
      {tabs.map(([key, tab]) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={key}
            to={tab.path}
            onClick={handleTabClick}
            className={cx(
              "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
              {
                "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white":
                  isActive,
                "text-gray-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100":
                  !isActive,
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
