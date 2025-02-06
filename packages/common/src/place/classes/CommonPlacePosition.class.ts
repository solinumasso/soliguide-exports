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
  AnyRegionCode,
  AnyTimeZone,
  CountryCodes,
  PositionSlugs,
} from "../../location";
import { PlaceLocation } from "../interfaces/PlaceLocation.interface";

export class CommonPlacePosition {
  public adresse?: string; // @deprecated
  public codePostal?: string; // @deprecated
  public complementAdresse: string | null; // @deprecated
  public departement?: string; // @deprecated
  public departementCode?: string; // @deprecated
  public location: PlaceLocation; // @deprecated
  public pays?: string; // @deprecated
  public ville?: string; // @deprecated

  // New fields in english
  public address: string;
  public additionalInformation?: string;
  public city: string;
  public cityCode: string;
  public postalCode: string;
  public department: string;
  public departmentCode?: AnyDepartmentCode;
  public region: string;
  public regionCode?: AnyRegionCode;
  public country?: CountryCodes;
  public timeZone: AnyTimeZone;

  public slugs?: PositionSlugs;

  constructor(position?: Partial<CommonPlacePosition>) {
    this.location = position?.location ?? {
      coordinates: [],
      type: "Point",
    };

    this.address = position?.address ?? "";
    this.additionalInformation = position?.additionalInformation;
    this.city = position?.city ?? "";
    this.postalCode = position?.postalCode ?? "";
    this.cityCode = position?.cityCode ?? "";
    this.department = position?.department ?? "";
    this.departmentCode = position?.departmentCode;
    this.region = position?.region ?? "";
    this.regionCode = position?.regionCode;
    this.country = position?.country ?? undefined;

    // @deprecated start
    this.adresse = position?.address ?? "";
    this.codePostal = position?.postalCode ?? "";
    this.complementAdresse = position?.additionalInformation ?? null;
    this.departement = position?.department ?? "";
    this.departementCode = position?.departmentCode ?? "";
    this.pays = position?.country ?? "";
    this.ville = position?.city ?? "";
    // @deprecated end

    this.timeZone = position?.timeZone ?? "Europe/Paris";

    this.slugs = new PositionSlugs(this);
  }
}
