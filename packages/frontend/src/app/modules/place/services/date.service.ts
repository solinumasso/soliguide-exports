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

import { capitalize } from "@soliguide/common";

import { differenceInCalendarDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

@Injectable({
  providedIn: "root",
})
export class DateService {
  constructor(private readonly translateService: TranslateService) {}

  public translateDateInterval(
    givenStartDate: Date | string | null,
    givenEndDate: Date | string | null
  ): string {
    let translatedMessage = "";

    if (!givenStartDate) {
      return "";
    }

    if (typeof givenStartDate === "string") {
      givenStartDate = new Date(givenStartDate);
    }

    givenStartDate.setUTCHours(0, 0, 0);

    const startDate = formatInTimeZone(givenStartDate, "Etc/GMT", "dd/MM/yyyy");

    if (!givenEndDate) {
      const word =
        differenceInCalendarDays(givenStartDate, new Date()) <= -1
          ? "DATE_INTERVAL_FROM_PAST"
          : "DATE_INTERVAL_FROM_FUTURE";

      translatedMessage = this.translateService.instant(word, {
        startDate,
      });

      return capitalize(translatedMessage);
    }

    if (typeof givenEndDate === "string") {
      givenEndDate = new Date(givenEndDate);
    }

    givenEndDate.setUTCHours(23, 59, 59);

    const endDate = formatInTimeZone(givenEndDate, "Etc/GMT", "dd/MM/yyyy");

    if (differenceInCalendarDays(givenStartDate, givenEndDate) !== -1) {
      translatedMessage = this.translateService.instant(
        "DATE_INTERVAL_FROM_TO",
        {
          endDate,
          startDate,
        }
      );

      return capitalize(translatedMessage);
    }

    translatedMessage = this.translateService.instant("DATE_INTERVAL_THE_DAY", {
      startDate,
    });

    return capitalize(translatedMessage);
  }
}
