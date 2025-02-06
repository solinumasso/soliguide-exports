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
  EMAIL_VALIDATOR_CONFIG,
  UserStatus,
  Categories,
} from "@soliguide/common";

import { commonUserFormDto } from "./commonUserForm.dto";
import { getUserByParams } from "../services";
import { generateRandomPassword } from "../utils";
import { adminMailDto, passwordDto, territoriesDto } from "../../_utils/dto";
import { CHECK_STRING_NULL, EMAIL_NORMALIZE_OPTIONS } from "../../config";

const signupBaseDto = (isInvitation: boolean) => [
  ...commonUserFormDto(),
  // User email must exist and be an email
  body("mail")
    .exists(CHECK_STRING_NULL)
    .trim()
    .isEmail(EMAIL_VALIDATOR_CONFIG)
    .normalizeEmail(EMAIL_NORMALIZE_OPTIONS)
    .custom(async (value) => {
      // If it's an invitation we do not check that the email already exists
      if (isInvitation) {
        return Promise.resolve(true);
      }

      try {
        const userExist = await getUserByParams({
          mail: value,
        });
        if (userExist) {
          return Promise.reject(new Error("EMAIL_ALREADY_IN_USE"));
        }
        return Promise.resolve(true);
      } catch (e) {
        return Promise.reject(new Error("SERVER_ERROR"));
      }
    }),
];

export const signupDto = [
  ...signupBaseDto(false),
  ...territoriesDto,

  body("categoriesLimitations")
    .if(body("status").equals(UserStatus.API_USER))
    .if(body("categoriesLimitations").exists(CHECK_STRING_NULL))
    .isArray()
    .custom((categories) => {
      for (const category of categories) {
        if (!Object.values(Categories).includes(category)) {
          throw new Error("WRONG_CATEGORY_ID");
        }
      }
      return true;
    }),

  body("password").customSanitizer(() => generateRandomPassword()),
  body("status")
    .exists(CHECK_STRING_NULL)
    .isIn([
      UserStatus.API_USER,
      UserStatus.SOLI_BOT,
      UserStatus.ADMIN_SOLIGUIDE,
      UserStatus.ADMIN_TERRITORY,
    ]),
];

export const signupAfterInvitationDto = [
  body("invitation").isString().notEmpty(),

  ...adminMailDto,
  ...passwordDto,
  ...signupBaseDto(true),
];

export const signupTranslatorDto = [
  ...passwordDto,
  ...signupBaseDto(false),
  body("languages").exists().isArray(),
  body("translator")
    .isBoolean()
    .custom((value) => {
      if (value !== true) {
        throw new Error("TRANSLATOR_REGISTRATION_FAILED");
      }
      return true;
    }),
];
