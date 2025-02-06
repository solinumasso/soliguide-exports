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
import { OpeningHoursContext, PlaceClosedHolidays } from "../enums";
import { CommonDayOpeningHours } from "./CommonDayOpeningHours.class";

export class CommonOpeningHours {
  public monday: CommonDayOpeningHours;
  public tuesday: CommonDayOpeningHours;
  public wednesday: CommonDayOpeningHours;
  public thursday: CommonDayOpeningHours;
  public friday: CommonDayOpeningHours;
  public saturday: CommonDayOpeningHours;
  public sunday: CommonDayOpeningHours;
  public closedHolidays: PlaceClosedHolidays;
  public description: string | null;

  constructor(
    openingHours?: Partial<CommonOpeningHours>,
    context?: OpeningHoursContext
  ) {
    this.monday = new CommonDayOpeningHours(openingHours?.monday, context);
    this.tuesday = new CommonDayOpeningHours(openingHours?.tuesday, context);
    this.wednesday = new CommonDayOpeningHours(
      openingHours?.wednesday,
      context
    );
    this.thursday = new CommonDayOpeningHours(openingHours?.thursday, context);
    this.friday = new CommonDayOpeningHours(openingHours?.friday, context);
    this.saturday = new CommonDayOpeningHours(openingHours?.saturday, context);
    this.sunday = new CommonDayOpeningHours(openingHours?.sunday, context);

    this.description = openingHours?.description ?? "";
    this.closedHolidays =
      openingHours?.closedHolidays ?? PlaceClosedHolidays.UNKNOWN;
  }
}
