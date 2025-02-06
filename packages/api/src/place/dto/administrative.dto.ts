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
  WelcomedPublics,
} from "@soliguide/common";

import { body } from "express-validator";

export const administrativeDto = (path = "") => {
  return [
    body(path + "publics").customSanitizer((value) => {
      if (!value.accueil) {
        value.administrative = ADMINISTRATIVE_DEFAULT_VALUES;
      }
      return value;
    }),

    body(path + "publics")
      .customSanitizer((value) => {
        value.administrative = value.administrative?.length
          ? [...new Set(value.administrative)]
          : [];
        return value;
      })
      .custom((value) => {
        if (
          value.accueil !== WelcomedPublics.UNCONDITIONAL &&
          value.administrative.length === 0
        ) {
          throw new Error("NO_ADMINISTRATIVE_STATUS_SELECTED");
        }
        return true;
      }),

    body(path + "publics.administrative.*").custom((value) => {
      if (ADMINISTRATIVE_DEFAULT_VALUES.indexOf(value) === -1) {
        throw new Error("WRONG_ADMINISTRATIVE_STATUS");
      }
      return true;
    }),
  ];
};
