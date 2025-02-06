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
import type { RequestOptionsFrontend } from '$lib/services/types';
import type { AllSupportedLanguagesCode, CountryCodes } from '@soliguide/common';

export type PlaceDetailsParams = {
  identifier: string;
  lang: AllSupportedLanguagesCode;
};

export type SearchOptions = {
  page: number;
};

export type SearchParams = {
  lang: string;
  location: string;
  category: string;
  coordinates: number[];
  type: string;
  distance: number;
  options: SearchOptions;
};

// Need to forward info from frontend request
export type RequestOptions = {
  origin: string;
  referer: string;
} & RequestOptionsFrontend;
