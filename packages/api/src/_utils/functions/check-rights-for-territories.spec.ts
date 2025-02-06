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

import { CountryCodes, UserStatus } from "@soliguide/common";
import { ExpressRequest } from "../../_models";
import {
  checkRightsForTerritories,
  checkUserTerritoryRights,
  validateCountry,
  validateTerritories,
} from "./check-rights-for-territories";

jest.mock("dot-object", () => ({
  pick: jest.fn(),
}));

describe("Test for function 'checkRightsForTerritories' used in 'territoriesDto'", () => {
  const mockReq = {
    body: {
      country: CountryCodes.FR,
      territories: ["75"],
    },
    user: {
      status: UserStatus.ADMIN_TERRITORY,
      areas: {
        [CountryCodes.FR]: { departments: ["75", "93"] },
      },
    },
  } as ExpressRequest;

  describe("Should verify the existence of territories", () => {
    it("should throw an error if territory does not exist for all", () => {
      mockReq.body.country = CountryCodes.FR;
      expect(() =>
        validateTerritories(mockReq.body.country, ["999"] as any)
      ).toThrow();
    });

    it("should throw an error if territory does not exist in Spain, but exists in France", () => {
      mockReq.body.country = CountryCodes.ES;
      expect(() => validateTerritories(mockReq.body.country, ["75"])).toThrow();
    });
  });

  describe("Should test existance of a country", () => {
    it("should throw an error if country is not allowed", () => {
      mockReq.body.country = "DE";
      expect(() => validateCountry(mockReq.body.country)).toThrow(
        "COUNTRY_IS_NOT_ALLOWED"
      );
    });

    it("should not throw an error if country is allowed", () => {
      mockReq.body.country = CountryCodes.FR;
      expect(() => validateCountry(mockReq.body.country)).not.toThrow(
        "COUNTRY_IS_NOT_ALLOWED"
      );
    });
  });

  describe("Should test user access", () => {
    it("should allow ADMIN_SOLIGUIDE to access any territory", () => {
      mockReq.user.status = UserStatus.ADMIN_SOLIGUIDE;
      expect(checkRightsForTerritories(["75"], mockReq)).toBe(true);
    });

    it("should throw an error if user does not have rights for the territory", () => {
      mockReq.user.status = UserStatus.ADMIN_TERRITORY;
      mockReq.user.areas = {
        [CountryCodes.FR]: { departments: ["75", "93"] },
      };

      expect(() =>
        checkUserTerritoryRights(mockReq.user, ["94"], mockReq.body.country)
      ).toThrow();
    });

    it("should allow ADMIN_TERRITORY with rights to access the territory", () => {
      expect(
        checkUserTerritoryRights(mockReq.user, ["93"], mockReq.body.country)
      ).toBe(true);
    });
    it("should allow ADMIN_TERRITORY with rights in multiple countries to access the territory", () => {
      mockReq.user.areas["es"] = { departments: ["08"] };
      expect(
        checkUserTerritoryRights(mockReq.user, ["08"], CountryCodes.ES)
      ).toBe(true);
    });
  });
});
