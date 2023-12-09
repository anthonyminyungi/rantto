import { VercelRequest, VercelResponse } from "@vercel/node";
import { Octokit } from "@octokit/rest";
import { parse } from "node-html-parser";
import { format } from "date-fns";
import stringify from "json-stringify-pretty-compact";

export const config = {
  runtime: "nodejs",
  regions: ["icn1"],
};

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
    const ownerEmail = "dbstnsdl12@naver.com";
    const repo = "rantto";
    const filePath = "src/assets/winning_history.json";
    const message = "Update winning_history.json";
    const develop = "develop";
    const main = "main";
    const tempBranch = "functions/update-winning-history";
    const dhlotteryUrl = "https://dhlottery.co.kr/gameResult.do?method=byWin";

    /* 이번주 당첨번호 크롤링 */
    const data = await fetch(dhlotteryUrl);
    const root = parse(await data.text());
    const numbers = root
      .querySelectorAll(".nums .win .ball_645")
      .map((elem) => Number.parseInt(elem.text, 10));
    const bonus = Number.parseInt(
      root.querySelector(".nums .bonus .ball_645")?.text || "",
      10
    );
    const round = Number.parseInt(
      (root.querySelector(".win_result strong")?.text || "").slice(0, 4),
      10
    );
    console.log("data : ", round, numbers, bonus);

    const { data: getRef } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${develop}`,
    });
    const developSha = getRef.object.sha;
    console.log(developSha);

    const { data: createRef } = await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${tempBranch}`,
      sha: developSha,
    });
    console.log("create ref : ", createRef);

    /* 기존 당첨번호 데이터 접근 */
    const { data: getContent } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: `heads/${tempBranch}`,
    });
    let json;
    let getContentSha = "";
    if (!Array.isArray(getContent) && getContent.type === "file") {
      json = JSON.parse(atob(getContent.content));
      getContentSha = getContent.sha;
    }
    /* 이번주 당첨번호 추가 */
    json.history.push({
      round,
      bonus,
      numbers,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    });
    console.log("json : ", json);

    /* 임시 브랜치에 추가된 데이터 반영 update commit */
    const { data: updateFile } = await octokit.repos.createOrUpdateFileContents(
      {
        owner,
        repo,
        branch: tempBranch,
        path: filePath,
        message,
        content: btoa(stringify(json)),
        sha: getContentSha,
        committer: {
          name: owner,
          email: ownerEmail,
        },
      }
    );
    console.log("commit id : ", updateFile.commit.sha);

    /* 임시 브랜치 -> develop pull request 생성 */
    const { data: createFilePR } = await octokit.rest.pulls.create({
      owner,
      repo,
      head: tempBranch,
      base: develop,
      title: message,
    });
    console.log("file pr number : ", createFilePR.number);

    /* 생성된 pull request 병합 */
    const { data: mergeFilePR } = await octokit.rest.pulls.merge({
      owner,
      repo,
      pull_number: createFilePR.number,
    });
    console.log("file pr merged : ", mergeFilePR.merged);

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

    res.statusCode = 200;
    res.send({ message: "ok" });
  } catch (e) {
    console.error(e);
  }
}
