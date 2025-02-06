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
  AnyDepartmentCode,
  getDepartmentCodeFromPostalCode,
  LocationAutoCompleteAddress,
  SoliguideCountries,
} from "../../location";
import { ApiPlace, getPosition } from "../../place";
import { PublicHoliday } from "../interfaces";

export const filterDepartmentsForHolidays = ({
  holidays,
  place,
  location,
}: {
  holidays: PublicHoliday[];
  place?: Pick<ApiPlace, "placeType" | "position" | "parcours">;
  location?: LocationAutoCompleteAddress;
}): PublicHoliday[] => {
  let departments: AnyDepartmentCode[] = [];

  if (place) {
    const position = getPosition(place);
    if (position?.postalCode) {
      departments = [
        getDepartmentCodeFromPostalCode(
          position.country as SoliguideCountries,
          position?.postalCode
        ),
      ];
    }
  } else if (location?.departmentCode) {
    departments = [location.departmentCode];
  }

  return holidays.filter((holiday) =>
    isHolidayForPostalCode(holiday, departments)
  );
};

export const isHolidayForPostalCode = (
  holiday: PublicHoliday,
  departments: AnyDepartmentCode[]
): boolean => {
  if (holiday.isNational) {
    return true;
  }

  if (!holiday.departments?.length) {
    return false;
  }

  if (!departments?.length) {
    return false;
  }

  return departments.some((departmentCode) =>
    holiday.departments.includes(departmentCode)
  );
};
