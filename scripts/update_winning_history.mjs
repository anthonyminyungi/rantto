/**
 * update_winning_history.mjs
 *
 * 동행복권 API에서 최신 로또 당첨번호를 가져와 Gist를 업데이트하는 스크립트.
 * 기존 AWS Lambda 핸들러를 GitHub Actions용으로 이관한 버전.
 *
 * 의존성: playwright, @octokit/rest, json-stringify-pretty-compact
 * (워크플로우에서 npm install로 설치됨 — 클라이언트 package.json과 분리)
 */

import { chromium } from "playwright";
import { Octokit } from "@octokit/rest";
import stringify from "json-stringify-pretty-compact";

const GIST_ID = "a7237c0717400512855c890d5b0e1ba3";
const FILE_NAME = "lotto-winning-history.json";
const BASE_URL = "http://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=";

async function getGistData(octokit) {
  const gist = await octokit.gists.get({ gist_id: GIST_ID });
  const content = gist.data.files[FILE_NAME].content;
  return JSON.parse(content);
}

async function fetchWinningNumbers(round) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const response = await page.goto(`${BASE_URL}${round}`, {
      waitUntil: "domcontentloaded",
    });

    const text = await response.text();

    // API는 JSON을 직접 반환
    const data = JSON.parse(text);

    if (data.returnValue !== "success") {
      console.log(`회차 ${round}: 아직 추첨 전이거나 데이터 없음`);
      return null;
    }

    return {
      round: data.drwNo,
      numbers: [
        data.drwtNo1,
        data.drwtNo2,
        data.drwtNo3,
        data.drwtNo4,
        data.drwtNo5,
        data.drwtNo6,
      ],
      bonus: data.bnusNo,
      createdAt: data.drwNoDate,
    };
  } finally {
    await browser.close();
  }
}

async function updateGist(octokit, data) {
  await octokit.gists.update({
    gist_id: GIST_ID,
    files: {
      [FILE_NAME]: {
        content: stringify(data, { maxLength: 60 }),
      },
    },
  });
}

async function main() {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) {
    throw new Error("GITHUB_ACCESS_TOKEN 환경변수가 설정되지 않았습니다.");
  }

  const octokit = new Octokit({ auth: token });

  // 1. 현재 Gist 데이터 가져오기
  const gistData = await getGistData(octokit);
  const history = gistData.history || [];
  const lastRound = history.length > 0 ? history[history.length - 1].round : 0;
  const nextRound = lastRound + 1;

  console.log(`마지막 저장 회차: ${lastRound}, 다음 조회 회차: ${nextRound}`);

  // 2. 새 회차 당첨번호 조회
  const newData = await fetchWinningNumbers(nextRound);

  if (!newData) {
    console.log("신규 데이터 없음. 업데이트 건너뜀.");
    return;
  }

  console.log(
    `${newData.round}회차 당첨번호: ${newData.numbers.join(", ")} + 보너스 ${newData.bonus}`
  );

  // 3. history에 추가 후 Gist 업데이트
  history.push(newData);
  gistData.history = history;

  await updateGist(octokit, gistData);
  console.log(`Gist 업데이트 완료 (${newData.round}회차)`);
}

main().catch((err) => {
  console.error("실행 오류:", err);
  process.exit(1);
});
