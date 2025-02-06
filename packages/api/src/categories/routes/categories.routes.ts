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
import { Router } from "express";

const router = Router();

import { ExpressRequest, ExpressResponse } from "../../_models";

import { getAllCategories } from "../controllers/categories.controller";
import { checkRights } from "../../middleware";
import { UserStatus } from "@soliguide/common";
import { TypeCategoriesServiceNotFromThemeEnum } from "../enums/type-categories-service-not-from-theme.enum";
import { getServiceCategoriesApi } from "../functions/get-service-categories-api.function";

router.get(
  "/",
  checkRights([
    UserStatus.ADMIN_SOLIGUIDE,
    UserStatus.ADMIN_TERRITORY,
    UserStatus.API_USER,
  ]),
  (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const categoryService = getServiceCategoriesApi(
        TypeCategoriesServiceNotFromThemeEnum.V2
      );
      req.requestInformation.categoryService = categoryService;
      const categories = getAllCategories(req);
      return res.json(categories);
    } catch (e) {
      return res.status(400).json({
        message: "CATEGORIES_NOT_FOUND",
      });
    }
  }
);

export default router;
