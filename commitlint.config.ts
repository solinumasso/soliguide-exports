/*
Soliguide: Useful information for those who need it

SPDX-FileCopyrightText: © 2024 Solinum

SPDX-License-Identifier: AGPL-3.0-only

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import type { UserConfig, AsyncRule } from "@commitlint/types";

const doesGithubIssueExists = async (
  issueNumber: number | string
): Promise<boolean> => {
  const githubIssueUrl = `https://api.github.com/repos/solinumasso/soliguide/issues/${issueNumber}`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
  const response = await fetch(githubIssueUrl, {
    headers,
  });
  if (!response.ok) {
    // skipcq: JS-A1004 we're just logging the status code, no risk
    console.warn(`Error fetching GitHub issue: ${response.status}`);
    return false;
  }
  return true;
};

const checkGithubIssues: AsyncRule = async (ctx) => {
  const message = "missing reference to a GitHub issue (e.g. #123)";
  if (ctx.header?.startsWith("chore: :pushpin: ")) {
    // It's a tag commit, no issue required
    return [true, message];
  }
  if (ctx?.references?.length === 0) {
    return [false, message];
  }
  const allReferencesAreValid = ctx.references.every(
    (reference) => reference.issue && reference.prefix === "#"
  );
  if (!allReferencesAreValid) {
    return [false, message];
  }
  if (process.env.GITHUB_TOKEN) {
    console.log("Checking issues presence in Github...");
    const allIssuesExistPromises = await Promise.all(
      ctx.references.map((reference) => doesGithubIssueExists(reference.issue))
    );
    const allIssuesExist = allIssuesExistPromises.every((bool) => bool);
    if (!allIssuesExist) {
      return [false, "one or more referenced GitHub issues do not exist"];
    }
  }
  return [true, message];
};

const Configuration: UserConfig = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes",
  ],
  rules: {
    // By default 100 characters but Deepsource links in Deepsource commits are too long
    "body-max-line-length": [2, "always", 120],
    "github-issue": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "github-issue": checkGithubIssues,
      },
    },
  ],
};
export default Configuration;
