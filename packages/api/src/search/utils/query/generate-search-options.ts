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
import { CAMPAIGN_DEFAULT_NAME, ManageSearchOptions } from "@soliguide/common";

import { QueryOptions } from "mongoose";

import { FIELDS_FOR_SEARCH } from "../../constants/requests/FIELDS_FOR_SEARCH.const";

/**
 * @name  generateSearchOptions Generate filter option
 * @param nbResults {number} from DTO
 * @param options {Object} from DTO
 */
export const generateSearchOptions = (
  nbResults: number,
  options: ManageSearchOptions,
  context?: string
): QueryOptions => {
  const queryOptions: QueryOptions = {
    limit: 100,
    page: 1,
    skip: 0,
    sort: null,
  };

  // We adjust the options only if they are meaningful i.e. the results number must be coherent with the options
  if (nbResults && typeof options !== "undefined") {
    queryOptions.limit =
      typeof options.limit === "undefined"
        ? 20
        : typeof options.limit === "number"
        ? options.limit
        : undefined;

    if (typeof options.page === "number") {
      queryOptions.page = options.page;
    }

    queryOptions.skip = queryOptions.limit
      ? (queryOptions.page - 1) * queryOptions.limit
      : 0;

    // For organization sorting
    if (options.sortBy === "invitations" || options.sortBy === "users") {
      options.sortBy = `counters.${options.sortBy}.TOTAL`;
    }

    if (
      options.sortBy &&
      ["autonomy", "autonomyRate", "campaignStatus", "sourceMaj"].includes(
        options.sortBy
      )
    ) {
      const field =
        options.sortBy === "campaignStatus"
          ? "status"
          : options.sortBy === "sourceMaj"
          ? "source"
          : options.sortBy;

      options.sortBy = `campaigns.${CAMPAIGN_DEFAULT_NAME}.${field}`;
    }

    if (options.sortBy && options.sortValue) {
      queryOptions.sort = {
        [`${options.sortBy}`]: options.sortValue,
      };
    }
  }

  if (!options?.fields) {
    if (context) {
      queryOptions.fields = FIELDS_FOR_SEARCH[context];
    } else {
      queryOptions.fields = FIELDS_FOR_SEARCH.DEFAULT;
    }
  } else {
    queryOptions.fields = options.fields;
  }

  return queryOptions;
};
