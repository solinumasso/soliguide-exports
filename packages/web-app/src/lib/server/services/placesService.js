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
import { env } from '$env/dynamic/private';
import { PlaceType } from '@soliguide/common';
import { fetch } from '$lib/client';
import { buildSearchResult } from '$lib/models/searchResult.js';
import { buildPlaceDetails } from '$lib/models/placeDetails.js';

const apiUrl = env.API_URL;

export default (fetcher = fetch) => {
  /**
   * Executes a search
   * @param {import('./types').SearchParams} params
   * @param {import('./types').RequestOptions} commonHeaders
   * @returns {Promise<import('$lib/models/types').SearchResult>}
   */
  const search = async (
    { lang, location, category, coordinates, type, distance, options = { page: 1 } },
    commonHeaders
  ) => {
    const url = `${apiUrl}new-search/${lang}`;

    const headers = {
      'Content-Type': 'application/json',
      ...commonHeaders
    };

    const body = {
      category,
      location: { geoValue: location, geoType: type, coordinates, distance }
    };

    const placesResult = await fetcher(url, {
      method: 'POST',
      body: JSON.stringify({
        ...body,
        placeType: PlaceType.PLACE,
        options: { ...options, limit: 10, sortBy: 'distance' }
      }),
      headers
    });

    return buildSearchResult(
      placesResult,
      {
        geoType: type,
        coordinates,
        distance
      },
      category
    );
  };

  /**
   * Get place details
   * @param {import('./types').PlaceDetailsParams} params
   * @param {import('./types').RequestOptions} commonHeaders
   * @returns {Promise< import('$lib/models/types').PlaceDetails>}
   */
  const placeDetails = async ({ identifier, lang }, commonHeaders) => {
    const url = `${apiUrl}place/${identifier}/${lang}`;

    const headers = {
      'Content-Type': 'application/json',
      ...commonHeaders
    };

    const placeResult = await fetcher(url, {
      method: 'GET',
      headers
    });

    return buildPlaceDetails(placeResult);
  };

  return {
    placeDetails,
    search
  };
};
