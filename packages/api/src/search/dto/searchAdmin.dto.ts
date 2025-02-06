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
  AdminSearchFilterOrganization,
  CampaignPlaceAutonomy,
  CampaignSource,
  PlaceVisibility,
  CampaignStatusForSearch,
  SearchFilterClosure,
  SearchPlaceStatus,
} from "@soliguide/common";

import { body } from "express-validator";

import { categoriesToExcludeDto, categoryDto } from "./categories.dto";
import { searchLocationsDto } from "./searchLocations.dto";

import { CHECK_STRING_NULL } from "../../config/expressValidator.config";

import { searchOptionsDto } from "../../general/dto/searchOptions.dto";
import { placeTypeDto } from "./placeType.dto";
import { searchUpdatedAtDto } from "./searchUpdatedAt.dto";
import { textSearchDto } from "./text-search.dto";
import { countryDto } from "../../_utils/dto";

export const searchAdminDto = [
  ...searchLocationsDto(),
  ...searchOptionsDto,
  ...categoryDto,
  ...categoriesToExcludeDto,
  ...countryDto,
  ...placeTypeDto,
  ...searchUpdatedAtDto("updatedByUserAt"),
  ...textSearchDto("word"),

  body("autonomy")
    .if(body("autonomy").exists(CHECK_STRING_NULL))
    .isArray()
    .custom((autonomy) => {
      for (const aut of autonomy) {
        if (!CampaignPlaceAutonomy[aut as CampaignPlaceAutonomy]) {
          throw new Error(`${aut.toUpperCase()}_DOES_NOT_EXIST`);
        }
      }
      return true;
    })
    .customSanitizer((autonomy) => {
      return [...new Set(autonomy)];
    }),

  body("campaignStatus")
    .if(body("campaignStatus").exists(CHECK_STRING_NULL))
    .isIn(Object.values(CampaignStatusForSearch)),

  body("close")
    .if(body("close").exists(CHECK_STRING_NULL))
    .isIn(Object.values(SearchFilterClosure)),

  body("lieu_id")
    .if(body("lieu_id").exists(CHECK_STRING_NULL))
    .isInt({ allow_leading_zeroes: true, min: 0 })
    .toInt(),

  body("organization")
    .if(body("organization").exists(CHECK_STRING_NULL))
    .isIn(Object.values(AdminSearchFilterOrganization)),

  body("options.sortBy")
    .if(body("options.sortBy").exists(CHECK_STRING_NULL))
    .isIn([
      "autonomy",
      "createdAt",
      "campaignStatus",
      "distance",
      "organizations.name",
      "lieu_id",
      "name",
      "priority",
      "slugs.infos.name",
      "sourceMaj",
      "status",
      "updatedByUserAt",
      "visibility",
    ]),

  body("priority").if(body("priority").exists(CHECK_STRING_NULL)).isBoolean(),

  body("sourceMaj").if(
    body("sourceMaj")
      .exists(CHECK_STRING_NULL)
      .isIn(Object.values(CampaignSource))
  ),

  body("status")
    .if(body("status").exists(CHECK_STRING_NULL))
    .isIn(Object.values(SearchPlaceStatus)),

  body("visibility")
    .if(body("visibility").exists(CHECK_STRING_NULL))
    .isIn(Object.values(PlaceVisibility)),
];

export const searchAdminForOrgasDto = [
  ...searchOptionsDto,
  ...placeTypeDto,
  ...textSearchDto("word"),
  ...countryDto,
  body("lieu_id")
    .if(body("lieu_id").exists(CHECK_STRING_NULL))
    .isInt({ allow_leading_zeroes: true, min: 0 })
    .toInt(),
];
