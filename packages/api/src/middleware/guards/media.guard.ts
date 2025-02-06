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
import { NextFunction } from "express";

import { ExpressResponse, ExpressRequest } from "../../_models";

export const mediaGuards = {
  canUploadDocument: async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
  ) => {
    req.params.objectId = req.lieu._id;
    req.params.seoUrl = req.lieu.seo_url;

    const serviceIndex =
      typeof req.params.serviceIndex !== "undefined"
        ? parseInt(req.params.serviceIndex, 10)
        : null;

    const documents =
      serviceIndex !== null
        ? // Service index
          // We look for the related service and whether there are documents already
          req.lieu.services_all[serviceIndex]?.modalities.docs
        : // No index, we look into the place access conditions
          req.lieu.modalities.docs;

    // if 'medias' is 'undefined' it means that there's no docs nor pictures and that the field does not exist in the database
    if (!documents || documents.length < 4) {
      next();
    } else {
      return res
        .status(507)
        .send({ message: "MAXIMUM_NUMBER_OF_DOCS_EXCEEDED" });
    }
  },

  // TODO: Add checks for itineraries
  canUploadPhoto: async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
  ) => {
    req.params.objectId = req.lieu._id;
    req.params.seoUrl = req.lieu.seo_url;

    const parcoursIndex =
      typeof req.params.parcoursIndex !== "undefined"
        ? parseInt(req.params.parcoursIndex, 10)
        : null;

    const photos =
      parcoursIndex !== null
        ? // Checkpoint index
          // We look for the checkpoint and whether there are pictures already
          req.lieu.parcours
          ? req.lieu.parcours[parcoursIndex]
            ? req.lieu.parcours[parcoursIndex].photos
            : null
          : null
        : // No index, we look into the place modalities
          req.lieu.photos;

    // if 'medias' is 'undefined' it means that there's no docs nor pictures and that the field does not exist in the database
    if (!photos || photos.length < 4) {
      next();
    } else {
      return res
        .status(507)
        .send({ message: "MAXIMUM_NUMBER_OF_PHOTOS_EXCEED" });
    }
  },
};
