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

import isEmpty from "lodash.isempty";
import { FilterQuery } from "mongoose";

export const parseTextSearch = <T extends { [key: string]: any }>(
  query: FilterQuery<any>,
  searchData: T,
  field: keyof T
): void => {
  if (!isEmpty(searchData[field])) {
    query[field] = {
      $options: "i",
      $regex: createSafeRegex(searchData[field]),
    };
  }
};

export const createSafeRegex = (searchTerm: string): RegExp => {
  const escapedSearchTerm = searchTerm.replace(
    /[-[\]{}()*+?.,\\^$|#\s]/g,
    "\\$&"
  );
  return new RegExp(`.*${escapedSearchTerm}.*`);
};
