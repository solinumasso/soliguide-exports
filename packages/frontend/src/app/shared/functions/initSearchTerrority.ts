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
  type AnyDepartmentCode,
  DEPARTMENTS_MAP,
  type SoliguideCountries,
  DepartmentInfoContent,
  getAllowedTerritories,
} from "@soliguide/common";
import type { User } from "../../modules/users/classes";
import { THEME_CONFIGURATION } from "../../models";

export const initSearchAdminTerritory = (
  territories?: AnyDepartmentCode[],
  user?: User
): AnyDepartmentCode[] => {
  if (!user) {
    return [];
  }

  const allowedTerritories: AnyDepartmentCode[] = getAllowedTerritories(
    user,
    THEME_CONFIGURATION.country
  );

  return territories?.length
    ? territories.filter((dep) => allowedTerritories.includes(dep))
    : allowedTerritories;
};

export function filterDepartments(
  user: User
): DepartmentInfoContent<SoliguideCountries>[] {
  const allowedTerritories = getAllowedTerritories(
    user,
    THEME_CONFIGURATION.country
  );

  const ALL_DEPARTMENTS = DEPARTMENTS_MAP[THEME_CONFIGURATION.country];

  return Object.values<DepartmentInfoContent<SoliguideCountries>>(
    ALL_DEPARTMENTS
  ).filter((dep) => allowedTerritories.includes(dep.departmentCode));
}
