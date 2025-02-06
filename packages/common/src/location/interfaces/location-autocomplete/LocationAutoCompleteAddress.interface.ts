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
import { PositionSlugs } from "../../classes";
import { GeoTypes, SoliguideCountries } from "../../enums";
import { AnyDepartmentCode, AnyRegionCode, AnyTimeZone } from "../../types";
export class LocationAutoCompleteAddress {
  public label: string;
  public coordinates: number[];
  public postalCode?: string;
  public cityCode?: string;
  public city?: string;
  public name?: string;
  public geoType: GeoTypes;
  public geoValue: string;
  public department?: string;
  public departmentCode?: AnyDepartmentCode;
  public country?: SoliguideCountries;
  public region?: string;
  public regionCode?: AnyRegionCode;
  public timeZone?: AnyTimeZone;
  public slugs: PositionSlugs;

  constructor(data: Partial<LocationAutoCompleteAddress>) {
    this.label = data?.label ?? "";
    this.coordinates = data?.coordinates ?? [];
    this.geoType = data?.geoType ?? GeoTypes.UNKNOWN;
    this.geoValue = data?.geoValue ?? "";
    this.slugs = new PositionSlugs(data);
    this.postalCode = data?.postalCode ?? undefined;
    this.cityCode = data?.cityCode ?? undefined;
    this.city = data?.city ?? undefined;
    this.name = data?.name ?? undefined;
    this.department = data?.department ?? undefined;
    this.departmentCode = data?.departmentCode ?? undefined;
    this.country = data?.country ?? undefined;
    this.region = data?.region ?? undefined;
    this.regionCode = data?.regionCode ?? undefined;
    this.timeZone = data?.timeZone ?? undefined;
  }
}
