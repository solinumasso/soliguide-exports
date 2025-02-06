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
import { DEPARTMENTS_MAP } from "../constants";
import { CountryCodes, SoliguideCountries } from "../enums";
import { getDepartmentCodeFromPostalCode } from "../functions";
import { LocationAutoCompleteAddress } from "../interfaces";
import { AnyDepartmentCode } from "../types";

// @Deprecated
export class LocationAreas {
  public _id?: { id: boolean };

  // @Deprecated start ---
  public ville?: string;
  public codePostal?: string;
  public departement?: string;
  public departementCode?: string;
  public pays?: string;
  // @Deprecated end ---

  // Optionnal fields
  public city?: string;
  public cityCode?: string;
  public department?: string;
  public departmentCode?: AnyDepartmentCode;

  public postalCode?: string;

  // Required fields
  public country: SoliguideCountries;
  public region?: string;
  public regionCode?: string;

  // TODO: check with team data if it's needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public slugs: any;

  constructor(data?: Partial<LocationAutoCompleteAddress>) {
    // DEPRECATED START
    this.codePostal = data?.postalCode ?? undefined;
    this.departement = data?.department ?? undefined;
    this.departementCode = data?.departmentCode ?? undefined;
    this.pays = data?.country ?? undefined;
    this.ville = data?.city ?? undefined;
    // DEPRECATED END

    this.cityCode = data?.cityCode;
    this.postalCode = data?.postalCode;
    this.city = data?.city;
    this.country = data?.country ?? CountryCodes.FR;

    if (data?.cityCode) {
      this.departmentCode = getDepartmentCodeFromPostalCode(
        this.country,
        data.cityCode
      );
      this.departementCode = getDepartmentCodeFromPostalCode(
        this.country,
        data.cityCode
      );
    } else if (data?.postalCode) {
      this.departmentCode = getDepartmentCodeFromPostalCode(
        this.country,
        data.postalCode
      );
      this.departementCode = getDepartmentCodeFromPostalCode(
        this.country,
        data.postalCode
      );
    }

    if (this.departmentCode) {
      const department = DEPARTMENTS_MAP[this.country][this.departmentCode];
      if (department) {
        this.department = department.departmentName;
        this.departement = department.departmentName;
        this.region = department.regionName;
        this.regionCode = department.regionCode;
      }
    }
  }
}
