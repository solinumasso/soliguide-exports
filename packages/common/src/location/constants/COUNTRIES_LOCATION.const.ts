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

import { GeoTypes, CountryCodes } from "../enums";
import { LocationAutoCompleteAddress } from "../interfaces";

export const COUNTRIES_LOCATION: LocationAutoCompleteAddress[] = [
  {
    label: "France",
    coordinates: [2.343837096283199, 48.85058894753169],
    geoType: GeoTypes.COUNTRY,
    geoValue: CountryCodes.FR,
    country: CountryCodes.FR,
    slugs: {
      country: CountryCodes.FR,
      pays: CountryCodes.FR,
    },
  },
  {
    label: "España",
    coordinates: [-3.705510666436781, 40.41668503452932],
    geoType: GeoTypes.COUNTRY,
    country: CountryCodes.ES,
    geoValue: CountryCodes.ES,
    slugs: {
      country: CountryCodes.ES,
      pays: CountryCodes.ES,
    },
  },
  {
    label: "Andorra",
    coordinates: [1.5255804423331272, 42.50583018383308],
    geoType: GeoTypes.COUNTRY,
    geoValue: "andorra",
    country: CountryCodes.AD,
    slugs: {
      country: CountryCodes.AD,
      pays: CountryCodes.AD,
    },
  },
];
