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
export const FR_TIMEZONES = [
  "America/Martinique",
  "America/Cayenne",
  "Indian/Reunion",
  "Indian/Mayotte",
  "Europe/Paris",
  "Pacific/Noumea",
  "Pacific/Tahiti",
  "Pacific/Wallis",
  "America/Miquelon",
  "Indian/Maldives",
] as const;

export const ES_TIMEZONES = [
  "Africa/Ceuta", // UTC +01:00
  "Atlantic/Canary", // UTC
  "Europe/Madrid", // UTC +01:00
] as const;

export const AD_TIMEZONES = ["Europe/Andorra"] as const;

export const ALL_TIMEZONES = [
  ...FR_TIMEZONES,
  ...ES_TIMEZONES,
  ...AD_TIMEZONES,
] as const;
