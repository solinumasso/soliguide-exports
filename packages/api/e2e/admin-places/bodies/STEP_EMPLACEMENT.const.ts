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
import { CommonPlacePosition, CountryCodes } from "@soliguide/common";

export const STEP_EMPLACEMENT_POSITION_OK: Partial<CommonPlacePosition> = {
  address: "27 Rue Saint-Martin, 75004 Paris, France ",
  postalCode: "75004",
  additionalInformation: "Au coin du feu",
  department: "Paris",
  departmentCode: "75",
  location: { coordinates: [2.3499646, 48.85899020000001], type: "Point" },
  pays: CountryCodes.FR,
  country: CountryCodes.FR,
  region: "Île-de-France",
  regionCode: "11",
  city: "Paris",
  timeZone: "Europe/Paris",
};
