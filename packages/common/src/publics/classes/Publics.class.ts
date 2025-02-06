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
  ADMINISTRATIVE_DEFAULT_VALUES,
  FAMILY_DEFAULT_VALUES,
  GENDER_DEFAULT_VALUES,
  OTHER_DEFAULT_VALUES,
} from "../constants";
import {
  PublicsAdministrative,
  PublicsFamily,
  PublicsGender,
  PublicsOther,
  WelcomedPublics,
} from "../enums";

export class Publics {
  public accueil: WelcomedPublics;

  public description: string | null;

  public administrative: PublicsAdministrative[];
  public familialle: PublicsFamily[];
  public gender: PublicsGender[];
  public other: PublicsOther[];

  public age: { max: number; min: number };
  public showAge?: boolean;

  constructor(publics?: Partial<Publics>) {
    this.accueil = publics?.accueil ?? WelcomedPublics.UNCONDITIONAL;

    this.description = publics?.description ?? null;

    this.administrative = publics?.administrative?.length
      ? publics.administrative
      : ADMINISTRATIVE_DEFAULT_VALUES;
    this.familialle = publics?.familialle?.length
      ? publics.familialle
      : FAMILY_DEFAULT_VALUES;
    this.gender = publics?.gender?.length
      ? publics.gender
      : GENDER_DEFAULT_VALUES;
    this.other = publics?.other?.length ? publics.other : OTHER_DEFAULT_VALUES;

    this.age = publics?.age ?? { max: 99, min: 0 };

    if (this.age.max !== 99 || this.age.min !== 0) {
      this.showAge = true;
    }
  }
}
