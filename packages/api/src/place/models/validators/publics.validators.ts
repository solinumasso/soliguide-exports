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
  ADMINISTRATIVE_DEFAULT_VALUES,
  FAMILY_DEFAULT_VALUES,
  GENDER_DEFAULT_VALUES,
  OTHER_DEFAULT_VALUES,
} from "@soliguide/common";

export const administrativeSituationsValidator = {
  validator: (administrativeSituations: any) =>
    !administrativeSituations ||
    (Array.isArray(administrativeSituations) &&
      (administrativeSituations as Array<any>).every(
        (administrativeSituation) =>
          ADMINISTRATIVE_DEFAULT_VALUES.includes(administrativeSituation)
      )),
  message: "Path {PATH} is not a list of valid administrative situations",
};

export const familySituationsValidator = {
  validator: (familySituations: any) =>
    !familySituations ||
    (Array.isArray(familySituations) &&
      (familySituations as Array<any>).every((familySituation) =>
        FAMILY_DEFAULT_VALUES.includes(familySituation)
      )),
  message: "Path {PATH} is not a list of valid family situations",
};

export const gendersValidator = {
  validator: (genders: any) =>
    !genders ||
    (Array.isArray(genders) &&
      (genders as Array<any>).every((gender) =>
        GENDER_DEFAULT_VALUES.includes(gender)
      )),
  message: "Path {PATH} is not a list of valid genders",
};

export const otherSituationsValidator = {
  validator: (otherSituations: any) =>
    !otherSituations ||
    (Array.isArray(otherSituations) &&
      (otherSituations as Array<any>).every((otherSituation) =>
        OTHER_DEFAULT_VALUES.includes(otherSituation)
      )),
  message: "Path {PATH} is not a list of valid other situations",
};
