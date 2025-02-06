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

import { aggregateUserRightsForAuth } from "../aggregateUserRightsForAuth";

import { UserRole, UserRightStatus } from "@soliguide/common";
import { USER_PRO } from "../../../../mocks";
import { UserPopulateType } from "../../../_models";

describe("aggregateUserRightsForAuth", () => {
  const USER_FOR_TEST: UserPopulateType = {
    ...USER_PRO,
    userRights: [
      {
        _id: "5fb648823cb90874d9ab1bef",
        organization_id: 2316,
        place_id: 1,
        territories: ["75"],
        role: UserRole.OWNER,
        status: UserRightStatus.VERIFIED,
      },
      {
        _id: "xxxx",
        organization_id: 230,
        place_id: 1,
        territories: ["75"],
        role: UserRole.OWNER,
        status: UserRightStatus.VERIFIED,
      },
    ],
  };
  describe("By user", () => {
    it("Should return the rights for the two organizations", () => {
      expect(aggregateUserRightsForAuth(USER_FOR_TEST)).toStrictEqual({
        places: [1],
        role: UserRole.OWNER,
      });
    });
  });
});
