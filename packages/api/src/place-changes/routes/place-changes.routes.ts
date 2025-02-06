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
import express from "express";

import { searchPlaceChangesDto } from "../dto/searchPlaceChanges.dto";
import { patchStatusDto } from "../dto/patchStatus.dto";

import type { ExpressRequest, ExpressResponse } from "../../_models";
import {
  getPlaceFromUrl,
  canEditPlace,
  getPlaceChangesFromUrl,
  getFilteredData,
} from "../../middleware";
import {
  searchPlaceChanges,
  patchPlaceChange,
} from "../controllers/place-changes.controller";

const router = express.Router();

router.post(
  "/search/place/:lieu_id/:light?",
  getPlaceFromUrl,
  canEditPlace,
  searchPlaceChangesDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      req.bodyValidated.lieu_id = req.lieu.lieu_id;
      const searchResults = await searchPlaceChanges(
        req.bodyValidated,
        req.user,
        req.params?.light ? true : false
      );
      return res.status(200).json(searchResults);
    } catch (e) {
      req.log.error(e, "SEARCH_PLACE_CHANGES_FOR_A_PLACE_ERROR");
      return res
        .status(500)
        .json({ message: "SEARCH_PLACE_CHANGES_FOR_A_PLACE_ERROR" });
    }
  }
);

router.post(
  "/search",
  searchPlaceChangesDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const searchResults = await searchPlaceChanges(
        req.bodyValidated,
        req.user,
        true
      );

      return res.status(200).json(searchResults);
    } catch (e) {
      req.log.error(e, "SEARCH_PLACE_CHANGES_ERROR");
      return res.status(500).json({ message: "SEARCH_PLACE_CHANGES_ERROR" });
    }
  }
);

router.get(
  "/:placeChangeObjectId",
  getPlaceChangesFromUrl,
  getPlaceFromUrl,
  canEditPlace,
  async (req: ExpressRequest, res: ExpressResponse) => {
    return res.status(200).json(req.placeChanges);
  }
);

router.patch(
  "/:placeChangeObjectId",
  getPlaceChangesFromUrl,
  getPlaceFromUrl,
  canEditPlace,
  patchStatusDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const newPlaceChange = await patchPlaceChange(
        req.params.placeChangeObjectId,
        req.bodyValidated
      );

      return res.status(200).json(newPlaceChange);
    } catch (e) {
      req.log.error(e, "UPDATE_PLACE_ERROR");
      return res.status(500).json({ message: "UPDATE_PLACE_ERROR" });
    }
  }
);

export default router;
