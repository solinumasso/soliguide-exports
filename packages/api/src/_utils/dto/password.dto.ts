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
import { body, Meta } from "express-validator";

import { PASSWORD_REGEX_VALIDATOR } from "../../config/expressValidator.config";

export const passwordDto = [
  body("password")
    .isString()
    .notEmpty()
    .custom((value: string) => {
      const test = PASSWORD_REGEX_VALIDATOR.test(value);
      if (!test) {
        throw new Error("INVALID_PASSWORD");
      }
      return true;
    }),

  body("passwordConfirmation")
    .isString()
    .notEmpty()
    .custom((passwordConfirmation: string, { req }: Meta) => {
      return passwordConfirmation === req.body.password;
    })
    .withMessage("CONFIRMATION_PASSWORD_DOES_NOT_MATCH"),
];
