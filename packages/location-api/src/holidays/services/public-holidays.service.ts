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

import { Injectable, OnModuleInit } from "@nestjs/common";
import { isWithinInterval, parseISO } from "date-fns";

import {
  getDepartmentCodeFromPostalCode,
  type SoliguideCountries,
  PublicHoliday,
  AllPublicHolidays,
} from "@soliguide/common";
import { GenerateHolidaysService } from "./generate-holidays.service";

@Injectable()
export class PublicHolidaysService implements OnModuleInit {
  private publicHolidays: AllPublicHolidays = {};

  constructor(
    private readonly generateHolidaysService: GenerateHolidaysService
  ) {}

  async onModuleInit() {
    this.publicHolidays = await this.generateHolidaysService.readHolidaysFile();
  }

  public getPublicHolidaysByDate = (
    country: SoliguideCountries,
    date: Date,
    postalCode?: string
  ): PublicHoliday[] => {
    const countryPublicHolidays = this.publicHolidays[country];

    const holidaysInDateRange = countryPublicHolidays.filter((holiday) =>
      isWithinInterval(date, {
        start: parseISO(holiday.startDate),
        end: parseISO(holiday.endDate),
      })
    );

    if (holidaysInDateRange.length === 0) {
      return [];
    }

    if (postalCode?.length) {
      // Postal Code not set: we keep only national holidays
      const departmentCode = getDepartmentCodeFromPostalCode(
        country,
        postalCode
      );
      if (!departmentCode) {
        throw new Error("PostalCode error");
      }

      return holidaysInDateRange.filter(
        (holiday) =>
          holiday.isNational || holiday.departments.includes(departmentCode)
      );
    }

    return holidaysInDateRange;
  };
}
