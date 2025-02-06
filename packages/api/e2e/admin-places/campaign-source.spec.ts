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
import { CAMPAIGN_DEFAULT_NAME, CampaignSource } from "@soliguide/common";

import { addAuth, getExpectedStatus, supertest } from "../endPointTester";
import { TestAccounts, ExpectedStatus } from "../endPointTester.type";

const CAN_EDIT = [
  TestAccounts.USER_ADMIN_SOLIGUIDE,
  TestAccounts.USER_ADMIN_TERRITORY,
  TestAccounts.USER_PRO_OWNER,
  TestAccounts.USER_PRO_EDITOR,
  TestAccounts.USER_PRO_OWNER_ORGA1_EDITOR_ORGA2,
];

describe.each(Object.values(TestAccounts))(
  "Patch source campaign /admin/places/campaign-source/2",
  (currentAccountTest) => {
    describe(`> ${currentAccountTest}`, () => {
      test("✅ Correct data", async () => {
        const payload = { source: CampaignSource.CALL };
        const response = await addAuth(
          supertest().patch("/admin/places/campaign-source/2").send(payload),
          currentAccountTest
        );

        // Successful test
        const expectedStatus = getExpectedStatus(
          CAN_EDIT,
          currentAccountTest,
          ExpectedStatus.SUCCESS
        );

        expect(response.status).toEqual(expectedStatus);
        if (expectedStatus === 403 && response.status === 403) {
          return;
        }

        expect(response.body.lieu_id).toEqual(2);
        expect(response.body.campaigns[CAMPAIGN_DEFAULT_NAME].source).toEqual(
          payload.source
        );
      });

      test("🔴 Incorrect data", async () => {
        const response = await addAuth(
          supertest()
            .patch("/admin/places/campaign-source/2")
            .send({ source: "BAD_SOURCE" }),
          currentAccountTest
        );

        // Successful test
        const expectedStatus = getExpectedStatus(
          CAN_EDIT,
          currentAccountTest,
          ExpectedStatus.FAIL
        );

        expect(response.status).toEqual(expectedStatus);
        if (expectedStatus === 403 && response.status === 403) {
          return;
        }

        expect(response.body.lieu_id).toBeUndefined();
      });
    });
  }
);
