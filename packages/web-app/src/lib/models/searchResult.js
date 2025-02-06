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
import { PlaceStatus, GeoTypes, computePlaceOpeningStatus } from '@soliguide/common';
import { sort } from '$lib/js';
import { computeTodayInfo, computeAddress } from './place';

/**
 * @typedef {import('@soliguide/common').CommonPlacePosition} Position
 * @typedef {import('./types').SearchResultItem} SearchResultItem
 * @typedef {import('./types').SearchResult} SearchResult
 *
 * @typedef {{
 *   geoType: string;
 *   coordinates: number[];
 *   distance: number;
 * }} SearchLocationParams
 *
 * @typedef {import('@soliguide/common').ApiSearchResults} ApiSearchResults
 * @typedef {import('@soliguide/common').ApiPlace} ApiPlace
 */

/**
 * Transformation
 * @param place {ApiPlace}
 * @param locationParams {SearchLocationParams}
 * @returns {SearchResultItem}
 */
const buildSearchResultItem = (place, locationParams) => {
  const onOrientation = !!place.modalities.orientation.checked;

  const distance =
    locationParams.geoType === GeoTypes.POSITION &&
    place.status !== PlaceStatus.PERMANENTLY_CLOSED &&
    place.status !== PlaceStatus.DRAFT &&
    !!place.distance &&
    !onOrientation
      ? place.distance
      : -1;

  const status = computePlaceOpeningStatus(place);

  return {
    id: place.lieu_id,
    seoUrl: place.seo_url,
    name: place.name,
    address: computeAddress(place.position, onOrientation),
    distance,
    services: place.services_all.map((service) => service?.category).filter((svc) => !!svc),
    phones: [...place.entity.phones],
    status,
    banners: {
      message: place.tempInfos.message.actif
        ? {
            start: place.tempInfos.message.dateDebut,
            end: place.tempInfos.message.dateFin,
            description: place.tempInfos.message.description,
            name: place.tempInfos.message.name
          }
        : null,
      orientation: onOrientation,
      holidays: place.newhours.closedHolidays
    },
    todayInfo: computeTodayInfo(place, status)
  };
};

/**
 * Transforms a itinerary steps into Places by hoisting their data
 * @param place {ApiPlace}
 * @returns {ApiPlace[]}
 */
const extractStepsFromItineraryPlace = (place) => {
  // We have description, hours, photos and position to extract
  return place.parcours.map((step) => {
    return {
      ...place,
      hours: step.hours,
      position: step.position,
      parcours: []
    };
  });
};

/**
 * Sort by distance ascending.
 * If an item is out of range, it is removed
 * @param places {SearchResultItem[]}
 * @returns {SearchResultItem[]}
 */
const sortPlacesByDistance = (places) => {
  return sort(places, (place1, place2) => place1.distance - place2.distance);
};

/**
 * Merges result from two queries : places and itineraries.
 * Itinerary items contain steps, each one of them will become a SearchResultItem
 * @param placesResult {ApiSearchResults}
 * @param itineraryResult {ApiSearchResults}
 * @param searchLocationParams {SearchLocationParams}
 * @returns {SearchResult}
 */
const buildSearchResultWithParcours = (placesResult, itineraryResult, searchLocationParams) => {
  const placesResultItems = placesResult.places.map((place) =>
    buildSearchResultItem(place, searchLocationParams)
  );
  const itineraryResultItems = itineraryResult.places.flatMap((place) => {
    const extractedSteps = extractStepsFromItineraryPlace(place);
    return extractedSteps.map((extractedStep) =>
      buildSearchResultItem(extractedStep, searchLocationParams)
    );
  });

  const sortedPlaces = sortPlacesByDistance([...placesResultItems, ...itineraryResultItems]);

  return {
    // NB: Impossible to calculate nbResults of itineraries, we should have the sum of nb steps of each
    nbResults: placesResult.nbResults + itineraryResult.nbResults,
    places: sortedPlaces
  };
};

/**
 * Builds a search result from a places query
 * @param placesResult {ApiSearchResults}
 * @param searchLocationParams {SearchLocationParams}
 * @returns {SearchResult}
 */
const buildSearchResult = (placesResult, searchLocationParams) => {
  const placesResultItems = placesResult.places.map((place) =>
    buildSearchResultItem(place, searchLocationParams)
  );

  const sortedPlaces = sortPlacesByDistance(placesResultItems);

  return {
    nbResults: placesResult.nbResults,
    places: sortedPlaces
  };
};

export { buildSearchResult, buildSearchResultWithParcours };
