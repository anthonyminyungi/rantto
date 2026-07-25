import InfoCircle from "@/assets/information-circle.svg?react";

export default function InfoLink() {
  return (
    <a
      href="https://anthonymin.notion.site/Rantto-dbd4aa3776d9456885cdf06b06bf5da0"
      target="_blank"
      className="flex w-fit items-center gap-1 rounded-md px-2 py-1 font-semibold text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-neutral-800"
    >
      <InfoCircle />
      사용 안내
    </a>
  );
}
