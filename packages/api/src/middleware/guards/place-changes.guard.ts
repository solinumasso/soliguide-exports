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
import type { ExpressRequest, ExpressResponse } from "../../_models";
import { findOnePlaceChanges } from "../../place-changes/services/place-changes.service";

export const getPlaceChangesFromUrl = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const placeChange = await findOnePlaceChanges({
      _id: req.params.placeChangeObjectId,
    });

    if (placeChange) {
      req.placeChanges = placeChange;
      req.params.lieu_id = placeChange.lieu_id.toString();
      next();
    } else {
      return res.status(404).json("CHANGES_NOT_FOUND");
    }
  } catch (e) {
    req.log.error(e);
    return res.status(400).json("SEARCH_CHANGES_ERROR");
  }
};
