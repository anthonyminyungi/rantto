import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            // Gist 당첨번호 데이터 — network first, 캐시 폴백
            urlPattern: /^https:\/\/gist\.githubusercontent\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "winning-history-cache",
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24, // 1일
              },
            },
          },
        ],
      },
      manifest: {
        name: "Rantto - 로또 번호 랜덤 뽑기",
        short_name: "Rantto",
        description: "나만의 로또 번호를 마음껏 뽑아보세요",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/ms-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
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
