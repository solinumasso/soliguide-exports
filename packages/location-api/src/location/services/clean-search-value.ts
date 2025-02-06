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
import { CountryCodes, slugString } from "@soliguide/common";
import { SPANISH_ABBREVIATIONS } from "../sources/ES";

export const cleanSearchValue = (
  country: CountryCodes,
  value: string
): string => {
  if (country === CountryCodes.FR) {
    // Source: https://github.com/BaseAdresseNationale/adresse.data.gouv.fr/blob/master/lib/api-adresse.js#L25
    if (
      value.slice(0, 1).toLowerCase() !== value.slice(0, 1).toUpperCase() ||
      (value.codePointAt(0) >= 48 && value.codePointAt(0) <= 57)
    ) {
      return slugString(value);
    }
    throw new Error("STRING_IS_NOT_VALID");
  } else {
    let cleanSearch = value.toLowerCase().trim();

    if ([CountryCodes.AD, CountryCodes.ES].includes(country)) {
      for (const [key, values] of Object.entries(SPANISH_ABBREVIATIONS)) {
        values.forEach((value) => {
          cleanSearch = cleanSearch.replace(value, key);
        });
      }
    }
    return cleanSearch;
  }
};
