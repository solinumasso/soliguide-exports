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
import { body } from "express-validator";
import {
  Categories,
  UserStatus,
  DEFAULT_SERVICES_TO_EXCLUDE_WITH_ADDICTION,
} from "@soliguide/common";

import { CHECK_STRING_NULL } from "../../config";

const sanitizeCategories = (categories: Categories[]) => {
  return categories.map((category) => category as Categories);
};

export const categoryDto = [
  body("category")
    .if(body("category").exists(CHECK_STRING_NULL))
    .isIn(Object.values(Categories)),
];

export const categoriesDto = [
  body("categories")
    .if((value: any) => value)
    .isArray()
    .if(body("categories.*").isIn(Object.values(Categories))) // We use the wildcard otherwise only the first element of the array is checked
    .custom((categories: Categories[], { req }) => {
      if (
        ![
          UserStatus.API_USER,
          UserStatus.WIDGET_USER,
          UserStatus.SOLI_BOT,
        ].includes(req.user?.status)
      ) {
        throw new Error(
          "Only Solibot, API and widget users are allowed to search by multiples categories"
        );
      } else {
        for (const category of categories) {
          if (!Object.values(Categories).includes(category)) {
            throw new Error(`Category ${category} doesn't exist`);
          }
        }
        return true;
      }
    })
    .customSanitizer((categories: Categories[]) =>
      sanitizeCategories(categories)
    ),
];

export const categoriesToExcludeDto = [
  body("catToExclude")
    .if(body("catToExclude").exists(CHECK_STRING_NULL))
    .isArray()
    .custom((value: Categories[]) => {
      for (const category of value) {
        if (!DEFAULT_SERVICES_TO_EXCLUDE_WITH_ADDICTION.includes(category)) {
          return false;
        }
      }
      return true;
    })
    .customSanitizer((categories: Categories[]) =>
      sanitizeCategories(categories)
    ),
];
