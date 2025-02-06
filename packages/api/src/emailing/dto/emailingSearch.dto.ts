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

import { CampaignName } from "@soliguide/common";

import { CampaignEmailNameToSync, MG_EVENT_STRING_SORTED } from "../../_models";

import { territoriesDto } from "../../_utils/dto/territories.dto";

import { CHECK_STRING_NULL } from "../../config/expressValidator.config";

import { searchOptionsDto } from "../../general/dto/searchOptions.dto";

export const emailingSearchDto = [
  body("campaigns")
    .if(body("campaigns").exists(CHECK_STRING_NULL))
    .isArray()
    .custom((campaigns) => {
      for (const campaign of campaigns) {
        if (!Object.keys(CampaignName).includes(campaign)) {
          throw new Error(
            `The campaign "${campaign}" doesn't belong to the campaigns list`
          );
        }
      }
      return true;
    })
    .customSanitizer((campaigns) => {
      return [...new Set(campaigns)];
    }),
  body("lastStatus").optional({ nullable: true }).isIn(MG_EVENT_STRING_SORTED),
  body("emailType")
    .optional({ nullable: true })
    .isIn(Object.values(CampaignEmailNameToSync)),
  body("options.sortBy")
    .if(body("options.sortBy").exists())
    .isIn([
      "campaign",
      "createdAt",
      "info.organization_id",
      "info.territory",
      "lastStatus",
      "lastUpdate",
      "emailType",
      "recipientEmail",
      "territory",
    ]),
  body("orgaId")
    .if(body("organization_id").exists(CHECK_STRING_NULL))
    .isInt({ allow_leading_zeroes: true, min: 0 })
    .toInt(),
  body("recipientEmail").optional({ nullable: true }).isString().trim(),
  ...searchOptionsDto,
  ...territoriesDto,
];
