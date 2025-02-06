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
import { Injectable } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import {
  ALL_PUBLICS,
  PUBLICS_LABELS,
  Publics,
  PublicsGender,
  PublicsOther,
} from "@soliguide/common";

@Injectable({
  providedIn: "root",
})
export class PublicsService {
  constructor(private readonly translateService: TranslateService) {}

  // TODO: delete this, use common package
  public generatePublics(publics: Publics): string {
    let strPublics = "";

    if (!publics?.accueil) {
      return "";
    }
    // GENDER
    if (publics.gender.length !== 2) {
      strPublics +=
        publics.gender[0] === PublicsGender.men
          ? this.translateService.instant("PUBLICS_GENDER_MEN")
          : this.translateService.instant("PUBLICS_GENDER_WOMEN");
      strPublics += ", ";
    }

    // AGE
    if (publics.age.min !== 0 || publics.age.max !== 99) {
      if (publics.age.min === 0 && publics.age.max === 18) {
        strPublics += this.translateService.instant("PUBLICS_AGE_MINORS") + "";
      } else if (publics.age.min === 18 && publics.age.max === 99) {
        strPublics += this.translateService.instant("PUBLICS_AGE_MAJORS") + "";
      } else if (publics.age.min !== 0 && publics.age.max === 99) {
        strPublics += this.translateService.instant("PUBLICS_AGE_FROM_XX", {
          min: publics.age.min,
        });
      } else if (publics.age.min === 0 && publics.age.max !== 99) {
        strPublics += this.translateService.instant("PUBLICS_AGE_TO_XX_MAX", {
          max: publics.age.max,
        });
      } else if (publics.age.min === publics.age.max) {
        strPublics += this.translateService.instant("PUBLICS_SPECIFIC_AGE", {
          age: publics.age.min,
        });
      } else {
        strPublics += this.translateService.instant("PUBLICS_AGE_RANGE", {
          min: publics.age.min,
          max: publics.age.max,
        });
      }
      strPublics += ", ";
    }

    // ADMINISTRATIVE

    if (
      ALL_PUBLICS.administrative.length - 1 !==
      publics.administrative.length
    ) {
      publics.administrative.forEach((adminPublic: string) => {
        strPublics +=
          this.translateService.instant(
            PUBLICS_LABELS.administrative[adminPublic]
          ) + ", ";
      });
    }

    if (ALL_PUBLICS.familialle.length - 1 !== publics.familialle.length) {
      publics.familialle.forEach((adminPublic: string) => {
        strPublics +=
          this.translateService.instant(
            PUBLICS_LABELS.familialle[adminPublic]
          ) + ", ";
      });
    }

    strPublics = strPublics.toLowerCase();

    // OTHER
    if (ALL_PUBLICS.other.length - 1 !== publics.other.length) {
      publics.other.forEach((otherPublic: string) => {
        if (otherPublic === PublicsOther.ukraine) {
          strPublics +=
            this.translateService
              .instant(PUBLICS_LABELS.other[otherPublic])
              .replace(
                this.translateService.instant(
                  PUBLICS_LABELS.other[otherPublic]
                )[0],
                this.translateService
                  .instant(PUBLICS_LABELS.other[otherPublic])[0]
                  .toLowerCase()
              ) + ", ";
        } else {
          strPublics +=
            this.translateService
              .instant(PUBLICS_LABELS.other[otherPublic])
              .toLowerCase() + ", ";
        }
      });
    }

    strPublics = strPublics.slice(0, -2) + ".";

    return strPublics;
  }
}
