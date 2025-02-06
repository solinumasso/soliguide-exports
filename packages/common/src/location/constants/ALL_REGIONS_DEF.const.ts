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
import { SoliguideCountries } from "../enums";
import { RegionDef } from "../interfaces";
import { AD_REGIONS_DEF } from "./AD";
import { ES_REGIONS_DEF } from "./ES/ES_REGIONS_DEF.const";
import { FR_REGIONS_DEF } from "./FR/FR_REGIONS_DEF.const";

export const ALL_REGIONS_DEF: {
  [key in SoliguideCountries]: Array<RegionDef<SoliguideCountries>>;
} = {
  fr: FR_REGIONS_DEF,
  es: ES_REGIONS_DEF,
  ad: AD_REGIONS_DEF,
};
