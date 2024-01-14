import cx from "classnames";
import { MenuKey, Tab } from "@/types";
import { useMenuStore, useToastStore } from "@/store";
interface TabsProps {
  tabs: Tab[];
  onChange?: (tab?: Tab) => void;
}

export default function NavMenu({ tabs }: TabsProps) {
  const { menu: selected, setMenu } = useMenuStore();
  const { initToast } = useToastStore();

  const select = (menu: MenuKey) => () => {
    if (menu !== selected) {
      setMenu(menu);
      initToast();
    }
  };

  return (
    <div className={cx("flex", "justify-center", "items-center", "my-6")}>
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
