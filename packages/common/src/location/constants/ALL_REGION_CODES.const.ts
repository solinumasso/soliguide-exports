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
export const FR_REGION_CODES = [
  "01",
  "02",
  "03",
  "04",
  "06",
  "11",
  "24",
  "27",
  "28",
  "32",
  "44",
  "75",
  "76",
  "84",
  "93",
  "52",
  "53",
  "94",
  "PO",
  "NC",
  "SB",
  "SM",
  "SP",
  "WF",
  "TF",
] as const;

export const ES_REGION_CODES = [
  "02",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "01",
  "03",
  "10",
  "13",
  "14",
  "15",
  "18",
  "11",
  "12",
  "16",
  "17",
  "19",
] as const;

export const AD_REGION_CODES = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
] as const;

export const ALL_REGION_CODES = [
  ...FR_REGION_CODES,
  ...ES_REGION_CODES,
  ...AD_REGION_CODES,
] as const;
