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
import { checkRights, getFilteredData } from "../../middleware";

import {
  getAllTemplates,
  getMyTemplates,
  patchEmailTemplateAccount,
} from "../controllers/email-templates.controller";

import { editEmailDto } from "../dto";

import { AnyDepartmentCode, UserStatus } from "@soliguide/common";
import { ExpressRequest, ExpressResponse } from "../../_models";

const router = express.Router();

router.patch(
  "/:_id",
  checkRights([UserStatus.ADMIN_SOLIGUIDE, UserStatus.ADMIN_TERRITORY]),
  editEmailDto,
  getFilteredData,
  async (req: ExpressRequest, res: ExpressResponse) => {
    const _id = req.params._id;

    try {
      const response = await patchEmailTemplateAccount(_id, req.bodyValidated);
      return res.status(200).json(response);
    } catch (e) {
      req.log.error(e, "PATCH_EMAIL_TEMPLATE_FAIL");
      return res.status(500).json("PATCH_EMAIL_TEMPLATE_FAIL");
    }
  }
);

// Get all templates that I can edit
router.get(
  "/:territory?",
  checkRights([UserStatus.ADMIN_SOLIGUIDE, UserStatus.ADMIN_TERRITORY]),
  async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const response = req.params.territory
        ? await getMyTemplates(req.params.territory as AnyDepartmentCode)
        : await getAllTemplates();

      return res.status(200).json(response);
    } catch (e) {
      req.log.error(e, "GET_EMAIL_TEMPLATES_FAIL");
      return res.status(500).json("GET_EMAIL_TEMPLATES_FAIL");
    }
  }
);

export default router;
