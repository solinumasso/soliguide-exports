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
import { env } from '$env/dynamic/public';
import { mapSuggestions } from '$lib/models/locationSuggestion.js';
import { fetch } from '$lib/client';

const locationApiUrl = env.PUBLIC_LOCATION_API_URL;

const SEARCH_LOCATION_MINIMUM_CHARS = 3;
/**
 *
 * @param fetcher {import('$lib/client/transport.js').Fetcher}
 * @returns {import('./types').LocationService}
 */
export default (fetcher = fetch) => {
  /**
   * @param country {import('@soliguide/common').SoliguideCountries}
   * @param searchTerm {string}
   * @returns {Promise<import('$lib/models/types').LocationSuggestion[]>}
   */
  const getLocationSuggestions = async (country, searchTerm) => {
    if (searchTerm.length < SEARCH_LOCATION_MINIMUM_CHARS) {
      return [];
    }

    const baseUrl = `${locationApiUrl}autocomplete/${country}`;
    const url = `${baseUrl}/all/${encodeURI(searchTerm.trim())}`;

    /** @type {import('@soliguide/common').LocationAutoCompleteAddress[]} */
    const result = await fetcher(url);
    return mapSuggestions(result);
  };

  /**
   * Retrieve a location suggestion
   * @param country {import('@soliguide/common').SoliguideCountries}
   * @param latitude {number}
   * @param longitude {number}
   * @returns {Promise<import('$lib/models/types').LocationSuggestion | null>}
   */
  const getLocationFromPosition = async (country, latitude, longitude) => {
    try {
      const baseUrl = `${locationApiUrl}reverse/${country}`;
      const url = `${baseUrl}/${latitude}/${longitude}`;

      /** @type {import('@soliguide/common').LocationAutoCompleteAddress[]} */
      const result = await fetcher(url);
      const mapped = mapSuggestions(result);

      // Should have 1 result in the array
      return mapped.length > 0 ? mapped[0] : null;
    } catch (error) {
      console.log(
        'getLocationFromPosition error :',
        error instanceof Error ? error.message : error
      );
      throw new Error('UNABLE_TO_LOCATE_YOU');
    }
  };

  return {
    getLocationSuggestions,
    getLocationFromPosition
  };
};
