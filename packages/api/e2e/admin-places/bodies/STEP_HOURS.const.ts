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
import { PlaceClosedHolidays } from "@soliguide/common";

export const HOURS_OK = {
  newhours: {
    closedHolidays: PlaceClosedHolidays.UNKNOWN,
    description: "Les horaires sont sympas",
    friday: {
      open: true,
      show: false,
      timeslot: [
        { end: "12:30", start: "08:00" },
        { end: "16:30", start: "14:00" },
      ],
    },
    h24: false,
    monday: {
      open: true,
      show: false,
      timeslot: [
        { end: "12:30", start: "08:00" },
        { end: "16:30", start: "14:00" },
      ],
    },
    saturday: { open: false, show: false, timeslot: [] },
    sunday: {
      open: true,
      show: false,
      timeslot: [
        { end: "12:30", start: "09:00" },
        { end: "16:30", start: "14:00" },
      ],
    },
    thursday: {
      open: true,
      show: false,
      timeslot: [
        { end: "12:30", start: "08:00" },
        { end: "05:00", start: "23:00" },
        { end: "16:30", start: "14:00" },
      ],
    },
    tuesday: {
      open: true,
      show: false,
      timeslot: [
        { end: "12:30", start: "08:00" },
        { end: "16:30", start: "14:00" },
      ],
    },
    wednesday: {
      open: true,
      show: false,
      timeslot: [
        { end: "12:30", start: "08:00" },
        { end: "16:30", start: "14:00" },
      ],
    },
  },
};
