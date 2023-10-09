export function getBallBgColor(num: number) {
  /* https://tailwindcss.com/docs/content-configuration#dynamic-class-names */
  return {
    "bg-gray-300": num === 0,
    "bg-yellow-500": num > 0 && num <= 10,
    "bg-sky-500": num > 10 && num <= 20,
    "bg-rose-500": num > 20 && num <= 30,
    "bg-zinc-500": num > 30 && num <= 40,
    "bg-lime-500": num > 40,
  };
}
