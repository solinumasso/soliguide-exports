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
import type { SearchParams } from "typesense/lib/Typesense/Documents";

import type {
  TypesensePlaceQueryBy,
  TypesensePlaceFilterBy,
} from "./TypesensePlaceSearchQuery.type";
import { SearchRequest } from "../validators";
import type { ITypesenseSearchQuery } from "./ITypesenseSearchQuery.interface";
import { FilterByBuilder } from "./FilterByBuilder";

export class TypesensePlaceSearchQuery
  extends SearchRequest
  implements
    ITypesenseSearchQuery<TypesensePlaceQueryBy, TypesensePlaceFilterBy>
{
  public queryBy?: TypesensePlaceQueryBy | TypesensePlaceQueryBy[];
  public filterBy?: TypesensePlaceFilterBy;

  public constructor(placeSearchQuery: Partial<TypesensePlaceSearchQuery>) {
    super();
    Object.assign(this, placeSearchQuery);
  }

  public toSearchParams(): SearchParams {
    let stringFilterBy: string | undefined;
    if (this.filterBy) {
      stringFilterBy = new FilterByBuilder()
        .addFiltersRecord(this.filterBy)
        .build();
    }
    return {
      q: this.q ?? "*",
      page: this.page ?? 1,
      per_page: this.per_page ?? 100,
      query_by: Array.isArray(this.queryBy)
        ? this.queryBy.join(",")
        : this.queryBy,
      filter_by: stringFilterBy,
    };
  }
}
