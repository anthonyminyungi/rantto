# Rantto Project Agent Rules

This project is a React-based web application for generating and managing lottery numbers (Rantto).
When assisting with this repository, strictly adhere to the following rules and context.

## Technology Stack & Constraints

- **Package Manager**: Use `pnpm`. **DO NOT** use `npm` or `yarn`.
- **Framework**: React 19 and Vite 7.
- **Styling**: Tailwind CSS v4. Note that Tailwind v4 does not use `tailwind.config.js` in the traditional way and is imported via `@import "tailwindcss";` in CSS files.
- **Utilities**: Use `es-toolkit` for utility functions. **DO NOT** add or use `lodash`.
- **State Management**: Use `zustand`.
- **Database**: Use `dexie` (IndexedDB) for client-side storage.

## Key Commands

- Install dependencies: `pnpm install`
- Start development server: `pnpm run dev`
- Build for production: `pnpm run build`
- Run tests: `pnpm run test`
- Lint code: `pnpm run lint`

## Project Specifics

- **Lottery Data**: The project fetches and parses Korean Donghang Lottery (동행복권) data. The parsing logic is sensitive to DOM changes on the Donghang Lottery website.
- **Vercel Integration**: `@vercel/analytics` and `@vercel/speed-insights` are installed as npm dependencies and injected at the application root (`src/main.tsx`).
- **Github Actions**: Used for CI/CD, testing, and cron jobs (e.g., automatically updating winning history).
