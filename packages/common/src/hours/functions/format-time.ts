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
const formatTimeSlot = (
  time: number,
  separator: string,
  prefix = ""
): string => {
  if (time === null || isNaN(time)) {
    return "";
  }
  const hour = time.toString();
  if (time === 0) {
    return `00${separator}00`;
  } else if (time < 100) {
    return `00${separator}${hour}`;
  } else if (time >= 100 && time < 1000) {
    return prefix + hour.substring(0, 1) + separator + hour.substring(1, 3);
  }
  return hour.substring(0, 2) + separator + hour.substring(2, 4);
};

export const formatStringTime = (time: string | number): number => {
  return parseInt(time.toString().replace(/:|h/, ""), 10);
};

export const formatTimeSlotForAdmin = (time: number): string => {
  return formatTimeSlot(time, ":", "0");
};

export const formatTimeSlotForPublic = (time: number): string => {
  return formatTimeSlot(time, "h");
};
