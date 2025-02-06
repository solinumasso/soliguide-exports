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

import { placePhonesDto } from "./phones.dto";

import { checkUrlFieldDto } from "../../_utils/dto";

import {
  CHECK_STRING_NULL,
  EMAIL_NORMALIZE_OPTIONS,
} from "../../config/expressValidator.config";
import { EMAIL_VALIDATOR_CONFIG, REGEXP } from "@soliguide/common";

export const entityDto = [
  // entity.email must be an email
  body("entity.mail")
    .if(body("entity.mail").exists(CHECK_STRING_NULL))
    .trim()
    .isEmail(EMAIL_VALIDATOR_CONFIG)
    .normalizeEmail(EMAIL_NORMALIZE_OPTIONS),

  checkUrlFieldDto("entity.facebook"),
  checkUrlFieldDto("entity.instagram"),
  checkUrlFieldDto("entity.website"),

  // entity.fax must valid french phone number
  body("entity.fax")
    .if((value: any) => value)
    .if(body("entity.fax").matches(REGEXP.phone))
    .trim(),

  ...placePhonesDto("entity.phones.*"),
];
