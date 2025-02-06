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
  type AnyDepartmentCode,
  Categories,
  CountryCodes,
  DEPARTMENT_CODES,
  GeoPosition,
  GeoTypes,
  ManageSearchOptions,
  type PlaceSearchForAdmin,
  PlaceType,
  type SoliguideCountries,
  SortingOrder,
} from "@soliguide/common";

export const ADMIN_SEARCH_PLACE_AND_CATEGORY_OK: Partial<PlaceSearchForAdmin> & {
  options: ManageSearchOptions;
  country: SoliguideCountries;
  territories: AnyDepartmentCode[];
} = {
  campaignStatus: null,
  catToExclude: [],
  category: Categories.EMERGENCY_ACCOMMODATION,
  close: null,
  label: null,
  lieu_id: null,
  location: new GeoPosition({
    coordinates: [],
    distance: 5,
    geoType: GeoTypes.UNKNOWN,
    geoValue: "",
  }),
  options: {
    limit: 50,
    page: 1,
    sortBy: "lieu_id",
    sortValue: SortingOrder.ASCENDING,
  },
  placeType: PlaceType.PLACE,
  country: CountryCodes.FR,
  territories: DEPARTMENT_CODES[CountryCodes.FR],
  status: null,
  visibility: null,
  word: null,
  updatedAt: null,
};

export const ADMIN_SEARCH_ITINERARY_AND_POSITION_OK: Partial<PlaceSearchForAdmin> & {
  options: ManageSearchOptions;
  country: SoliguideCountries;
  territories: AnyDepartmentCode[];
} = {
  campaignStatus: null,
  category: null,
  close: null,
  label: null,
  lieu_id: null,
  location: new GeoPosition({
    coordinates: [],
    distance: 5,
    geoType: GeoTypes.UNKNOWN,
    geoValue: "",
  }),
  options: {
    limit: 50,
    page: 1,
    sortBy: "lieu_id",
    sortValue: SortingOrder.ASCENDING,
  },
  placeType: PlaceType.ITINERARY,
  country: CountryCodes.FR,
  territories: DEPARTMENT_CODES[CountryCodes.FR],
  status: null,
  visibility: null,
  word: null,
};
