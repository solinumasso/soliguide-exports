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
import { CREATE_ORGA_OK_SIMPLE } from "./bodies/CREATE_ORGA.const";

import { supertest, getExpectedStatus, addAuth } from "../endPointTester";
import { TestAccounts, ExpectedStatus } from "../endPointTester.type";

const ALLOWED_USERS = [
  TestAccounts.USER_ADMIN_SOLIGUIDE,
  TestAccounts.USER_ADMIN_TERRITORY,
  TestAccounts.USER_PRO_OWNER,
];

describe.each(Object.values(TestAccounts))(
  "Organization admin test - PATCH",
  (currentAccountTest) => {
    // Successful test
    const expectedStatus = getExpectedStatus(
      ALLOWED_USERS,
      currentAccountTest,
      ExpectedStatus.SUCCESS
    );

    describe(`PATCH /organizations/6190169415b4826bc9d6af71 ${currentAccountTest}`, () => {
      test(`✅ PATCH /organizations/6190169415b4826bc9d6af71 - \t${expectedStatus}`, async () => {
        const patchOrga = { ...CREATE_ORGA_OK_SIMPLE };
        patchOrga.description = "New Description";
        const response = await addAuth(
          supertest()
            .patch("/organizations/6190169415b4826bc9d6af71")
            .send(patchOrga),
          currentAccountTest
        );

        expect(response.status).toEqual(expectedStatus);
        if (expectedStatus === 403 && response.status === 403) {
          return;
        }

        expect(response.body.organization_id).toEqual(expect.any(Number));
        expect(response.body.name).toEqual("Orga de test");
      });

      test(`❌ PATCH /organizations/6190169415b4826bc9d6af71 - \t${expectedStatus}`, async () => {
        const CREATE_ORGA_FAIL = { ...CREATE_ORGA_OK_SIMPLE };
        CREATE_ORGA_FAIL.name = ["555555"] as any;

        const response = await addAuth(
          supertest()
            .patch("/organizations/6190169415b4826bc9d6af71")
            .send(CREATE_ORGA_FAIL),
          currentAccountTest
        );
        const expectedStatus = getExpectedStatus(
          ALLOWED_USERS,
          currentAccountTest,
          ExpectedStatus.FAIL
        );
        expect(response.status).toEqual(expectedStatus);
        if (expectedStatus === 403 && response.status === 403) {
          return;
        }

        expect(response.body.length).toBeGreaterThan(0);
      });
    });
  }
);
