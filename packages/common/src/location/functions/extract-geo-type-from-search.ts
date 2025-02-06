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

import { GEO_TYPES_KEYS } from "../constants";
import { SoliguideCountries, GeoTypes } from "../enums";

export const extractGeoTypeFromSearch = (
  search: string,
  country: SoliguideCountries
): {
  geoType: GeoTypes | null;
  search: string;
} => {
  search = search.toLowerCase().trim();
  const countryGeoTypes = GEO_TYPES_KEYS[country];

  if (!countryGeoTypes) {
    return { geoType: null, search };
  }

  for (const [geoType, prefix] of Object.entries(countryGeoTypes)) {
    if (search.startsWith(`${prefix}-`)) {
      search = search.substring(prefix.length + 1).trim();
      return {
        geoType: geoType as GeoTypes,
        search,
      };
    }
  }

  return { geoType: null, search };
};
