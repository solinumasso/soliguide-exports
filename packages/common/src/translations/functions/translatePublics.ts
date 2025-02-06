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
import type { i18n } from "i18next";
import { capitalize } from "../../general";

import {
  ALL_PUBLICS,
  PUBLICS_LABELS,
  Publics,
  PublicsAdministrative,
  PublicsFamily,
  PublicsOther,
} from "../../publics";
import { SupportedLanguagesCode } from "../enums";

export const translatePublics = (
  i18next: i18n,
  lng: SupportedLanguagesCode,
  publics?: Publics,
  stripTags = true
): string => {
  let strPublics = "";

  if (!publics || publics.accueil === 0) {
    strPublics = i18next.t("PUBLICS_WELCOME_UNCONDITIONAL", { lng });
    if (stripTags) {
      strPublics = strPublics.replace(/<[^>]*>?/gm, "");
    }
    return strPublics;
  }

  if (publics.accueil === 2) {
    strPublics += `${i18next.t("PUBLICS_WELCOME_EXCLUSIVE", { lng })}: `;
  }

  if (publics.accueil === 1) {
    strPublics += `${i18next.t("PUBLICS_WELCOME_PREFERENTIAL", { lng })} `;
  }

  // GENDER
  if (publics.gender.length !== 2) {
    strPublics +=
      publics.gender[0] === "men"
        ? i18next.t("PUBLICS_GENDER_MEN", { lng })
        : i18next.t("PUBLICS_GENDER_WOMEN", { lng });
    strPublics += ", ";
  }

  // AGE
  if (publics.age.min !== 0 || publics.age.max !== 99) {
    if (publics.age.min === 0 && publics.age.max === 18) {
      strPublics += i18next.t("PUBLICS_AGE_MINORS", { lng }) + "";
    } else if (publics.age.min === 18 && publics.age.max === 99) {
      strPublics += i18next.t("PUBLICS_AGE_MAJORS", { lng }) + "";
    } else if (publics.age.min !== 0 && publics.age.max === 99) {
      strPublics += i18next.t("PUBLICS_AGE_FROM_XX", {
        lng,
        replace: {
          min: publics.age.min,
        },
      });
    } else if (publics.age.min === 0 && publics.age.max !== 99) {
      strPublics += i18next.t("PUBLICS_AGE_TO_XX_MAX", {
        lng,
        replace: {
          max: publics.age.max,
        },
      });
    } else if (publics.age.min === publics.age.max) {
      strPublics += i18next.t("PUBLICS_SPECIFIC_AGE", {
        lng,
        replace: {
          age: publics.age.min,
        },
      });
    } else {
      strPublics += i18next.t("PUBLICS_AGE_RANGE", {
        lng,
        replace: {
          max: publics.age.max,
          min: publics.age.min,
        },
      });
    }
    strPublics += ", ";
  }

  // ADMINISTRATIVE
  if (ALL_PUBLICS.administrative.length - 1 !== publics.administrative.length) {
    publics.administrative.forEach((adminPublic: PublicsAdministrative) => {
      strPublics +=
        i18next.t(PUBLICS_LABELS.administrative[adminPublic], { lng }) + ", ";
    });
  }

  if (ALL_PUBLICS.familialle.length - 1 !== publics.familialle.length) {
    publics.familialle.forEach((family: PublicsFamily) => {
      strPublics +=
        i18next.t(PUBLICS_LABELS.familialle[family], { lng }) + ", ";
    });
  }

  strPublics = strPublics.toLowerCase();

  if (
    publics.other.length &&
    ALL_PUBLICS.other.length - 1 !== publics.other.length
  ) {
    publics.other.forEach((otherPublic: PublicsOther) => {
      strPublics +=
        i18next.t(PUBLICS_LABELS.other[otherPublic], { lng }).toLowerCase() +
        ", ";
    });
  }

  if (publics.description) {
    strPublics = strPublics.slice(0, -2) + ".\n";
    strPublics += i18next.t("INFO_IMPORTANTE", { lng });
    strPublics += " " + publics.description + "\n";
  }

  if (stripTags) {
    strPublics = strPublics.replace(/<[^>]*>?/gm, "");
  }

  if (!publics.description) {
    strPublics = strPublics.slice(0, -2) + ".";
  }

  return capitalize(strPublics).trim();
};
