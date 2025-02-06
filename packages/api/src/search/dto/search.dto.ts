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
import {
  PLACE_LANGUAGES_LIST_MAP_KEY,
  WIDGETS_AVAILABLE,
} from "@soliguide/common";

import { body } from "express-validator";

import { searchLocationsDto } from "./searchLocations.dto";

import { CHECK_STRING_NULL } from "../../config/expressValidator.config";

import { searchOptionsDto } from "../../general/dto/searchOptions.dto";

import { categoriesDto, categoryDto } from "./categories.dto";
import { placeTypeDto } from "./placeType.dto";
import { searchUpdatedAtDto } from "./searchUpdatedAt.dto";
import { publicsDto } from "./publics.dto";
import { textSearchDto } from "./text-search.dto";

export const searchDto = [
  ...searchLocationsDto(),
  ...searchLocationsDto("locations.*."),
  ...searchOptionsDto,
  ...categoriesDto,
  ...categoryDto,
  ...placeTypeDto,
  ...searchUpdatedAtDto(),
  ...publicsDto,
  ...textSearchDto("word"),
  body("openToday").if(body("openToday").exists(CHECK_STRING_NULL)).isBoolean(),

  // TODO: go further with the modalities inspection to get the data in the right format
  body("modalities").if(body("modalities").exists(CHECK_STRING_NULL)),

  body("languages")
    .if(body("languages").exists(CHECK_STRING_NULL))
    .isIn(PLACE_LANGUAGES_LIST_MAP_KEY),

  body("widgetId")
    .if(body("widgetId").exists(CHECK_STRING_NULL))
    .isIn(WIDGETS_AVAILABLE),

  body("options.sortBy")
    .if(body("options.sortBy").exists(CHECK_STRING_NULL))
    .isIn([
      "createdAt",
      "lieu_id",
      "name",
      "distance",
      "slugs.infos.name",
      "status",
      // we keep updatedAt field for api users
      "updatedAt",
    ]),
];
