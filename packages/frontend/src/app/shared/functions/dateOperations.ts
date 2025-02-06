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
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatEn } from "../bootstrap-util";

export const convertNgbDateToDate = (
  dateToConvert: NgbDateStruct | null,
  dateToCompare: NgbDateStruct | null,
  compareToWhich: "start" | "end"
): Date | null => {
  const dateToConvertString = dateToConvert ? formatEn(dateToConvert) : "";
  const dateToCompareString = dateToCompare ? formatEn(dateToCompare) : "";

  if (
    /^\d{4}-\d{2}-\d{2}$/.test(dateToConvertString) &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateToCompareString)
  ) {
    if (dateToConvertString === dateToCompareString) {
      return compareToWhich === "end"
        ? new Date(dateToConvertString)
        : new Date(`${dateToConvertString}T23:59:59`);
    }
    return new Date(dateToConvertString);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateToConvertString)) {
    return new Date(dateToConvertString);
  }

  return null;
};
