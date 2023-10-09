import cx from "classnames";
import Spacer from "@/components/Spacer";
import DrawItem from "@/components/DrawItem";
import { useState } from "react";

export default function DrawSection() {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className={cx("flex", "justify-center", "w-full")}>
      <div
        className={cx(
          "grow",
          "flex",
          "flex-col",
          "items-center",
          "border",
          "border-gray-400",
          "max-w-2xl",
          "rounded-lg",
          "py-6",
          "px-4",
          "max-sm:px-2"
        )}
      >
        <button
          className={cx(
            "bg-blue-500",
            "py-2",
            "px-4",
            "text-white",
            "rounded-md",
            "text-xl",
            "font-semibold",
            "align-middle",
            "flex",
            "items-center",
            /* hover */
            "hover:bg-blue-600",
            "hover:transition",
            /* sm */
            "max-sm:py-1",
            "max-sm:px-2",
            "max-sm:text-lg"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
          >
            <path
              fillRule="evenodd"
              d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
              clipRule="evenodd"
            />
          </svg>
          &nbsp; 5회 뽑기
        </button>
        <Spacer direction="vertical" space={"4"} />
        <div>
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
          <Spacer direction="vertical" space={"2"} />
          <DrawItem />
        </div>
        <Spacer direction="vertical" space={"4"} />
        <div className={cx("flex")}>
          <button
            className={cx(
              "bg-blue-500",
              "py-2",
              "px-4",
              "text-white",
              "rounded-md",
              "text-xl",
              "font-semibold",
              "align-middle",
              "flex",
              "items-center",
              /* hover */
              "hover:bg-blue-600",
              "hover:transition",
              /* sm */
              "max-sm:py-1",
              "max-sm:px-2",
              "max-sm:text-lg"
            )}
            onClick={copyToClipboard}
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
              >
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
              >
                <path
                  fillRule="evenodd"
                  d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
                  clipRule="evenodd"
                />
                <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
                <path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
              </svg>
            )}
            &nbsp;{copied ? "복사됨" : "전체복사"}
          </button>
          <Spacer direction="horizontal" space={"2"} />
          <button
            className={cx(
              "bg-blue-500",
              "py-2",
              "px-4",
              "text-white",
              "rounded-md",
              "text-xl",
              "font-semibold",
              "align-middle",
              "flex",
              "items-center",
              /* hover */
              "hover:bg-blue-600",
              "hover:transition",
              /* sm */
              "max-sm:py-1",
              "max-sm:px-2",
              "max-sm:text-lg"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cx("w-6", "h-6", "max-sm:w-5", "max-sm:h-5")}
            >
              <path
                fillRule="evenodd"
                d="M5.478 5.559A1.5 1.5 0 016.912 4.5H9A.75.75 0 009 3H6.912a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H15a.75.75 0 000 1.5h2.088a1.5 1.5 0 011.434 1.059l2.213 7.191H17.89a3 3 0 00-2.684 1.658l-.256.513a1.5 1.5 0 01-1.342.829h-3.218a1.5 1.5 0 01-1.342-.83l-.256-.512a3 3 0 00-2.684-1.658H3.265l2.213-7.191z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v6.44l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 011.06-1.06l1.72 1.72V3a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp; 보관하기
          </button>
        </div>
      </div>
    </div>
  );
}
