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

export const FR_BOROUGHS_CITY_CODES: string[] = ["69123", "75056", "13055"];

export const FR_BOROUGHS_LYON: string[] = [
  // Lyon
  "69001",
  "69002",
  "69003",
  "69004",
  "69005",
  "69006",
  "69007",
  "69008",
  "69009",
];

export const FR_BOROUGHS_PARIS = [
  // Paris
  "75001",
  "75002",
  "75003",
  "75004",
  "75005",
  "75006",
  "75007",
  "75008",
  "75009",
  "75010",
  "75011",
  "75012",
  "75013",
  "75014",
  "75015",
  "75016",
  "75116",
  "75017",
  "75018",
  "75019",
  "75020",
];

export const FR_BOROUGHS_MARSEILLE = [
  // Marseille
  "13001",
  "13002",
  "13003",
  "13004",
  "13005",
  "13006",
  "13007",
  "13008",
  "13009",
  "13010",
  "13011",
  "13012",
  "13013",
  "13014",
  "13015",
  "13016",
];

export const FR_BOROUGHS: string[] = FR_BOROUGHS_LYON.concat(
  FR_BOROUGHS_PARIS,
  FR_BOROUGHS_MARSEILLE
);
