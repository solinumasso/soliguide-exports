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
import {
  CountryAreaTerritories,
  CountryCodes,
  UserStatus,
} from "@soliguide/common";
import { FilterQuery } from "mongoose";
import { parseTerritories } from "../parse-territories";
import { User } from "../../../../_models";

const searchForSpain = {
  country: CountryCodes.ES,
  territories: ["01", "08", "09", "02", "984", "986", "987", "988"],
};

const searchForFrance = {
  country: CountryCodes.FR,
  territories: [
    "01",
    "02",
    "03",
    "75",
    "90",
    "978",
    "984",
    "986",
    "987",
    "988",
  ],
};
describe("parseTerritories", () => {
  let query: FilterQuery<any>;
  let searchData: { [key: string]: any };
  let user: User;

  describe("Should filter territories requested to return only authorized territories for 'ADMIN_TERRITORY'", () => {
    beforeEach(() => {
      query = {};
      searchData = {
        country: CountryCodes.FR,
        territories: [
          "01",
          "02",
          "03",
          "75",
          "90",
          "00",
          "978",
          "984",
          "986",
          "987",
          "988",
        ],
      };

      user = {
        status: UserStatus.ADMIN_TERRITORY,
        territories: ["01", "03", "978", "984", "986", "987", "988"],
        areas: {
          fr: new CountryAreaTerritories<CountryCodes.FR>({
            departments: ["01", "03"],
          }),
        },
      } as User;
    });

    it("Territories", () => {
      parseTerritories(query, searchData, "territories", user);

      expect(query).toEqual({
        country: CountryCodes.FR,
        territories: { $in: ["01", "03"] },
      });
    });

    it("Areas", () => {
      parseTerritories(query, searchData, "territories", user, true);
      expect(query).toEqual({
        "areas.fr.departments": { $in: ["01", "03"] },
      });
    });
  });

  describe("Nothing should be returned, because the territorial administrator has no rights in Spain", () => {
    beforeEach(() => {
      query = {};
    });

    const searchForSpain = {
      country: CountryCodes.ES,
      territories: ["01", "02", "984", "986", "987", "988"],
    };

    it("Territories: should return territories as ", () => {
      parseTerritories(query, searchForSpain, "territories", user);
      expect(query).toEqual({
        country: CountryCodes.ES,
        territories: { $in: [] },
      });
    });

    it("Areas", () => {
      parseTerritories(query, searchForSpain, "territories", user, true);
      expect(query).toEqual({
        "areas.es.departments": { $in: [] },
      });
    });
  });

  describe("Must return only authorized territories", () => {
    beforeEach(() => {
      query = {};
      user.areas = {
        es: new CountryAreaTerritories<CountryCodes.FR>({
          departments: ["08", "09"],
        }),
      };
    });

    it("Territories array", () => {
      parseTerritories(query, searchForSpain, "territories", user);
      expect(query).toEqual({
        country: CountryCodes.ES,
        territories: { $in: ["08", "09"] },
      });
    });

    it("Areas array", () => {
      parseTerritories(query, searchForSpain, "territories", user, true);
      expect(query).toEqual({
        "areas.es.departments": { $in: ["08", "09"] },
      });
    });
  });

  describe("Should include all territories in France for ADMIN_SOLIGUIDE", () => {
    beforeEach(() => {
      user = {
        status: UserStatus.ADMIN_SOLIGUIDE,
        territories: ["01", "03", "978", "984", "986", "987", "988"],
        areas: {
          fr: new CountryAreaTerritories<CountryCodes.FR>({
            departments: ["01"], // We don't care territories for ADMIN_SOLIGUIDE
          }),
        },
      } as User;
      query = {};
    });

    it("Territories array", () => {
      parseTerritories(query, searchForFrance, "territories", {
        ...user,
      });
      expect(query).toEqual({
        country: CountryCodes.FR,
        territories: {
          $in: searchForFrance.territories,
        },
      });
    });
    it("Areas array", () => {
      parseTerritories(
        query,
        searchForFrance,
        "territories",
        {
          ...user,
        },
        true
      );
      expect(query).toEqual({
        "areas.fr.departments": {
          $in: searchForFrance.territories,
        },
      });
    });
    it("Areas array with undefined values (admins without areas)", () => {
      parseTerritories(
        query,
        searchForFrance,
        "territories",
        {
          ...user,
        },
        true,
        true
      );
      expect(query).toEqual({
        $or: [
          {
            areas: null,
          },
          {
            "areas.fr.departments": {
              $in: searchForFrance.territories,
            },
          },
        ],
      });
    });
  });

  describe("should not add a query if field is nil", () => {
    beforeEach(() => {
      query = {};
    });

    it("For user & organizations", () => {
      searchData.territories = null;
      parseTerritories(query, searchData, "territories", user);
      expect(query).toEqual({
        country: CountryCodes.FR,
        territories: { $in: [] },
      });
    });
    it("For user & organizations", () => {
      searchData.territories = null;
      parseTerritories(query, searchData, "territories", user);
      expect(query).toEqual({
        country: CountryCodes.FR,
        territories: { $in: [] },
      });
    });
  });

  describe("should not add a query if territories array is empty after filtering", () => {
    it("For user & organizations", () => {
      searchData.territories = ["04", "05"];
      user.status = UserStatus.PRO;

      parseTerritories(query, searchData, "territories", user);
      expect(query).toEqual({
        country: CountryCodes.FR,
        territories: { $in: [] },
      });
    });
  });
});
