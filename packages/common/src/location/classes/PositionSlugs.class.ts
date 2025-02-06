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
import { slugLocation } from "../../general";

export class PositionSlugs {
  public ville?: string; // @deprecated
  public departement?: string; // @deprecated
  public pays?: string; // @deprecated

  public department?: string;
  public country?: string;
  public region?: string;
  public city?: string;

  constructor(data: {
    city?: string;
    department?: string;
    region?: string;
    country?: string;
    ville?: string;
    departement?: string;
    pays?: string;
  }) {
    this.city = data?.city ? slugLocation(data?.city) : undefined;
    this.department = data?.department
      ? slugLocation(data?.department)
      : undefined;
    this.region = data?.region ? slugLocation(data?.region) : undefined;
    this.country = data?.country ? slugLocation(data?.country) : undefined;

    // Deprecated fields
    this.ville = this.city;
    this.departement = this?.department;
    this.pays = this?.country;
  }
}
