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
  ApiPlace,
  Categories,
  PlaceType,
  slugLocation,
} from "@soliguide/common";

import { ExpressRequest, ExpressResponse } from "../../_models/express";
import { TRACKED_EVENTS } from "../../analytics/constants";
import { PosthogClient } from "../../analytics/services";

const parsePlaceLocation = (
  place: Pick<ApiPlace, "placeType" | "position" | "parcours">
) => {
  const { position, parcours } = place;

  const mainLocation =
    place.placeType === PlaceType.ITINERARY ? parcours[0].position : position;

  if (!mainLocation) {
    return null;
  }

  const { postalCode, department, region, city, address, location, country } =
    mainLocation;
  const { coordinates } = location;

  return {
    // @deprecated: delete this when data is migrated in Data's worfklow
    areas: {
      postalCode: slugLocation(postalCode),
      department: slugLocation(department),
      region: slugLocation(region),
      city: slugLocation(city),
    },
    // New fields
    postalCode: slugLocation(postalCode),
    department: slugLocation(department),
    region: slugLocation(region),
    city: slugLocation(city),
    country,
    coordinates,
    address: slugLocation(address),
  };
};

export const getPlacePropertiesFromRequest = (req: ExpressRequest) => {
  const { lieu: place } = req;
  return {
    place: place._id,
    location: parsePlaceLocation(place),
    placeType: place.placeType,
    seoUrl: place.seo_url,
    services: place.services_all.map(
      (service: { category: Categories }) => service.category
    ),
    country: place.country,
    sourceLanguage: place.sourceLanguage,
    status: place.status,
    userData: req.userForLogs,
    visibility: place.visibility,
  };
};

export const trackViewPlace = (req: ExpressRequest, res: ExpressResponse) => {
  try {
    PosthogClient.instance.capture({
      event: TRACKED_EVENTS.API_VIEW_PLACE,
      req,
      properties: getPlacePropertiesFromRequest(req),
    });

    return null;
  } catch (e) {
    return res.status(500).send({ message: "LOG_VIEW_PLACE_ERROR" });
  }
};
