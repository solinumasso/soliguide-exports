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
import { differenceInCalendarDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import type { i18n } from "i18next";

import { capitalize } from "../../general";
import { SupportedLanguagesCode } from "../enums";

export const translateDateInterval = (
  i18next: i18n,
  lng: SupportedLanguagesCode,
  givenStartDate: Date | string | null,
  givenEndDate: Date | string | null
): string => {
  let translatedMessage = "";
  if (!givenStartDate) {
    return "";
  }

  if (typeof givenStartDate === "string") {
    givenStartDate = new Date(givenStartDate);
  }

  const startDate = formatInTimeZone(givenStartDate, "Etc/GMT", "dd/MM/yyyy");

  if (!givenEndDate) {
    const word =
      differenceInCalendarDays(givenStartDate, new Date()) <= 0
        ? "DATE_INTERVAL_FROM_PAST"
        : "DATE_INTERVAL_FROM_FUTURE";

    translatedMessage = i18next.t(word, {
      interpolation: { escapeValue: false },
      lng,
      replace: {
        startDate,
      },
    });
    return capitalize(translatedMessage);
  }

  if (typeof givenEndDate === "string") {
    givenEndDate = new Date(givenEndDate);
  }

  // Mongo saves dates in UTC. New Date() and "format" return date in local timezone (Europe/Paris) +02 or +01
  const endDate = formatInTimeZone(givenEndDate, "Etc/GMT", "dd/MM/yyyy");

  if (differenceInCalendarDays(givenStartDate, givenEndDate) !== 0) {
    translatedMessage = i18next.t("DATE_INTERVAL_FROM_TO", {
      interpolation: { escapeValue: false },
      lng,
      replace: {
        endDate,
        startDate,
      },
    });

    return capitalize(translatedMessage);
  }

  translatedMessage = i18next.t("DATE_INTERVAL_THE_DAY", {
    interpolation: { escapeValue: false },
    lng,
    replace: {
      startDate,
    },
  });

  return capitalize(translatedMessage);
};
