import cx from "classnames";
import { MenuKey } from "@/types";
import { useMenuStore } from "@/store";

type Tab = [MenuKey, string];

interface TabsProps {
  tabs: Tab[];
  onChange?: (tab?: Tab) => void;
}

export default function NavMenu({ tabs }: TabsProps) {
  const { menu: selected, setMenu } = useMenuStore();

  const select = (menu: MenuKey) => () => {
    if (menu !== selected) {
      setMenu(menu);
    }
  };

  return (
    <div className={cx("flex", "justify-center", "items-center", "my-10")}>
      {tabs.map(([key, text]) => (
        <div
          key={key}
          className={cx(
            "mx-1",
            "py-2",
            "px-2",
            "cursor-pointer",
            "border-b-2",
            /* active */
            {
              "border-b-blue-500": key === selected,
              "font-bold": key === selected,
            },
            /* not active */
            {
              "border-b-transparent": key !== selected,
              "hover:border-b-blue-300": key !== selected,
              "hover:transition": key !== selected,
            }
          )}
          onClick={select(key)}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
