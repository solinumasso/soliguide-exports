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
  OperationalAreas,
} from "@soliguide/common";
import { mergeOperationalAreas } from "../mergeAreas";

describe("mergeOperationalAreas", () => {
  it("should return undefined if both areasToImport and areasToUpdate are undefined", () => {
    expect(mergeOperationalAreas()).toBeUndefined();
  });

  it("should return areasToUpdate if areasToImport is undefined", () => {
    const areasToUpdate: OperationalAreas = {
      [CountryCodes.FR]: new CountryAreaTerritories({
        departments: ["01"],
        regions: ["05"],
        cities: [{ city: "Paris", department: "01" }],
      }),
    };
    expect(mergeOperationalAreas(undefined, areasToUpdate)).toEqual(
      areasToUpdate
    );
  });

  it("should return areasToImport if areasToUpdate is undefined", () => {
    const areasToImport: OperationalAreas = {
      [CountryCodes.FR]: new CountryAreaTerritories({
        departments: ["01"],
        regions: ["05"],
        cities: [{ city: "Paris", department: "01" }],
      }),
    };
    expect(mergeOperationalAreas(areasToImport)).toEqual(areasToImport);
  });

  it("should merge areas correctly when both areasToImport and areasToUpdate are provided", () => {
    const areasToUpdate: OperationalAreas = {
      [CountryCodes.FR]: new CountryAreaTerritories({
        departments: ["01"],
        regions: ["05"],
        cities: [{ city: "Paris", department: "01" }],
      }),
    };
    const areasToImport: OperationalAreas = {
      [CountryCodes.FR]: new CountryAreaTerritories({
        departments: ["02"],
        regions: ["06"],
        cities: [{ city: "Lyon", department: "02" }],
      }),
    };
    const expectedMergedAreas: OperationalAreas = {
      [CountryCodes.FR]: new CountryAreaTerritories({
        departments: ["01", "02"],
        regions: ["05", "06"],
        cities: [
          { city: "Paris", department: "01" },
          { city: "Lyon", department: "02" },
        ],
      }),
    };
    expect(mergeOperationalAreas(areasToImport, areasToUpdate)).toEqual(
      expectedMergedAreas
    );
  });

  it("should handle different countries correctly", () => {
    const areasToUpdate: OperationalAreas = {
      [CountryCodes.FR]: new CountryAreaTerritories({
        departments: ["10"],
        regions: ["05"],
        cities: [{ city: "Paris", department: "10" }],
      }),
    };
    const areasToImport: OperationalAreas = {
      [CountryCodes.ES]: new CountryAreaTerritories({
        departments: ["02"],
        regions: ["08"],
        cities: [{ city: "Barcelona", department: "08" }],
      }),
    };

    const expectedMergedAreas: OperationalAreas = {
      [CountryCodes.FR]: new CountryAreaTerritories({
        departments: ["10"],
        regions: ["05"],
        cities: [{ city: "Paris", department: "10" }],
      }),
      [CountryCodes.ES]: new CountryAreaTerritories({
        departments: ["02"],
        regions: ["08"],
        cities: [{ city: "Barcelona", department: "08" }],
      }),
    };

    expect(mergeOperationalAreas(areasToImport, areasToUpdate)).toEqual(
      expectedMergedAreas
    );
  });
});
