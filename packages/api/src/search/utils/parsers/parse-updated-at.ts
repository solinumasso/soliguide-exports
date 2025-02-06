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
import { SearchFilterUpdatedAt, UpdatedAtInterval } from "@soliguide/common";

export const parseUpdatedAt = (
  searchUpdatedAt: SearchFilterUpdatedAt,
  nosqlQuery: any
): void => {
  // we don't need to use startOfDay, because frontend do it before
  if (!searchUpdatedAt.value) {
    return;
  }
  if (typeof searchUpdatedAt.value === "string") {
    searchUpdatedAt.value = new Date(searchUpdatedAt.value);
  }

  if (searchUpdatedAt.intervalType === UpdatedAtInterval.SPECIFIC_DAY) {
    const endOfDay = new Date(searchUpdatedAt.value);
    endOfDay.setUTCHours(23, 59, 59, 999);

    nosqlQuery.updatedByUserAt = {
      $gte: searchUpdatedAt.value,
      $lte: endOfDay,
    };
  } else if (searchUpdatedAt.intervalType === UpdatedAtInterval.BEFORE_DAY) {
    nosqlQuery["updatedByUserAt"] = {
      $lte: searchUpdatedAt.value,
    };
  } else if (searchUpdatedAt.intervalType === UpdatedAtInterval.AFTER_DAY) {
    nosqlQuery["updatedByUserAt"] = {
      $gte: searchUpdatedAt.value,
    };
  }
};
