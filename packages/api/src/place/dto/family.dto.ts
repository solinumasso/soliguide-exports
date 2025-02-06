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
import { FAMILY_DEFAULT_VALUES, WelcomedPublics } from "@soliguide/common";

import { body } from "express-validator";

export const familyDto = (path = "") => {
  return [
    body(path + "publics").customSanitizer((value) => {
      if (!value.accueil) {
        value.familialle = structuredClone(FAMILY_DEFAULT_VALUES);
      }
      return value;
    }),
    body(path + "publics")
      .customSanitizer((value) => {
        value.familialle = value.familialle?.length
          ? [...new Set(value.familialle)]
          : [];
        return value;
      })
      .custom((value) => {
        if (
          value.accueil !== WelcomedPublics.UNCONDITIONAL &&
          value.familialle.length === 0
        ) {
          throw new Error("NO_FAMILY_STATUS_SELECTED");
        }
        return true;
      }),

    body(path + "publics.familialle.*").custom((value) => {
      if (FAMILY_DEFAULT_VALUES.indexOf(value) === -1) {
        throw new Error("WRONG_FAMILY_STATUS");
      }
      return true;
    }),
  ];
};
