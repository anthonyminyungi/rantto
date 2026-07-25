# Rantto Project Agent Rules

This project is a React-based web application for generating and managing lottery numbers (Rantto).
When assisting with this repository, strictly adhere to the following rules and context.

## Technology Stack & Constraints

- **Package Manager**: Use `pnpm`. **DO NOT** use `npm` or `yarn`.
- **Framework**: React 19 and Vite 7.
- **Routing**: Use `react-router` (v8).
- **Styling**: Tailwind CSS v4. Note that Tailwind v4 does not use `tailwind.config.js` in the traditional way and is imported via `@import "tailwindcss";` in CSS files. Use `clsx` for dynamic class names. Ensure Dark Theme is supported using `dark:` variants.
- **Utilities**: Use `es-toolkit` for utility functions. **DO NOT** add or use `lodash`.
- **State Management**: Use `zustand`.
- **Overlays/Modals**: Use `overlay-kit` to manage modals and overlays.
- **Database**: Use `dexie` (IndexedDB) with `dexie-react-hooks` for client-side storage.
- **PWA Support**: The project is a Progressive Web App using `vite-plugin-pwa`.
- **Testing**: Use `vitest` and `@testing-library/react`.

## Key Commands

- Install dependencies: `pnpm install`
- Start development server: `pnpm run dev`
- Build for production: `pnpm run build`
- Run tests: `pnpm run test`
- Lint code: `pnpm run lint`
- Format code: `pnpm run format`

## Project Specifics & Terminology

- **Lottery Data**: The project fetches and parses Korean Donghang Lottery (동행복권) data. The parsing logic is sensitive to DOM changes on the Donghang Lottery website.
- **Terminology**: Always use the term **"게임" (Game)** instead of "개별 번호 세트" (individual number sets) across the UI and codebase.
- **Vercel Integration**: `@vercel/analytics` and `@vercel/speed-insights` are installed as npm dependencies and injected at the application root (`src/main.tsx`).
- **Github Actions & Versioning**: Used for CI/CD, testing, and cron jobs (e.g., automatically updating winning history). Versioning and changelogs are automated using `release-please`.
- **Web Share API**: The project uses the native Web Share API for sharing content where applicable.
