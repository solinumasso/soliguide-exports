#!/usr/bin/env node
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

const { exit, env } = require("node:process");

const githubToken = env.GITHUB_TOKEN;
const graphqlEndpoint = "https://api.github.com/graphql";
const repoOwner = "solinumasso";
const repoName = "soliguide";
const boardNumber = 2;
const boardIterationField = "Sprint";

const getGithubPR = async (prNumber) => {
  const headers = {
    Authorization: `bearer ${githubToken}`,
    "Content-Type": "application/json",
  };
  const response = await fetch(graphqlEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `
        query pr($owner: String!, $repo: String!, $iterationField: String!, $prNumber: Int!) {
          repository(owner: $owner, name: $repo) {
            pullRequest(number: $prNumber) {
              title
              commits(first: 100) {
                nodes {
                  commit {
                    message
                  }
                }
              }
              projectItems(first: 10) {
                nodes {
                  project {
                    number
                    title
                  }
                }
              }
              closingIssuesReferences(first: 20) {
                nodes {
                  number
                  title
                  projectItems(first: 10) {
                    nodes {
                      project {
                        number
                        title
                      }
                      iteration: fieldValueByName(name: $iterationField) {
                        ... on ProjectV2ItemFieldIterationValue {
                          title
                          startDate
                          duration
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        owner: repoOwner,
        repo: repoName,
        prNumber,
        iterationField: boardIterationField,
      },
    }),
  });
  if (!response.ok) {
    // skipcq: JS-A1004 we're just logging the status code, no risk
    console.error(`Error fetching GitHub pull request: ${response.status}`);
    exit(1);
  }
  const jsonResponse = await response.json();
  if (jsonResponse.errors) {
    console.error("GraphQL errors:", jsonResponse.errors);
    exit(2);
  }
  // Uncomment to debug
  // console.debug(JSON.stringify(jsonResponse));
  return jsonResponse.data;
};

const validatePRNotInBoard = (responseData) => {
  const board = responseData.repository.pullRequest.projectItems.nodes.find(
    (node) => node.project.number === boardNumber
  );
  if (board) {
    console.error(
      "This PR should not be attached to a project, but to an issue attached to the project"
    );
    exit(7);
  }
};

const validateIssueInBoardIteration = (issueData) => {
  const issueNumber = issueData.number;
  const board = issueData.projectItems.nodes.find(
    (node) => node.project.number === boardNumber
  );
  if (!board) {
    console.error(`Issue #${issueNumber} is not linked to the project`);
    exit(3);
  }
  const iteration = board.iteration;
  if (!iteration) {
    console.error(
      `Issue #${issueNumber} is not in the board iteration ${boardIterationField}`
    );
    exit(4);
  }
  const today = new Date();
  const iterationStartDate = new Date(iteration.startDate);
  if (today < iterationStartDate) {
    console.error(
      `Issue #${issueNumber} is in a furute iteration: ${
        iteration.title
      }. The iteration starts on ${iterationStartDate.toISOString()}`
    );
    exit(5);
  }
  const iterationEndDate = new Date(iterationStartDate);
  iterationEndDate.setDate(iterationEndDate.getDate() + iteration.duration);
  if (today > iterationEndDate) {
    console.error(
      `Issue #${issueNumber} is in a past iteration: ${
        iteration.title
      }. The iteration ends on ${iterationEndDate.toISOString()}`
    );
    exit(6);
  }
};

const validateIssuesClosedByPR = (responseData) => {
  const isssesClosedByPR =
    responseData.repository.pullRequest.closingIssuesReferences.nodes;
  if (!isssesClosedByPR.length) {
    console.error("No issue linked to this PR");
    exit(8);
  }
  isssesClosedByPR.forEach(validateIssueInBoardIteration);
  return isssesClosedByPR;
};

const getIssuesFromCommits = (responseData) => {
  const issuesRegex = /#(\d+)/g;
  return responseData.repository.pullRequest.commits.nodes
    .map((node) => node.commit.message)
    .reduce((accumulator, commit) => {
      const matches = commit.matchAll(issuesRegex);
      for (const match of matches) {
        const issueNumber = Number(match[1]);
        accumulator.add(issueNumber);
      }
      return accumulator;
    }, new Set());
};

const validateLinkedIssuesInCommits = (linkedIssues, issuesInCommits) => {
  for (const linkedIssue of linkedIssues) {
    if (issuesInCommits.has(linkedIssue)) {
      issuesInCommits.delete(linkedIssue);
    } else {
      console.error(`Issue #${linkedIssue} is not included in the commits`);
      exit(9);
    }
  }
  if (issuesInCommits.size > 0) {
    console.error(
      `The following issues are included in the commits but not linked to this PR: ${Array.from(
        issuesInCommits
      )
        .map((issue) => `#${issue}`)
        .join(", ")}`
    );
    exit(10);
  }
};

if (!githubToken) {
  console.error("Please set the GITHUB_TOKEN environment variable");
  exit(42);
}

if (!env.GITHUB_PR_NUMBER) {
  console.error("Please set the GITHUB_PR_NUMBER environment variable");
  exit(43);
}

const prNumber = Number(env.GITHUB_PR_NUMBER);

getGithubPR(prNumber).then((responseData) => {
  console.log(`PR title: ${responseData.repository.pullRequest.title}`);
  validatePRNotInBoard(responseData);
  const linkedIssues = validateIssuesClosedByPR(responseData).map(
    (issue) => issue.number
  );
  const issuesInCommits = getIssuesFromCommits(responseData);
  validateLinkedIssuesInCommits(linkedIssues, issuesInCommits);
});
