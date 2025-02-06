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
import type { DayName } from "../types";

/* eslint-disable */
// The linter is disabled to avoid sorting days in the wrong order
export const DAYS: {
  [key in DayName]: string;
} = {
  monday: "LUNDI",
  tuesday: "MARDI",
  wednesday: "MERCREDI",
  thursday: "JEUDI",
  friday: "VENDREDI",
  saturday: "SAMEDI",
  sunday: "DIMANCHE",
};

export const WEEK_DAYS: DayName[] = Object.keys(DAYS) as DayName[];

export const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
