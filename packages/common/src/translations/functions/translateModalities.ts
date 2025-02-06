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
import { decode } from "html-entities";

import type { i18n } from "i18next";

import striptags from "striptags";

import { capitalize } from "../../general";
import type { Modalities } from "../../modalities";
import { SupportedLanguagesCode } from "../enums";

export const translateModalities = (
  i18next: i18n,
  lng: SupportedLanguagesCode,
  modalities: Modalities,
  stripTags = true
): string => {
  let stringModalities = "";

  if (!modalities.inconditionnel) {
    if (modalities.appointment.checked) {
      stringModalities += i18next.t("ACCESS_CONDITION_ON_APPOINTMENT", { lng });

      if (modalities.appointment.precisions) {
        stringModalities += ": " + modalities.appointment.precisions;
      }
      stringModalities += "\n";
    }

    if (modalities.inscription.checked) {
      stringModalities += i18next.t("ACCESS_CONDITION_ON_REGISTRATION", {
        lng,
      });

      if (modalities.inscription.precisions) {
        stringModalities += ": " + modalities.inscription.precisions;
      }
      stringModalities += "\n";
    }

    if (modalities.orientation.checked) {
      stringModalities += i18next.t("ACCESS_CONDITION_ON_ORIENTATION", { lng });

      if (modalities.orientation.precisions) {
        stringModalities += ": " + modalities.orientation.precisions;
      }
      stringModalities += "\n";
    }
  }

  if (modalities.price?.checked) {
    stringModalities += i18next.t(
      "ACCESS_CONDITION_FINANCIAL_PARTICIPATION_REQUIRED",
      { lng }
    );

    if (modalities.price.precisions) {
      stringModalities += ": " + modalities.price.precisions;
    }
    stringModalities += "\n";
  }

  if (modalities.animal?.checked) {
    stringModalities +=
      i18next.t("ACCESS_CONDITION_ACCEPTED_ANIMALS", { lng }) + "\n";
  }

  if (modalities.pmr?.checked) {
    stringModalities +=
      i18next.t("ACCESS_CONDITION_PEOPLE_WITH_REDUCED_MOBILITY", { lng }) +
      "\n";
  }

  if (modalities.other) {
    let other = decode(modalities.other, { level: "html5" });

    if (stripTags) {
      other = striptags(other);
    }

    stringModalities +=
      i18next.t("ACCESS_CONDITION_OTHER_PRECISIONS", { lng }) + `: ${other}\n`;
  }

  return capitalize(stringModalities.slice(0, -1));
};
