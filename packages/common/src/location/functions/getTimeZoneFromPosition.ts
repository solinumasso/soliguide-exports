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
import { CommonPlacePosition } from "../../place";
import { ALL_REGIONS_DEF } from "../constants";
import { CountryCodes, SoliguideCountries } from "../enums";
import { LocationAutoCompleteAddress, RegionDef } from "../interfaces";
import { AnyTimeZone } from "../types";

const getCountry = (country: string): SoliguideCountries => {
  country = country?.trim().substring(0, 2).toLowerCase();

  if (!Object.values(CountryCodes).includes(country as SoliguideCountries)) {
    throw new Error("COUNTRY_NOT_SUPPORTED");
  }
  return country as SoliguideCountries;
};

export const getTimeZoneFromPosition = (
  position: CommonPlacePosition | LocationAutoCompleteAddress
): AnyTimeZone => {
  if (!position?.country) {
    throw new Error("COUNTRY_IS_EMPTY");
  }

  const country = getCountry(position.country);

  let region: RegionDef<SoliguideCountries> | undefined;
  if (position?.regionCode) {
    region = ALL_REGIONS_DEF[country].find(
      (regionDef: RegionDef<typeof country>) =>
        regionDef.regionCode === position?.regionCode
    );
  }

  if (!region) {
    region = ALL_REGIONS_DEF[country].find((regionDef) =>
      regionDef.departments.some(
        (department) => department.departmentCode === position?.departmentCode
      )
    );
  }

  if (region?.timeZone) {
    return region.timeZone;
  }

  // Fix for "Monaco"
  if (
    country === CountryCodes.FR &&
    (position?.departmentCode as string) === "98" // 98 does not exists in Departments, we need to add "as string"
  ) {
    return "Europe/Paris";
  }

  throw new Error(`COUNTRY_NOT_SUPPORTED (${country})`);
};
