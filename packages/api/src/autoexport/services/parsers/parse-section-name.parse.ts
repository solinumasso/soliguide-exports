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
import { ApiPlace, SortingFilters } from "@soliguide/common";
import { ExportSearchParams } from "../../interfaces/ExportSearchParams.interface";
import { translateServiceName } from "./parse-services-categories";

export const parseSectionName = (
  searchData: ExportSearchParams,
  place: Pick<ApiPlace, "position" | "services_all">,
  service?: any
): string => {
  if (searchData.exportParams.sortingFilter === SortingFilters.CITY) {
    return place.position?.city.trim() ?? "";
  }
  if (searchData.exportParams.sortingFilter === SortingFilters.POSTAL_CODE) {
    return place.position?.postalCode.trim() ?? "";
  }
  // For draft places whitout services
  if (!service) {
    return "";
  }

  return translateServiceName(
    service.category,
    searchData.exportParams.language
  );
};
