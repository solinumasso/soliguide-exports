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

export const ageDto = (path = "") => {
  return [
    body(path + "publics").customSanitizer((value) => {
      if (!value.accueil) {
        value.age = { max: 99, min: 0 };
      }
      return value;
    }),

    body(path + "publics.age.min")
      .exists()
      .isInt({ allow_leading_zeroes: true, max: 99, min: 0 })
      .toInt()
      .customSanitizer((value) => {
        return value ? value : 0;
      })
      .custom((value) => {
        return value >= 0;
      })
      .withMessage("Minimum age must be greater than or equal to 0")
      .custom((value) => {
        return value <= 99;
      })
      .withMessage("Minimum age must be lower than or equal to 99"),

    body(path + "publics.age.max")
      .exists()
      .isInt({ allow_leading_zeroes: false, max: 99, min: 0 })
      .toInt()
      .customSanitizer((value) => {
        return value ? value : 99;
      })
      .custom((value) => {
        return value > 0;
      })
      .withMessage("Maximum age must be greater than or equal to 0")
      .custom((value) => {
        return value <= 99;
      })
      .withMessage("Maximum age must be lower than or equal to 99"),

    body(path + "publics.age")
      .isObject()
      .custom((value) => {
        if (value.max < value.min) {
          throw new Error(
            "Maximum age must be greater than or equal to minimum age"
          );
        }
        return true;
      }),
  ];
};
