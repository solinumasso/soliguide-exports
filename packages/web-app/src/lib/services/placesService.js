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
import { fetch } from '$lib/client';
import { isValidStringEnumValue } from '$lib/js';
import { SUPPORTED_LANGUAGES, Categories, GeoTypes } from '@soliguide/common';
import { posthogService } from './posthogService';

export default (fetcher = fetch) => {
  /**
   * @param params {import('./types').SearchParams}
   * @param options {import('./types').SearchOptions}
   * @returns {Promise<import('$lib/models/types').SearchResult>}
   */
  const searchPlaces = (
    { lang, location, category, latitude, longitude, type },
    options = { page: 1 }
  ) => {
    if (!isValidStringEnumValue(SUPPORTED_LANGUAGES, lang)) {
      throw Error(`Bad request, lang ${lang} is invalid`);
    }
    if (!isValidStringEnumValue(Categories, category)) {
      throw Error(`Bad request, category ${category} is invalid`);
    }
    if (!isValidStringEnumValue(GeoTypes, type)) {
      throw Error(`Bad request, geoType ${type} is invalid`);
    }
    if (location.length === 0) {
      throw Error('Bad request, location cannot be empty');
    }

    // No need to map data as the backend service already does it
    return fetcher(`/api/${lang}/places`, {
      method: 'POST',
      body: JSON.stringify({
        lang,
        location,
        category,
        type,
        coordinates: [latitude, longitude],
        options
      }),
      headers: posthogService.getHeaders()
    });
  };

  /**
   * @param params {import('./types').PlaceDetailsParams}
   * @returns {Promise<import('$lib/models/types').PlaceDetails>}
   */
  const placeDetails = ({ lang, identifier }) => {
    if (!isValidStringEnumValue(SUPPORTED_LANGUAGES, lang)) {
      throw Error(`Bad request, lang ${lang} is invalid`);
    }
    if (typeof identifier !== 'number' && !identifier) {
      throw Error(`Bad request, identifier ${identifier} cannot be empty`);
    }

    // No need to map data as the backend service already does it
    return fetcher(`/api/${lang}/places/${identifier}`, {
      method: 'POST',
      headers: posthogService.getHeaders()
    });
  };

  return {
    searchPlaces,
    placeDetails
  };
};
