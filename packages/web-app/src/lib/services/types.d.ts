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
import type {
  LocationSuggestion,
  CategorySuggestion,
  SearchResult,
  PlaceDetails
} from '$lib/models/types';
import { Categories, SoliguideCountries, type AllSupportedLanguagesCode } from '@soliguide/common';

export interface LocationService {
  getLocationSuggestions(
    country: SoliguideCountries,
    searchTerm: string
  ): Promise<LocationSuggestion[]>;
  getLocationFromPosition(
    country: SoliguideCountries,
    latitude: number,
    longitude: number
  ): Promise<LocationSuggestion | null>;
}

export interface CategoryService {
  getRootCategories(): Categories[];
  getChildrenCategories(categoryId: Categories): Categories[];
  isCategoryRoot(categoryId: Categories): boolean;
  getCategorySuggestions(string): Promise<CategorySuggestion[]>;
}

// Search service
export type SearchOptions = { page: number };

export type SearchParams = {
  lang: string;
  location: string;
  category: string;
  latitude: number;
  longitude: number;
  type: string;
  options: SearchOptions;
};

export type PlaceDetailsParams = {
  identifier: string;
  lang: AllSupportedLanguagesCode;
};

export interface PlacesService {
  searchPlaces(params: SearchParams, options: SearchOptions): Promise<SearchResult>;
  placeDetails(params: PlaceDetailsParams): Promise<PlaceDetails>;
}

export type RequestOptionsFrontend = {
  'X-Ph-User-Session-Id': string;
  'X-Ph-User-Distinct-Id': string;
};

declare global {
  interface Window {
    zE?: any;
  }
}

export type PosthogProperties = {
  categorySelected?: Categories;
  location?:
    | string
    | { geoValue: string; latitude: number; longitude: number; type: GeoTypes; label: string };
  newLanguage?: AllSupportedLanguagesCode | null;
  position?: { latitude: number; longitude: number };
  searchTerm?: string;
  category?: Categories;
  fromStep?: 'location' | 'category';
  placeAddress?: string;
  phoneNumber?: string | null;
  email?: string;
  website?: string;
  isClickable?: boolean;
};

export type ZendeskState = {
  hasNewMessage: boolean;
};
