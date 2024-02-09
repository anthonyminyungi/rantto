import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  // https://ahnanne.tistory.com/95
  cacheDir: "./.vite",
  build: {
    rollupOptions: {
      external: [
        "/_vercel/speed-insights/script.js",
        "/_vercel/insights/script.js",
      ],
    },
  },
});
