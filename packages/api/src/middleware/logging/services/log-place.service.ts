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
import type { NextFunction } from "express";
import type { ExpressRequest, ExpressResponse } from "../../../_models";

import * as LogFicheService from "../../../logging/services/log-fiche.service";

import {
  type ApiPlace,
  type CommonNewPlaceService,
  slugLocation,
} from "@soliguide/common";

const parsePlaceLocation = (place: ApiPlace) => {
  let location = null;

  if (place.position) {
    location = {
      // @deprecated
      areas: {
        codePostal: slugLocation(place.position.postalCode),
        postalCode: slugLocation(place.position.postalCode),
        department: slugLocation(place.position.department),
        departement: slugLocation(place.position.department),
        region: slugLocation(place.position.region),
        city: slugLocation(place.position.city),
        ville: slugLocation(place.position.city),
      },
      coordinates: place.position.location.coordinates,
      label: slugLocation(place.position.address),
      // new fields to add in data workflow
      postalCode: slugLocation(place.position.postalCode),
      department: slugLocation(place.position.department),
      region: slugLocation(place.position.region),
      city: slugLocation(place.position.city),
      country: place.position.country,
    };
  } else if (place.parcours.length) {
    location = {
      // @deprecated
      areas: {
        postalCode: slugLocation(place.parcours[0].position.postalCode),
        codePostal: slugLocation(place.parcours[0].position.postalCode),
        department: slugLocation(place.parcours[0].position.department),
        departement: slugLocation(place.parcours[0].position.department),
        region: slugLocation(place.parcours[0].position.region),
        city: slugLocation(place.parcours[0].position.city),
        ville: slugLocation(place.parcours[0].position.city),
      },
      coordinates: place.parcours[0].position.location.coordinates,
      label: slugLocation(place.parcours[0].position.address),
      // new fields
      postalCode: slugLocation(place.parcours[0].position.postalCode),
      department: slugLocation(place.parcours[0].position.department),
      region: slugLocation(place.parcours[0].position.region),
      city: slugLocation(place.parcours[0].position.city),
      country: place.parcours[0].position.country,
    };
  }

  return location;
};

export const logPlace = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  const logFiche = getPlaceLogsFromRequest(req);

  try {
    await LogFicheService.save(logFiche);
  } catch (e) {
    req.log.error(e, "LOG_PLACE_VIEW_ERROR");
    return res.status(500).send({ message: "LOG_PLACE_VIEW_ERROR" });
  }
  next();
};

export const getPlaceLogsFromRequest = (req: ExpressRequest) => {
  return {
    fiche: req.lieu._id,
    ficheId: req.lieu.lieu_id,
    location: parsePlaceLocation(req.lieu),
    placeType: req.lieu.placeType,
    seoUrl: req.lieu.seo_url,
    serviceCategories: req.lieu.services_all.map(
      (service: CommonNewPlaceService) => service.category
    ),
    status: req.lieu.status,
    userDatas: req.userForLogs,
    visibility: req.lieu.visibility,
  };
};
