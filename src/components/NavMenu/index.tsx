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
    <div className={cx("flex", "justify-center", "items-center", "my-6")}>
      {tabs.map(([key, tab]) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={key}
            to={tab.path}
            onClick={handleTabClick}
            className={cx(
              "mx-1",
              "py-2",
              "px-2",
              "cursor-pointer",
              "border-b-2",
              /* active */
              {
                "border-b-blue-500": isActive,
                "font-bold": isActive,
              },
              /* not active */
              {
                "border-b-transparent": !isActive,
                "hover:border-b-blue-300": !isActive,
                "hover:transition": !isActive,
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
