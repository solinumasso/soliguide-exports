/*
 * Soliguide: Useful information for those who need it
 *
 * SPDX-FileCopyrightText: © 2024 Solinum
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { supertest, getExpectedStatus, addAuth } from "../endPointTester";
import { TestAccounts, ExpectedStatus } from "../endPointTester.type";

const ALLOWED_USERS_FOR_STATS = [
  TestAccounts.USER_ADMIN_SOLIGUIDE,
  TestAccounts.USER_ADMIN_TERRITORY,
  TestAccounts.USER_PRO_EDITOR,
  TestAccounts.USER_PRO_OWNER,
  TestAccounts.USER_PRO_OWNER_ORGA1_EDITOR_ORGA2,
  TestAccounts.USER_PRO_READER,
  TestAccounts.USER_TRANSLATOR_EN_AR,
];

describe.each(Object.values(TestAccounts))(
  "Tests of the route 'stats'",
  (currentAccountTest) => {
    describe(`GET /stats/services ${currentAccountTest}`, () => {
      test("✅ Count the amount of services", async () => {
        const response = await addAuth(
          supertest().get("/stats/services"),
          currentAccountTest
        );

        // Successful test
        const expectedStatus = getExpectedStatus(
          ALLOWED_USERS_FOR_STATS,
          currentAccountTest,
          ExpectedStatus.SUCCESS
        );

        expect(response.status).toEqual(expectedStatus);

        if (expectedStatus === 403 && response.status === 403) {
          return;
        }

        expect(response.body).toBeGreaterThan(0);
      });
    });

    describe(`GET /stats/all ${currentAccountTest}`, () => {
      test("✅ Count the amount of places", async () => {
        const response = await addAuth(
          supertest().get("/stats/all"),
          currentAccountTest
        );

        // Successful test
        const expectedStatus = getExpectedStatus(
          ALLOWED_USERS_FOR_STATS,
          currentAccountTest,
          ExpectedStatus.SUCCESS
        );

        expect(response.status).toEqual(expectedStatus);

        if (expectedStatus === 403 && response.status === 403) {
          return;
        }

        expect(response.body).toBeGreaterThan(0);
      });
    });
  }
);
