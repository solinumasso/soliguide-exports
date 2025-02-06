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
import { PlaceStatus, PlaceVisibility } from "@soliguide/common";

import { supertest, getExpectedStatus, addAuth } from "../endPointTester";
import { ExpectedStatus, TestAccounts } from "../endPointTester.type";
import { TypesenseClient } from "../../src/search-engine/services/TypesenseClient.service";
import { TypesensePlaceDocument } from "../../src/search-engine/documents";
import { typesensePlaceDocumentBuilder } from "../../mocks";

// API users are not yet allowed since we're in Alpha/Beta
const ALLOWED_USERS = [
  TestAccounts.USER_ADMIN_SOLIGUIDE,
  // TestAccounts.USER_API_ALIMENTATION,
  TestAccounts.USER_ADMIN_TERRITORY,
  // TestAccounts.USER_API_DEFAULT,
  // TestAccounts.USER_API_PARIS,
  TestAccounts.USER_PRO_EDITOR,
  TestAccounts.USER_PRO_OWNER,
  TestAccounts.USER_PRO_OWNER_ORGA1_EDITOR_ORGA2,
  TestAccounts.USER_PRO_READER,
  TestAccounts.USER_TRANSLATOR_EN_AR,
];

const VISIBILITY_AND_STATUS_COUNTERS = {
  [PlaceVisibility.ALL]: {
    [PlaceStatus.ONLINE]: 49,
    [PlaceStatus.DRAFT]: 12,
    [PlaceStatus.OFFLINE]: 27,
    [PlaceStatus.PERMANENTLY_CLOSED]: 3,
  },
  [PlaceVisibility.PRO]: {
    [PlaceStatus.ONLINE]: 89,
    [PlaceStatus.DRAFT]: 29,
    [PlaceStatus.OFFLINE]: 19,
    [PlaceStatus.PERMANENTLY_CLOSED]: 7,
  },
};

const CAN_SEE_ALL_COUNT: { [key in TestAccounts]: number } = {
  [TestAccounts.USER_ADMIN_SOLIGUIDE]: 49 + 12 + 27 + 3 + 89 + 29 + 19 + 7,
  [TestAccounts.USER_API_ALIMENTATION]: 49,
  [TestAccounts.USER_ADMIN_TERRITORY]: 49 + 12 + 27 + 3 + 89 + 29 + 19 + 7,
  [TestAccounts.USER_API_DEFAULT]: 49,
  [TestAccounts.USER_API_PARIS]: 49,
  [TestAccounts.USER_PRO_EDITOR]: 49 + 89,
  [TestAccounts.USER_PRO_OWNER]: 49 + 89,
  [TestAccounts.USER_PRO_OWNER_ORGA1_EDITOR_ORGA2]: 49 + 89,
  [TestAccounts.USER_PRO_READER]: 49 + 89,
  [TestAccounts.USER_TRANSLATOR_EN_AR]: 49,
  [TestAccounts.USER_API_BLOCKED]: 0, // we shouldn't arrive here because it's not an allowed user
};

const describeIfTypesense = () =>
  TypesenseClient.isTypesenseEnabled ? describe : describe.skip;

describeIfTypesense()("Search engine", () => {
  const typesenseClient = TypesenseClient.instance;
  let mockPlaces: TypesensePlaceDocument[] = [];

  beforeAll(async () => {
    await typesenseClient.deleteCollections();
    await typesenseClient.createCollections();
    // Merge all places to a single list
    mockPlaces = mockPlaces.concat(
      Object.values(PlaceVisibility).reduce(
        (visibilityAccumulator, visibility) => {
          return visibilityAccumulator.concat(
            Object.values(PlaceStatus).reduce((statusAccumulator, status) => {
              return statusAccumulator.concat(
                typesensePlaceDocumentBuilder.batch(
                  VISIBILITY_AND_STATUS_COUNTERS[visibility][status],
                  { visibility, status }
                )
              );
            }, [] as Array<TypesensePlaceDocument>)
          );
        },
        [] as Array<TypesensePlaceDocument>
      )
    );
    for await (const placeDocument of mockPlaces) {
      await typesenseClient.upsertPlace(placeDocument);
    }
  });

  afterAll(async () => {
    await typesenseClient.deleteCollections();
  });

  describe.each(Object.values(TestAccounts))(
    "search places",
    (currentAccountTest) => {
      it(`POST /v2/search - ${currentAccountTest} - should return places automatically filtered by visibility and status based on the user status`, async () => {
        const response = await addAuth(
          supertest().post("/v2/search").send({}),
          currentAccountTest
        );

        // Success test
        const expectedStatus = getExpectedStatus(
          ALLOWED_USERS,
          currentAccountTest,
          ExpectedStatus.SUCCESS
        );

        expect(response.status).toEqual(expectedStatus);
        if (expectedStatus === 403 && response.status === 403) {
          return;
        }
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.found).toEqual(
          CAN_SEE_ALL_COUNT[currentAccountTest]
        );
        // All places
        expect(response.body.out_of).toEqual(
          CAN_SEE_ALL_COUNT[TestAccounts.USER_ADMIN_SOLIGUIDE]
        );
        expect(response.body.page).toEqual(1);
      });
    }
  );
});
