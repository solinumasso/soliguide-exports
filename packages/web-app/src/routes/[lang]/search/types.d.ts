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
  SupportedLanguagesCode,
  Categories,
  GeoTypes,
  SoliguideCountries
} from '@soliguide/common';
import { steps, focus } from './pageController';
import { LocationSuggestion } from '$lib/models/types';
import { Writable } from 'svelte/store';
import type { PosthogProperties } from '$lib/services/types';

export type CurrentStep = (typeof steps)[keyof typeof steps];

/** Tells which input has the focus: Location, Category, None */
export type FocusState = (typeof focus)[keyof typeof focus];

/**
 * used for query string in search results page
 * location is the location geoValue
 * category is the category id
 * */
export type SearchPageParams = {
  lang: string;
  location: string;
  latitude: string;
  longitude: string;
  type: GeoTypes;
  label: string;
  category: string;
};

export type PageOptions = {
  geoValue?: string | null;
  label?: string | null;
  category?: string | null;
};

/** State, visible to subscribers through the controller */
export type PageState = {
  country: SoliguideCountries;
  lang: SupportedLanguagesCode;
  currentStep: CurrentStep;
  locationSuggestions: LocationSuggestion[];
  locationLabel: string;
  selectedLocationSuggestion: LocationSuggestion | null;
  locationSuggestionError: any;
  currentPositionError: any;
  categorySuggestions: Categories[];
  selectedCategory: Categories | null;
  categorySuggestionError: any;
  searchParams: SearchPageParams | null;
  focus: FocusState;
  loading: boolean;
  loadingLocationSuggestions: boolean;
  loadingCategorySuggestions: boolean;
  loadingGeolocation: boolean;
};

/** exposes the state in readonly and functions to act on it */
export type SearchPageController = {
  subscribe: Writable<PageState>['subscribe'];
  selectLocationSuggestion(locationSuggestion: LocationSuggestion | null): void;
  getLocationSuggestions(searchString: string): void;
  useCurrentLocation(geolocation: () => Promise<GeolocationPosition>): Promise<void>;
  clearLocation(): void;
  clearCategory(): void;
  goToPreviousStep(): void;
  editLocation(): void;
  init(country: SoliguideCountries, lang: SupportedLanguagesCode, options: PageOptions): void;
  getPreviousStep(): CurrentStep;
  selectCategorySuggestion(categorySuggestion: Categories): void;
  getCategorySuggestions(searchString: string): void;
  captureEvent(eventName: string, properties?: PosthogProperties): void;
};
