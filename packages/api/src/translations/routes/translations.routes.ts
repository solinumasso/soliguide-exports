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

const router = express.Router();

import { UserStatus } from "@soliguide/common";

import {
  searchTranslatedElementDto,
  searchTranslatedPlaceDto,
  translatedElementDto,
} from "../dto";

import { ApiTranslatedField } from "../interfaces";
import type { ExpressRequest, ExpressResponse } from "../../_models";

import {
  isTranslator,
  getTranslatedFieldFromUrl,
  checkRights,
  getFilteredData,
} from "../../middleware";
import {
  patchTranslatedField,
  searchTranslatedFields,
  searchTranslatedPlaces,
} from "../controllers/translation.controller";

// ROUTE 1: Look for elements to translate
router.post(
  "/search",
  isTranslator,
  searchTranslatedElementDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const results = await searchTranslatedFields(req.bodyValidated, req.user);
      return res.status(200).json(results);
    } catch (e) {
      req.log.error(e, "SEARCH_TRANSLATED_FIELDS_FAILED");
      return res
        .status(500)
        .json({ message: "SEARCH_TRANSLATED_FIELDS_FAILED" });
    }
  }
);

// ROUTE 2: Look for places to translate
router.post(
  "/search-places",
  checkRights([UserStatus.ADMIN_SOLIGUIDE, UserStatus.ADMIN_TERRITORY]),
  searchTranslatedPlaceDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const results = await searchTranslatedPlaces(req.bodyValidated, req.user);
      return res.status(200).json(results);
    } catch (e) {
      req.log.error(e, "SEARCH_TRANSLATED_PLACES_FAILED");
      return res
        .status(500)
        .json({ message: "SEARCH_TRANSLATED_PLACES_FAILED" });
    }
  }
);

router.get(
  "/is-translator",
  isTranslator,
  (_req: ExpressRequest, res: ExpressResponse) => {
    return res.status(200).json(true);
  }
);

router.get(
  "/:translatedFieldObjectId",
  isTranslator,
  getTranslatedFieldFromUrl,
  (req: ExpressRequest, res: ExpressResponse) => {
    return res.status(200).json(req.translatedField);
  }
);

router.patch(
  "/:translatedFieldObjectId",
  isTranslator,
  getTranslatedFieldFromUrl,
  translatedElementDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      await patchTranslatedField(
        req.user,
        req.translatedField as ApiTranslatedField,
        req.bodyValidated,
        req.log
      );

      return res
        .status(200)
        .json({ message: "PATCH_TRANSLATED_FIELD_SUCCEEDED" });
    } catch (e) {
      req.log.error(e, "PATCH_TRANSLATED_FIELD_FAILED");
      return res.status(500).json({ message: "PATCH_TRANSLATED_FIELD_FAILED" });
    }
  }
);

export default router;
