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
import express, { type NextFunction } from "express";

import type {
  ValidatedBodyExpressRequest,
  ExpressResponse,
} from "../../_models";
import { SearchRequest } from "../validators";
import { validateBodyMiddlewareGenerator } from "../../middleware";
import { searchPlaces } from "../controllers";

const router = express.Router();

router.post(
  "/",
  validateBodyMiddlewareGenerator(SearchRequest),
  async (
    req: ValidatedBodyExpressRequest<SearchRequest>,
    res: ExpressResponse,
    next: NextFunction
  ) => {
    try {
      const searchResults = await searchPlaces(req.validatedBody, req.user);

      res.status(200).json(searchResults);
      next();
    } catch (e) {
      req.log.error(e, "SEARCH_ERROR");
      res.status(500).json({ message: "SEARCH_ERROR" });
    }
  }
);

export default router;
