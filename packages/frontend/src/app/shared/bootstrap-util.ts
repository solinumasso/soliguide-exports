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

export const toInteger = (value: string): number => {
  return parseInt(`${value}`, 10);
};

export const toString = (value?: string): string => {
  return value != null ? `${value}` : ""; // !null and !undefined
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): boolean => {
  return !isNaN(toInteger(value));
};

export const padNumber = (value: number): string => {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  }
  return "";
};

export const formatDateToNgb = (date: Date): NgbDateStruct | null => {
  if (date === null) {
    return null;
  }
  if (typeof date === "string") {
    date = new Date(date);
  }
  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  };
};

export const parseDateFromNgb = (ngbDate: NgbDateStruct): Date | null => {
  if (ngbDate === null) {
    return null;
  }

  return new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
};

export const addHttp = (url: string): string => {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  return url;
};

export const formatEn = (date: NgbDateStruct): string => {
  return `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ""}-${
    isNumber(date.day) ? padNumber(date.day) : ""
  }`;
};
