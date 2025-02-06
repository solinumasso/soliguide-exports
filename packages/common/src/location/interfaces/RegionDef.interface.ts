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

import { TimeZone } from "../types";
import { SoliguideCountries } from "../enums";
import { RegionCode } from "../types/RegionCode.type";
import { DepartmentDef } from "./DepartmentDef.interface";
import { OtherNames } from "./OtherNames.interface";

export interface RegionDef<CountryCode extends SoliguideCountries> {
  regionCode: RegionCode<CountryCode>;
  regionName: string;
  isoCode?: string;
  subdivisionShortName?: string; // if exists, ShortName from subdivisions.csv file of openholidaysapi.data
  schoolZoneShortName?: string; // if exists, ShortName from schoolzones.csv file of openholidaysapi.data for ZA, ZB, ZC
  slug: string;
  timeZone: TimeZone<CountryCode>;
  coordinates: number[];
  departments: Array<DepartmentDef<CountryCode>>;
  otherNames?: OtherNames[];
}
