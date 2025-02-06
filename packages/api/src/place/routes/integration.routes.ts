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

import { UserStatus } from "@soliguide/common";

import { checkDuplicatesByPlace } from "../controllers";

import { checkDuplicatesByPlaceDto, formatAddressDto } from "../dto";

import { type ExpressRequest, type ExpressResponse } from "../../_models";

import { checkRights, getFilteredData } from "../../middleware";
import IntegrationController from "../controllers/integration.controller";

const router = express.Router();

router.post(
  "/format-address",
  checkRights([UserStatus.ADMIN_SOLIGUIDE, UserStatus.SOLI_BOT]),
  formatAddressDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const formattedAddress = await IntegrationController.formatAddress(
        req.bodyValidated
      );
      return res.status(200).json(formattedAddress);
    } catch (err) {
      req.log.error(err, "FORMAT_ADDRESS_FAILED");
      return res.status(400).json({ message: "FORMAT_ADDRESS_FAILED" });
    }
  }
);

router.post(
  "/search-duplicates",
  checkRights([
    UserStatus.ADMIN_SOLIGUIDE,
    UserStatus.ADMIN_TERRITORY,
    UserStatus.SOLI_BOT,
  ]),
  checkDuplicatesByPlaceDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const duplicates = await checkDuplicatesByPlace(req);

      if (duplicates.length) {
        return res.status(200).json(duplicates);
      } else {
        return res.status(204).json(null);
      }
    } catch (err) {
      req.log.error(err, "SEARCH_DUPLICATES_FAILED");
      return res.status(400).json({ message: "SEARCH_DUPLICATES_FAILED" });
    }
  }
);

export default router;
