/** @type {import('tailwindcss').Config} */
import { spacing } from "./src/constants";

/* TODO: 임시 작성, 추후 개선 고민 */
const spaceSafeList = [
  ...spacing.map((v) => `w-${v}`),
  ...spacing.map((v) => `h-${v}`),
];

export default {
  safelist: [...spaceSafeList],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
