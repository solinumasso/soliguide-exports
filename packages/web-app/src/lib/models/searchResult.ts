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
  PlaceStatus,
  GeoTypes,
  computePlaceOpeningStatus,
  type ApiPlace,
  CountryCodes,
  type Phone as CommonPhone,
  type ApiSearchResults
} from '@soliguide/common';
import { sort } from '$lib/ts';
import { computeTodayInfo, computeAddress } from './place';
import type { SearchResult, SearchResultItem } from './types';

interface SearchLocationParams {
  geoType: string;
  coordinates: number[];
  distance: number;
}

/**
 * Transformation
 */
const buildSearchResultItem = (
  place: ApiPlace,
  locationParams: SearchLocationParams
): SearchResultItem => {
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
    services: place.services_all
      .map((service) => service?.category)
      .filter((category) => !!category),
    phones: [
      ...place.entity.phones.map((phone: CommonPhone) => ({
        ...phone,
        countryCode: phone.countryCode as CountryCodes
      }))
    ],
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
 */
const extractStepsFromItineraryPlace = (place: ApiPlace): ApiPlace[] => {
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
 */
const sortPlacesByDistance = (places: SearchResultItem[]): SearchResultItem[] => {
  return sort(
    places,
    (place1: SearchResultItem, place2: SearchResultItem) => place1.distance - place2.distance
  );
};

/**
 * Merges result from two queries : places and itineraries.
 * Itinerary items contain steps, each one of them will become a SearchResultItem
 */
const buildSearchResultWithParcours = (
  placesResult: ApiSearchResults,
  itineraryResult: ApiSearchResults,
  searchLocationParams: SearchLocationParams
): SearchResult => {
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
 */
const buildSearchResult = (
  placesResult: ApiSearchResults,
  searchLocationParams: SearchLocationParams
): SearchResult => {
  const placesResultItems = placesResult.places.map((place) =>
    buildSearchResultItem(place, searchLocationParams)
  );

  return {
    nbResults: placesResult.nbResults,
    places: placesResultItems
  };
};

export { buildSearchResult, buildSearchResultWithParcours };
