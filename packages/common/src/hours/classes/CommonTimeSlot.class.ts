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
import { OpeningHoursContext } from "../enums";
import {
  formatStringTime,
  formatTimeSlotForAdmin,
  formatTimeSlotForPublic,
} from "../functions";

export class CommonTimeslot {
  public end: number | string;
  public start: number | string;

  constructor(timeSlot: CommonTimeslot, context?: OpeningHoursContext) {
    // Convert text to integer values
    if (!context || context === OpeningHoursContext.API) {
      this.start = formatStringTime(timeSlot.start);
      this.end = formatStringTime(timeSlot.end);
    } else if (
      (context === OpeningHoursContext.ADMIN ||
        context === OpeningHoursContext.PUBLIC) &&
      typeof timeSlot.end === "number" &&
      typeof timeSlot.start === "number"
    ) {
      this.end =
        context === OpeningHoursContext.ADMIN
          ? formatTimeSlotForAdmin(timeSlot.end)
          : formatTimeSlotForPublic(timeSlot.end);
      this.start =
        context === OpeningHoursContext.ADMIN
          ? formatTimeSlotForAdmin(timeSlot.start)
          : formatTimeSlotForPublic(timeSlot.start);
    } else {
      this.end = 0;
      this.start = 0;
    }
  }
}
