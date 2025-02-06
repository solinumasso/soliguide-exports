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

import type { ExpressRequest, ExpressResponse } from "../../_models";
import { getPlaceFromUrl, canEditPlace, mediaGuards } from "../../middleware";
import { addPhoto, deletePhoto, uploadImg } from "../controllers";

router.post(
  "/:lieu_id",
  getPlaceFromUrl,
  canEditPlace,
  mediaGuards.canUploadPhoto,
  uploadImg,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const photo = await addPhoto(req);

      return res.status(200).json(photo);
    } catch (err) {
      req.log.error(err);
      return res.status(500).json({ message: "ADD_PHOTO_FICHE_ERROR" });
    }
  }
);

router.delete(
  "/:lieu_id/:photoObjectId/:parcoursId?",
  getPlaceFromUrl,
  canEditPlace,
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const place = await deletePhoto(req);

      return res.status(200).json(place);
    } catch (err) {
      req.log.error(err);
      return res.status(500).json({ message: "DELETE_PHOTO_FICHE_ERROR" });
    }
  }
);

export default router;
