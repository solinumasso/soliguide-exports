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
import { describe, expect, it, vi } from 'vitest';
import { buildSearchResult, buildSearchResultWithParcours } from './searchResult.js';
import {
  samplePlace,
  samplePlaceTransformed,
  sampleItinerary,
  sampleItineraryTransformed
} from './searchResultData.mock.js';
import { Categories, GeoTypes, PlaceStatus } from '@soliguide/common';

/**
 * @typedef {import('./searchResult.js').SearchResult} SearchResult
 * @typedef {import('./searchResult.js').SearchResultItem} SearchResultItem
 * @typedef {import('@soliguide/common').ApiSearchResults} ApiSearchResults
 * */

const sampleLocationParams = { geoType: GeoTypes.POSITION, coordinates: [1, 2], distance: 50 };
const category = Categories.FOOD;

describe('Search Result', () => {
  describe('Conversion of one place result', () => {
    it('Data source is correctly mapped', () => {
      vi.setSystemTime(new Date('2024-11-10'));
      const result = buildSearchResult(
        { nbResults: 1, places: [samplePlace] },
        sampleLocationParams,
        category
      );
      const [resultItem] = result.places;
      expect(resultItem).toStrictEqual(samplePlaceTransformed);

      // Check property transformations
      expect(resultItem.name).toStrictEqual(samplePlace.name);
      expect(resultItem.seoUrl).toStrictEqual(samplePlace.seo_url);
      expect(resultItem.id).toStrictEqual(samplePlace.lieu_id);
      expect(resultItem.address).toStrictEqual(samplePlace.position.address);
      expect(resultItem.distance).toStrictEqual(samplePlace.distance);
      const [phone] = samplePlace.entity.phones;
      expect(resultItem.phones).toStrictEqual([
        {
          label: phone.label,
          phoneNumber: phone.phoneNumber,
          countryCode: phone.countryCode,
          isSpecialPhoneNumber: false
        }
      ]);
      expect(resultItem.services).toStrictEqual([samplePlace.services_all[0].category]);

      expect(resultItem.status).toStrictEqual(samplePlaceTransformed.status);

      expect(resultItem.todayInfo).toStrictEqual(samplePlaceTransformed.todayInfo);
      expect(resultItem.banners).toStrictEqual({
        message: null,
        orientation: samplePlace.modalities.orientation.checked,
        holidays: samplePlace.newhours.closedHolidays
      });
    });

    describe('Computation of the distance', () => {
      it('When the geoType is position and the place status is not permanently closed or draft, and the place has a position, we display it', () => {
        const result = buildSearchResult(
          { nbResults: 1, places: [samplePlace] },
          { ...sampleLocationParams, geoType: GeoTypes.CITY },
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.distance).toStrictEqual(-1);
      });

      it('Otherwise, the distance is not shown', () => {
        const result = buildSearchResult(
          { nbResults: 1, places: [samplePlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.distance).toStrictEqual(samplePlaceTransformed.distance);
      });
    });
    describe('Computation of the address', () => {
      it('If the place is accessible with orientation, the address is not precise', () => {
        const modifiedPlace = {
          ...samplePlace,
          modalities: { ...samplePlace.modalities, orientation: { checked: true, precisions: '' } },
          position: {
            ...samplePlace.position,
            postalCode: '12345',
            city: 'Superville'
          }
        };
        const modifiedPlaceResult = { ...samplePlaceTransformed, address: '12345, Superville' };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.address).toStrictEqual(modifiedPlaceResult.address);
      });

      it('If the place is not accessible with orientation, we use the full address', () => {
        const modifiedPlace = {
          ...samplePlace,
          modalities: {
            ...samplePlace.modalities,
            orientation: { checked: false, precisions: '' }
          },
          position: {
            ...samplePlace.position,
            address: '1 rue du marché, 12345 Cityname'
          }
        };
        const modifiedPlaceResult = {
          ...samplePlaceTransformed,
          address: '1 rue du marché, 12345 Cityname'
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.address).toStrictEqual(modifiedPlaceResult.address);
      });

      it('should be the address and the additionnal info if there is some', () => {
        const modifiedPlace = {
          ...samplePlace,
          position: {
            ...samplePlace.position,
            additionalInformation: '3e porte sur la droite'
          }
        };

        const modifiedPlaceResult = {
          ...samplePlaceTransformed,
          address: `${modifiedPlace.position.address} - ${modifiedPlace.position.additionalInformation}`
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.address).toStrictEqual(modifiedPlaceResult.address);
      });
    });

    describe('Determination of the status', () => {
      it('Temporarily closed if tempInfos closure is effective', () => {
        vi.setSystemTime(new Date('2024-11-10'));
        const modifiedPlace = {
          ...samplePlace,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: true }
          }
        };
        const modifiedPlaceResult = { ...samplePlaceTransformed, status: 'temporarilyClosed' };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.status).toStrictEqual(modifiedPlaceResult.status);
      });

      it('Closed status if not opened today, has opening hours set, has no opened services, has no active closure', () => {
        const modifiedPlace = {
          ...samplePlace,
          isOpenToday: false,
          newhours: {
            ...samplePlace.newhours,
            monday: { ...samplePlace.newhours.monday, open: true }
          },
          // eslint-disable-next-line camelcase
          services_all: samplePlace.services_all.map((service) => ({
            ...service,
            isOpenToday: false
          })),
          status: PlaceStatus.ONLINE,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          }
        };
        const modifiedPlaceResult = { ...samplePlaceTransformed, status: 'closed' };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.status).toStrictEqual(modifiedPlaceResult.status);
      });

      it('Partially open if closed, has opening hours set, has opened services, has no active closure', () => {
        const modifiedPlace = {
          ...samplePlace,
          newhours: {
            ...samplePlace.newhours,
            monday: { ...samplePlace.newhours.monday, open: true }
          },
          isOpenToday: false,
          // eslint-disable-next-line camelcase
          services_all: samplePlace.services_all.map((service) => ({
            ...service,
            isOpenToday: true
          })),
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          }
        };
        const modifiedPlaceResult = { ...samplePlaceTransformed, status: 'partiallyOpen' };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.status).toStrictEqual(modifiedPlaceResult.status);
      });

      it('Open if is opened today, has ONLINE state, has no active closure', () => {
        const modifiedPlace = {
          ...samplePlace,
          isOpenToday: true,
          status: PlaceStatus.ONLINE,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          }
        };
        const modifiedPlaceResult = { ...samplePlaceTransformed, status: 'open' };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.status).toStrictEqual(modifiedPlaceResult.status);
      });

      it('Unknown if not open today, has no opening hours, has not DRAFT state', () => {
        const modifiedPlace = {
          ...samplePlace,
          isOpenToday: false,
          newhours: {
            ...samplePlace.newhours,
            monday: { ...samplePlace.newhours.monday, open: false },
            tuesday: { ...samplePlace.newhours.tuesday, open: false },
            wednesday: { ...samplePlace.newhours.wednesday, open: false },
            thursday: { ...samplePlace.newhours.thursday, open: false },
            friday: { ...samplePlace.newhours.friday, open: false },
            saturday: { ...samplePlace.newhours.saturday, open: false },
            sunday: { ...samplePlace.newhours.sunday, open: false }
          },
          status: PlaceStatus.ONLINE,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          }
        };
        const modifiedPlaceResult = { ...samplePlaceTransformed, status: 'unknown' };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.status).toStrictEqual(modifiedPlaceResult.status);
      });
    });

    describe('Determination of today info', () => {
      it('If open today, we have opening hours', () => {
        vi.setSystemTime(new Date('2024-09-16')); // It's a monday
        const modifiedPlace = {
          ...samplePlace,
          isOpenToday: true,
          status: PlaceStatus.ONLINE,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          },
          newhours: {
            ...samplePlace.newhours,
            monday: { open: true, timeslot: [{ start: 902, end: 1901 }] }
          }
        };
        const modifiedPlaceResult = {
          ...samplePlaceTransformed,
          status: 'open',
          todayInfo: { openingHours: [{ start: '0902', end: '1901' }] }
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.todayInfo).toStrictEqual(modifiedPlaceResult.todayInfo);
      });

      it('If partially open, we have ?? opening hours', () => {
        vi.setSystemTime(new Date('2024-09-16')); // It's a monday
        const modifiedPlace = {
          ...samplePlace,
          newhours: {
            ...samplePlace.newhours,
            monday: { ...samplePlace.newhours.monday, open: true }
          },
          isOpenToday: false,
          // eslint-disable-next-line camelcase
          services_all: samplePlace.services_all.map((service) => ({
            ...service,
            isOpenToday: true
          })),
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          }
        };
        const modifiedPlaceResult = {
          ...samplePlaceTransformed,
          status: 'partiallyOpen',
          todayInfo: { openingHours: [{ end: '2015', start: '1930' }] }
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.todayInfo).toStrictEqual(modifiedPlaceResult.todayInfo);
      });

      it('If temporarily closed, it is closed for holidays and we get the dates', () => {
        const modifiedPlace = {
          ...samplePlace,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: {
              ...samplePlace.tempInfos.closure,
              actif: true,
              dateDebut: '2024-04-01T00:00:00.000Z',
              dateFin: '2024-11-30T23:59:59.000Z'
            }
          }
        };
        const modifiedPlaceResult = {
          ...samplePlaceTransformed,
          status: 'temporarilyClosed',
          todayInfo: {
            closingDays: { end: '2024-11-30T23:59:59.000Z', start: '2024-04-01T00:00:00.000Z' }
          }
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },

          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.todayInfo).toStrictEqual(modifiedPlaceResult.todayInfo);
      });

      it('If closed, we do not have hours information', () => {
        const modifiedPlace = {
          ...samplePlace,
          isOpenToday: false,
          newhours: {
            ...samplePlace.newhours,
            monday: { ...samplePlace.newhours.monday, open: true }
          },
          // eslint-disable-next-line camelcase
          services_all: samplePlace.services_all.map((service) => ({
            ...service,
            isOpenToday: false
          })),
          status: PlaceStatus.ONLINE,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          }
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.todayInfo).toStrictEqual({});
      });

      it('If unknown state, we do not have hours information', () => {
        const modifiedPlace = {
          ...samplePlace,
          isOpenToday: false,
          newhours: {
            ...samplePlace.newhours,
            monday: { ...samplePlace.newhours.monday, open: false },
            tuesday: { ...samplePlace.newhours.tuesday, open: false },
            wednesday: { ...samplePlace.newhours.wednesday, open: false },
            thursday: { ...samplePlace.newhours.thursday, open: false },
            friday: { ...samplePlace.newhours.friday, open: false },
            saturday: { ...samplePlace.newhours.saturday, open: false },
            sunday: { ...samplePlace.newhours.sunday, open: false }
          },
          status: PlaceStatus.ONLINE,
          tempInfos: {
            ...samplePlace.tempInfos,
            closure: { ...samplePlace.tempInfos.closure, actif: false }
          }
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.todayInfo).toStrictEqual({});
      });
    });

    describe('Banners', () => {
      it('If tempInfos has no active message, the message banner is null', () => {
        const modifiedPlace = {
          ...samplePlace,
          tempInfos: {
            ...samplePlace.tempInfos,
            message: {
              ...samplePlace.tempInfos.message,
              actif: false
            }
          }
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.banners.message).toBeNull();
      });

      it('If tempInfos has an active message, the message banner is set', () => {
        const modifiedPlace = {
          ...samplePlace,
          tempInfos: {
            ...samplePlace.tempInfos,
            message: {
              ...samplePlace.tempInfos.message,
              actif: true,
              dateDebut: '2024-09-01T00:00:00.000Z',
              dateFin: '2025-09-01T00:00:00.000Z',
              description: 'This is the message message',
              name: 'information message'
            }
          }
        };

        const result = buildSearchResult(
          { nbResults: 1, places: [modifiedPlace] },
          sampleLocationParams,
          category
        );
        const [resultItem] = result.places;
        expect(resultItem.banners.message).toStrictEqual({
          start: '2024-09-01T00:00:00.000Z',
          end: '2025-09-01T00:00:00.000Z',
          description: 'This is the message message',
          name: 'information message'
        });
      });
    });
  });

  describe('Conversion of one itinerary result', () => {
    it('If the itinerary has 2 steps, the result has 2 places', () => {
      const result = buildSearchResultWithParcours(
        {
          placesResult: { nbResults: 0, places: [] },
          itineraryResult: { nbResults: 1, places: [sampleItinerary] }
        },
        sampleLocationParams,
        category
      );
      expect(result.places.length).toBe(2);
    });

    it('For each result, the hours are the hours of the step', () => {
      vi.setSystemTime(new Date('2024-9-20')); // It's a friday
      const result = buildSearchResultWithParcours(
        {
          placesResult: { nbResults: 0, places: [] },
          itineraryResult: { nbResults: 1, places: [sampleItinerary] }
        },
        sampleLocationParams,
        category
      );
      expect(result.places[0].todayInfo).toStrictEqual(sampleItineraryTransformed[0].todayInfo);
      expect(result.places[1].todayInfo).toStrictEqual(sampleItineraryTransformed[1].todayInfo);
    });

    it('For each result, the address is the address of the step', () => {
      const result = buildSearchResultWithParcours(
        {
          placesResult: { nbResults: 0, places: [] },
          itineraryResult: { nbResults: 1, places: [sampleItinerary] }
        },
        sampleLocationParams,
        category
      );
      expect(result.places[0].address).toStrictEqual(sampleItineraryTransformed[0].address);
      expect(result.places[1].address).toStrictEqual(sampleItineraryTransformed[1].address);
    });
  });

  describe('Combination of places and itineraries', () => {
    it('With 2 places and 1 itinerary having 2 steps, we end up with 3 results', () => {
      const result = buildSearchResultWithParcours(
        {
          placesResult: { nbResults: 1, places: [samplePlace] },
          itineraryResult: { nbResults: 1, places: [sampleItinerary] }
        },
        sampleLocationParams,
        category
      );
      expect(result.places.length).toBe(3);
    });

    it('Places are sorted with distance in ascending order', () => {
      const result = buildSearchResultWithParcours(
        {
          placesResult: { nbResults: 1, places: [samplePlace] },
          itineraryResult: { nbResults: 1, places: [sampleItinerary] }
        },
        sampleLocationParams,
        category
      );
      const [place1, place2, place3] = result.places;
      expect(place2.distance).toBeGreaterThanOrEqual(place1.distance);
      expect(place3.distance).toBeGreaterThanOrEqual(place2.distance);
    });

    it('If a place is out of range, it is not included in the results', () => {
      // Cannot tell without distances
    });
  });
});
