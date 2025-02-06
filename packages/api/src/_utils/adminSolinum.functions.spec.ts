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
import { USER_ADMIN_SOLIGUIDE } from "../../mocks/users/USER_ADMIN_SOLIGUIDE.mock";

import { USER_ADMIN_TERRITORY } from "../../mocks/users/USER_ADMIN_TERRITORY.mock";
import { ONLINE_PLACE } from "../../mocks/places/ONLINE_PLACE.mock";
import { ONLINE_ITINERARY } from "../../mocks/places/ONLINE_ITINERARY.mock";
import { USER_INVITED } from "../../mocks/users/USER_INVITED.mock";

import {
  hasAdminAccessToOrga,
  hasAdminAccessToPlace,
} from "./adminSolinum.functions";
import { CountryAreaTerritories, CountryCodes } from "@soliguide/common";
import { ORGANIZATION, USER_PRO, USER_SIMPLE } from "../../mocks";

const areasIn93 = {
  fr: new CountryAreaTerritories<CountryCodes.FR>({
    departments: ["93"],
  }),
};

const areasIn01 = {
  fr: new CountryAreaTerritories<CountryCodes.FR>({
    departments: ["01", "75"],
  }),
};

describe("Functions to set admin status, and check access restrictions", () => {
  describe("Check access to an ADMIN_SOLIGUIDE user", () => {
    it("ADMIN_SOLIGUIDE: should access to all", () => {
      expect(
        hasAdminAccessToOrga(USER_ADMIN_SOLIGUIDE, USER_ADMIN_SOLIGUIDE)
      ).toBe(true);
    });
    it("USER_ADMIN_TERRITORY: access denied", () => {
      expect(
        hasAdminAccessToOrga(USER_ADMIN_TERRITORY, USER_ADMIN_SOLIGUIDE)
      ).toBe(false);
    });
    it("PRO: access denied", () => {
      expect(hasAdminAccessToOrga(USER_PRO, USER_ADMIN_SOLIGUIDE)).toBe(false);
    });
    it("SIMPLE_USER: access denied", () => {
      expect(hasAdminAccessToOrga(USER_SIMPLE, USER_ADMIN_SOLIGUIDE)).toBe(
        false
      );
    });
  });

  describe("hasAdminAccessToPlace: Check access to a place", () => {
    const itinerary = { ...ONLINE_ITINERARY };
    itinerary.parcours[0].position.departmentCode = "93";

    it("ADMIN_SOLIGUIDE: should access to all", () => {
      expect(hasAdminAccessToPlace(USER_ADMIN_SOLIGUIDE, ONLINE_PLACE)).toBe(
        true
      );
    });

    it("ADMIN_TERRITORY of '93' can access to a place in this department", () => {
      expect(
        hasAdminAccessToPlace(
          { ...USER_ADMIN_TERRITORY, areas: areasIn93 },
          itinerary
        )
      ).toBe(true);
    });
  });

  describe("Check access to an organization or a user ", () => {
    it("ADMIN_SOLIGUIDE: should access to all", () => {
      expect(hasAdminAccessToOrga(USER_ADMIN_SOLIGUIDE, USER_INVITED)).toBe(
        true
      );
      expect(
        hasAdminAccessToOrga(USER_ADMIN_SOLIGUIDE, USER_ADMIN_SOLIGUIDE)
      ).toBe(true);
    });

    it("ADMIN_TERRITORY of '93' can access to organizations & users in '93'", () => {
      expect(
        hasAdminAccessToOrga(
          {
            ...USER_ADMIN_TERRITORY,
            areas: areasIn93,
          },
          USER_INVITED
        )
      ).toBe(true);

      expect(
        hasAdminAccessToOrga(
          {
            ...USER_ADMIN_TERRITORY,
            areas: areasIn93,
          },
          {
            ...ORGANIZATION,
            areas: areasIn93,
          }
        )
      ).toBe(true);
    });

    it("ADMIN_TERRITORY of '93' cannot access to organizations & users in '01'", () => {
      const areasInDifferentDepartment = {
        areas: areasIn01,
      };
      expect(
        hasAdminAccessToOrga(
          {
            ...USER_ADMIN_TERRITORY,
            ...areasInDifferentDepartment,
          },
          USER_INVITED
        )
      ).toBe(false);

      expect(
        hasAdminAccessToOrga(
          {
            ...USER_ADMIN_TERRITORY,
            ...areasInDifferentDepartment,
          },
          USER_INVITED
        )
      ).toBe(false);
    });
  });
});
