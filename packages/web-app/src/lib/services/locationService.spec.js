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
import { beforeEach, describe, expect, it } from 'vitest';
import { GeoTypes, CountryCodes } from '@soliguide/common';
import getLocationService from './locationService.js';
import { fakeFetch } from '$lib/client';

describe('Location service', () => {
  const { fetch, feedWith, setError } = fakeFetch();
  const service = getLocationService(
    /** @type {import('$lib/client/transport.js').Fetcher} */ (fetch)
  );

  beforeEach(() => {
    feedWith([]);
    setError(null);
  });

  describe('getLocationSuggestions', () => {
    it('Returns suggestions when asked with a search term', async () => {
      const suggestions = [
        {
          name: 'suggestion1',
          label: 'address1',
          geoValue: 'geo1',
          geoType: GeoTypes.POSITION,
          city: 'city1',
          postalCode: 'postalCode1',
          coordinates: [-3.144835, 48.841439]
        },
        {
          name: 'suggestion2',
          label: 'address2',
          postalCode: 'postalCode2',
          geoValue: 'geo2',
          city: 'city2',
          geoType: GeoTypes.CITY,
          coordinates: [-31.144835, 11.841439]
        }
      ];

      const expected = [
        {
          suggestionLine1: 'suggestion1',
          suggestionLine2: 'postalCode1 city1',
          suggestionLabel: 'suggestion1, postalCode1 city1',
          geoValue: 'geo1',
          geoType: GeoTypes.POSITION,
          coordinates: [-3.144835, 48.841439]
        },
        {
          suggestionLine1: 'suggestion2 (postalCode2)',
          suggestionLine2: 'GEOTYPE_VILLE',
          suggestionLabel: 'suggestion2 (postalCode2)',
          geoValue: 'geo2',
          geoType: GeoTypes.CITY,
          coordinates: [-31.144835, 11.841439]
        }
      ];

      feedWith(suggestions);
      const response = await service.getLocationSuggestions(CountryCodes.FR, 'term');
      expect(response).toEqual(expected);
    });

    it('Returned data is mapped into LocationSuggestion objects', async () => {
      const suggestions = [
        {
          name: 'suggestion1',
          label: 'address1',
          newField: 'field1',
          otherField: 'value1',
          city: 'city1',
          postalCode: 'postalCode1',
          geoValue: 'geo1',
          geoType: GeoTypes.CITY,
          coordinates: [-3.144835, 48.841439]
        },
        {
          name: 'suggestion2',
          label: 'address2',
          newField: 'field2',
          city: 'city2',
          postalCode: 'postalCode2',
          otherField: 'value2',
          geoValue: 'geo2',
          geoType: GeoTypes.CITY,
          coordinates: [-31.144835, 11.841439]
        }
      ];
      const suggestionsResult = [
        {
          suggestionLine1: 'suggestion1 (postalCode1)',
          suggestionLine2: 'GEOTYPE_VILLE',
          suggestionLabel: 'suggestion1 (postalCode1)',
          geoValue: 'geo1',
          geoType: GeoTypes.CITY,
          coordinates: [-3.144835, 48.841439]
        },
        {
          suggestionLine1: 'suggestion2 (postalCode2)',
          suggestionLine2: 'GEOTYPE_VILLE',
          suggestionLabel: 'suggestion2 (postalCode2)',
          geoValue: 'geo2',
          geoType: GeoTypes.CITY,
          coordinates: [-31.144835, 11.841439]
        }
      ];
      feedWith(suggestions);
      const response = await service.getLocationSuggestions(CountryCodes.FR, 'term');
      expect(response).toEqual(suggestionsResult);
    });

    it('Returns nothing when search term is empty', async () => {
      const suggestions = [
        {
          name: 'suggestion1',
          label: 'address1',
          geoValue: 'geo1',
          city: 'city1',
          postalCode: 'postalCode1',
          geoType: GeoTypes.CITY,
          coordinates: [-3.144835, 48.841439]
        },
        {
          name: 'suggestion2',
          label: 'address2',
          geoValue: 'geo2',
          city: 'city2',
          postalCode: 'postalCode2',
          geoType: GeoTypes.CITY,
          coordinates: [-31.144835, 11.841439]
        }
      ];
      feedWith(suggestions);
      const response = await service.getLocationSuggestions(CountryCodes.FR, '');
      expect(response).toEqual([]);
    });

    it('Returns nothing when search term is less than 3 chars', async () => {
      const suggestions = [
        {
          name: 'suggestion1',
          label: 'address1',
          geoValue: 'geo1',
          city: 'city1',
          postalCode: 'postalCode1',
          geoType: GeoTypes.CITY,
          coordinates: [-3.144835, 48.841439]
        },
        {
          name: 'suggestion2',
          label: 'address2',
          geoValue: 'geo2',
          city: 'city2',
          postalCode: 'postalCode2',
          geoType: GeoTypes.CITY,
          coordinates: [-31.144835, 11.841439]
        }
      ];
      feedWith(suggestions);
      const response = await service.getLocationSuggestions(CountryCodes.FR, 'oo');
      expect(response).toEqual([]);
    });

    it('Returns nothing when search has a server error', () => {
      setError({ status: 500, statusText: 'Internal server error' });
      expect(() => service.getLocationSuggestions(CountryCodes.FR, 'bob')).rejects.toThrowError(
        'Internal server error'
      );
    });

    it('When locationServices returns a malformed response, the invalid suggestions are removed', async () => {
      const validSuggestions = [
        {
          suggestionLine1: 'suggestion2 (postalCode2)',
          suggestionLine2: 'GEOTYPE_VILLE',
          suggestionLabel: 'suggestion2 (postalCode2)',
          geoValue: 'geo2',
          geoType: GeoTypes.CITY,
          coordinates: [-3.144835, 48.841439]
        }
      ];
      const suggestions = [
        { toto: 'malformed1', tata: 'suggestion1', geoValue: 'geo1' },
        {
          name: 'suggestion2',
          label: 'address2',
          city: 'city2',
          postalCode: 'postalCode2',
          geoValue: 'geo2',
          geoType: GeoTypes.CITY,
          coordinates: [-3.144835, 48.841439]
        },
        { toto: 'malformed2', tata: 'suggestion2', geoValue: 'geo2' }
      ];

      feedWith(suggestions);
      const response = await service.getLocationSuggestions(CountryCodes.FR, 'abc');
      expect(response).toEqual(validSuggestions);
    });
  });

  describe('getLocationFromPosition', () => {
    it('Returns a suggestion when given a latitude and longitude', async () => {
      const suggestions = [
        {
          name: 'suggestion1',
          label: 'address1',
          geoValue: 'geo1',
          geoType: GeoTypes.POSITION,
          postalCode: 'postalCode1',
          city: 'city1',
          coordinates: [123, 456]
        }
      ];

      const expected = {
        suggestionLine1: 'suggestion1',
        suggestionLine2: 'postalCode1 city1',
        suggestionLabel: 'suggestion1, postalCode1 city1',
        geoValue: 'geo1',
        geoType: GeoTypes.POSITION,
        coordinates: [123, 456]
      };
      feedWith(suggestions);
      const fakeCoords = { lat: 123, long: 456 };
      const response = await service.getLocationFromPosition(
        CountryCodes.FR,
        fakeCoords.lat,
        fakeCoords.long
      );
      expect(response).toEqual(expected);
    });

    it('Returns null when location-api has no result', async () => {
      const suggestions = /** @type {any} */ ([]);
      const expected = null;
      feedWith(suggestions);
      const response = await service.getLocationFromPosition(CountryCodes.FR, 123, 321);
      expect(response).toEqual(expected);
    });

    it('Returns nothing when search has a server error', () => {
      setError({ status: 500, statusText: 'Internal server error' });
      expect(() => service.getLocationFromPosition(CountryCodes.FR, 111, 222)).rejects.toThrowError(
        'UNABLE_TO_LOCATE_YOU'
      );
    });
  });
});
