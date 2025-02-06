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
import { UpdatedAtInterval } from "@soliguide/common";

import { body } from "express-validator";

import { isValidDate } from "../../_utils/functions/dates/date.functions";

export const searchUpdatedAtDto = (path = "updatedAt") => [
  body(`${path}.intervalType`)
    .if((intervalType: UpdatedAtInterval) => intervalType)
    .isIn(Object.values(UpdatedAtInterval)),

  body(`${path}.value`)
    .if((value: Date) => value)
    .custom((value) => isValidDate(value))
    .customSanitizer((value) => {
      const givenStartDate = new Date(value);
      givenStartDate.setUTCHours(0, 0, 0);
      return givenStartDate;
    }),
];
