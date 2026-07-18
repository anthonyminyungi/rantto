/** @type {import('tailwindcss').Config} */
export default {
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
