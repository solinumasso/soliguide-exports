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
import { PLACE_LANGUAGES_LIST_MAP_KEY } from "@soliguide/common";

import { body } from "express-validator";
import { CHECK_STRING_NULL } from "../../config/expressValidator.config";
import { searchOptionsDto } from "../../general/dto/searchOptions.dto";
import { countryDto } from "../../_utils/dto";

const optionsSortBy = [
  "createdAt",
  "position.departmentCode",
  "lieu_id",
  "updatedAt",
];

for (const lang of PLACE_LANGUAGES_LIST_MAP_KEY) {
  optionsSortBy.push(`languages.${lang}.human.status`);
}

export const searchTranslatedElementDto = [
  ...countryDto,
  ...searchOptionsDto,

  body("lieu_id")
    .if(body("lieu_id").exists(CHECK_STRING_NULL))
    .isInt({ allow_leading_zeroes: true, min: 0 })
    .toInt(),

  body("status").optional().exists(),

  body("options.sortBy")
    .if(body("options.sortBy").exists())
    .isIn(optionsSortBy),
];
