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

import { commonUserFormDto } from "./commonUserForm.dto";

import { USER_ROLES } from "../constants/USER_ROLES.const";

import {
  EMAIL_NORMALIZE_OPTIONS,
  CHECK_STRING_NULL,
} from "../../config/expressValidator.config";

import { isUserInOrga } from "../controllers/user.controller";
import { EMAIL_VALIDATOR_CONFIG } from "@soliguide/common";
import { countryDto } from "../../_utils/dto";

export const inviteUserDto = [
  ...commonUserFormDto(),
  ...countryDto,
  // user email must exist and be an email
  body("mail")
    .exists(CHECK_STRING_NULL)
    .trim()
    .isEmail(EMAIL_VALIDATOR_CONFIG)
    .normalizeEmail(EMAIL_NORMALIZE_OPTIONS)
    .custom(async (mail, { req }) => {
      try {
        if (await isUserInOrga(mail, req.organization)) {
          return Promise.reject(new Error("USER_ALREADY_IN_ORGA"));
        }
        return Promise.resolve(true);
      } catch (e) {
        req.log.error(e);
        return Promise.reject(new Error("Server Error"));
      }
    }),

  // phone must valid french phone number
  body("role").notEmpty().isIn(USER_ROLES),
  body("places").exists().isArray(),
  body("organization").notEmpty().isString().trim(),
];
