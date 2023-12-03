import { VercelRequest, VercelResponse } from "@vercel/node";
import { Octokit } from "@octokit/rest";
import { parse } from "node-html-parser";
import { format } from "date-fns";
import stringify from "json-stringify-pretty-compact";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
      timeZone: "Asia/Seoul",
    });

    const owner = "anthonyminyungi";
    const repo = "rantto";
    const filePath = "src/assets/winning_history.json";
    const message = "Update winning_history.json";
    const develop = "develop";
    const main = "main";
    const dhlotteryUrl = "https://dhlottery.co.kr/gameResult.do?method=byWin";

    /* 이번주 당첨번호 크롤링 */
    const data = await fetch(dhlotteryUrl);
    const root = parse(await data.text());
    const numbers = root
      .querySelectorAll(".nums .win .ball_645")
      .map((elem) => elem.text);
    const bonus = root.querySelector(".nums .bonus .ball_645")?.text;
    const round = root.querySelector(".win_result strong")?.text.slice(0, 4);

    console.log("data : ", round, numbers, bonus);

    /* 기존 당첨번호 데이터 접근 */
    const { data: getContent } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: main,
    });
    let json;
    let sha = "";
    if (!Array.isArray(getContent) && getContent.type === "file") {
      json = JSON.parse(atob(getContent.content));
      sha = getContent.sha;
    }
    /* 이번주 당첨번호 추가 */
    json.history.push({
      round,
      bonus,
      numbers,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    });

    console.log("json : ", json);

    /* develop 브랜치에 추가된 데이터 반영 update commit */
    const { data: updateFile } = await octokit.repos.createOrUpdateFileContents(
      {
        owner,
        repo,
        branch: develop,
        path: filePath,
        message,
        content: btoa(stringify(json)),
        sha,
        committer: {
          name: owner,
          email: "dbstnsdl12@naver.com",
        },
      }
    );

    console.log("commit id : ", updateFile.commit.sha);

    /* develop -> master pull request 생성 */
    const { data: createPR } = await octokit.rest.pulls.create({
      owner,
      repo,
      head: develop,
      base: main,
      title: message,
    });

    console.log("pr number : ", createPR.number);

    /* 생성된 pull request 병합 */
    const { data: mergePR } = await octokit.rest.pulls.merge({
      owner,
      repo,
      pull_number: createPR.number,
    });

    console.log("merged : ", mergePR.merged);

    if (!mergePR.merged) {
      res.statusCode = 500;
      res.send({ message: mergePR.message });
      return;
    }
    res.statusCode = 200;
    res.send({ message: "ok" });
  } catch (e) {
    console.error(e);
  }
}
