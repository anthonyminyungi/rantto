# Rantto

동행복권 로또6/45 복권 구매를 위한 나만의 응모 번호를 생성하고 보관할 수 있는 웹서비스

## 특징

- 전체, 1게임 무작위로 번호 뽑기
- 별도 서버 없이 브라우저(IndexedDB)에 뽑은 번호를 안전하게 보관
- 뽑은 번호를 클립보드에 쉽게 복사하는 기능
- 각 게임별 번호 직접 선택 기능
- 지난주 당첨번호 정보 매주 자동 업데이트

## 사용 기술

### Frontend

- **Language**: TypeScript
- **Framework/Library**: React v19, React Router
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Local Storage**: Dexie (IndexedDB)
- **Utilities**: es-toolkit, classnames, overlay-kit
- **Build/Bundler**: Vite v7
- **Package Manager**: pnpm

### Testing

- Vitest v3
- React Testing Library

### Infra, etc.

- Vercel (Hosting, Analytics, Speed Insights)
- GitHub Actions (CI/CD, Cron Jobs)
- GitHub API (Octokit)
- AWS Lambda
