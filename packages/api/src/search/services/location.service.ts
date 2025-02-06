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
  CountryCodes,
  GeoPosition,
  GeoTypes,
  LocationAreas,
  LocationAutoCompleteAddress,
  slugLocation,
  SoliguideCountries,
} from "@soliguide/common";

import locationApiService from "./location-api.service";

export const getAreasFromLocation = async (
  sourceLocation: GeoPosition
): Promise<LocationAreas> => {
  const geoValue =
    !sourceLocation.geoValue || sourceLocation.geoValue === "null"
      ? !sourceLocation.label
        ? "france"
        : slugLocation(sourceLocation.label)
      : slugLocation(sourceLocation.geoValue);

  if (!geoValue) {
    throw new Error("NO GEOVALUE");
  }

  let locations: LocationAutoCompleteAddress[] | null;

  if (sourceLocation.geoType === GeoTypes.POSITION) {
    locations = await locationApiService.getAddress({
      country: sourceLocation?.country ?? CountryCodes.FR, // Fix: only for api users who don't set country
      geoValue,
      throwIfNoAddress: false,
      lat: sourceLocation.coordinates[1],
      lon: sourceLocation.coordinates[0],
    });
  } else {
    locations = await locationApiService.getAddress({
      country: sourceLocation?.country ?? CountryCodes.FR, // Fix: only for api users who don't set country
      geoValue,
      throwIfNoAddress: false,
    });
  }

  if (!locations) {
    throw new Error("NO_LOCATION_FOUND");
  }

  let location: LocationAutoCompleteAddress | null;
  const geoType = sourceLocation?.geoType
    ? sourceLocation.geoType
    : GeoTypes.UNKNOWN;

  if (geoType !== GeoTypes.UNKNOWN) {
    locations = locations.filter((location) => location.geoType === geoType);
  }

  let areas: LocationAreas | null = null;

  if (locations.length) {
    location = locations[0];
    // @deprecated start: need migration in data team's code
    areas = {
      ville: location?.city,
      codePostal: location?.postalCode,
      departement: location?.department,
      departementCode: location?.departmentCode,
      pays: location?.country,
      slugs: {},
      city: location?.city,
      cityCode: location?.cityCode,
      department: location?.department,
      departmentCode: location?.departmentCode,
      postalCode: location?.postalCode,
      country: location?.country as SoliguideCountries,
      region: location?.region,
      regionCode: location?.regionCode,
    };
  }

  if (!areas) {
    throw new Error("CANNOT_SET_AREAS_FOR_LOGS");
  }

  return areas;
};
