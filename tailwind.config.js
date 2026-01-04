/** @type {import('tailwindcss').Config} */
import { spacing } from "./src/constants";

/* TODO: 임시 작성, 추후 개선 고민 */
const spaceSafeList = [
  ...spacing.map((v) => `w-${v}`),
  ...spacing.map((v) => `h-${v}`),
  ...[
    ...Array.from(Array(12), (_, i) => `grid-cols-${i + 1}`),
    "grid-cols-none",
  ],
];

export default {
  safelist: [...spaceSafeList],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      xs: "376px",
    },
    extend: {
      opacity: {
        15: ".15",
        35: ".35",
      },
    },
  },
  plugins: [],
};
