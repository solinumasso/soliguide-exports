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
import { GeoTypes, SOLIGUIDE_COUNTRIES, UserStatus } from "@soliguide/common";
import { body } from "express-validator";
import { CHECK_STRING_NULL } from "../../config/expressValidator.config";
import { stringDto } from "../../_utils/dto";

export const searchLocationsDto = (prefix = "location.") => {
  return [
    // TODO: add address from location-api, sent by frontend
    body(`${prefix}geoType`)
      .exists()
      .customSanitizer((value?: string | null) => {
        return !value ? GeoTypes.UNKNOWN : value;
      })
      .isIn(Object.values(GeoTypes)),

    body(`${prefix}geoValue`)
      .if(
        body(`${prefix}geoType`).custom(
          (value: string) =>
            value !== GeoTypes.POSITION && value !== GeoTypes.UNKNOWN
        )
      )
      .exists(CHECK_STRING_NULL),

    body(`${prefix}coordinates`)
      .if(body(`${prefix}geoType`).equals(GeoTypes.POSITION))
      .exists(CHECK_STRING_NULL)
      .notEmpty(),

    body(`${prefix}distance`)
      .if(body(`${prefix}geoType`).equals(GeoTypes.POSITION))
      .if((value: any) => value)
      .isNumeric(),

    body(`${prefix}label`).if((value: string) => value),

    stringDto(`${prefix}department`, false),
    stringDto(`${prefix}regionCode`, false),
    stringDto(`${prefix}departmentCode`, false),
    stringDto(`${prefix}region`, false),

    body(`${prefix}country`)
      .if(({ req }) => req.user.status !== UserStatus.API_USER)
      .custom((value: any) => {
        if (SOLIGUIDE_COUNTRIES.includes(value)) {
          return value;
        }
        throw new Error("COUNTRY_NOT_AVAILABLE");
      }),
  ];
};
