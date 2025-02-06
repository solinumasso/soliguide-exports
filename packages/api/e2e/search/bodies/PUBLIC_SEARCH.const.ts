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
  Categories,
  CountryCodes,
  GeoTypes,
  PlaceType,
} from "@soliguide/common";

export const PUBLIC_SEARCH_POSITION_OK = {
  campaignStatus: null,
  category: null,
  close: null,
  label: null,
  lieu_id: null,
  location: {
    areas: {
      codePostal: "75003",
      departement: "Paris",
      region: "Île-de-France",
      ville: "Paris",
      country: CountryCodes.FR,
    },
    coordinates: [2.3525855, 48.8636338],
    distance: 5,
    geoType: GeoTypes.POSITION,
    geoValue: "203-rue-saint-martin-75003-paris",
    label: "203 Rue Saint-Martin, 75003 Paris",
  },
  options: { limit: 20, page: 1 },
  placeType: PlaceType.PLACE,
  status: null,
  word: null,
};

export const PUBLIC_SEARCH_CITY_OK = {
  campaignStatus: null,
  category: null,
  close: null,
  label: null,
  lieu_id: null,
  location: {
    areas: {
      codePostal: null,
      departement: "Paris",
      region: "Île-de-France",
      ville: "Paris",
      country: CountryCodes.FR,
    },
    coordinates: [2.3522219, 48.856614],
    distance: 5,
    geoType: GeoTypes.CITY,
    geoValue: "paris",
    label: "Paris",
  },
  options: { limit: 20, page: 1 },
  placeType: PlaceType.PLACE,
  status: null,
  word: null,
};

export const PUBLIC_SEARCH_OPEN_TODAY_OK = {
  campaignStatus: null,
  category: null,
  close: null,
  label: null,
  lieu_id: null,
  location: {
    areas: {
      codePostal: "75003",
      departement: "Paris",
      region: "Île-de-France",
      ville: "Paris",
      country: CountryCodes.FR,
    },
    coordinates: [2.3525855, 48.8636338],
    distance: 5,
    geoType: GeoTypes.POSITION,
    geoValue: "203-rue-saint-martin-75003-paris",
    label: "203 Rue Saint-Martin, 75003 Paris",
  },
  openToday: true,
  options: { limit: 20, page: 1 },
  placeType: PlaceType.PLACE,
  status: null,
  word: null,
};

export const PUBLIC_SEARCH_MULTIPLE_CATEGORIES_OK = {
  campaignStatus: null,
  categories: [Categories.FOOD_DISTRIBUTION, Categories.FOOD_PACKAGES],
  close: null,
  label: null,
  lieu_id: null,
  location: {
    areas: {
      codePostal: null,
      departement: "Paris",
      region: "Île-de-France",
      ville: "Paris",
      country: CountryCodes.FR,
    },
    coordinates: [2.3522219, 48.856614],
    distance: 5,
    geoType: GeoTypes.CITY,
    geoValue: "paris",
    label: "Paris",
  },
  options: { limit: 20, page: 1 },
  placeType: PlaceType.PLACE,
  status: null,
  word: null,
};

export const ITINERARY_PUBLIC_SEARCH_CITY_OK = {
  campaignStatus: null,
  category: null,
  close: null,
  label: null,
  lieu_id: null,
  location: {
    areas: {
      codePostal: null,
      departement: "Paris",
      region: "Île-de-France",
      ville: "Paris",
      country: CountryCodes.FR,
    },
    coordinates: [2.3525855, 48.8636338],
    distance: 5,
    geoType: GeoTypes.CITY,
    geoValue: "paris",
    label: "Paris",
  },
  options: { limit: 20, page: 1 },
  placeType: PlaceType.ITINERARY,
  status: null,
  word: null,
};
