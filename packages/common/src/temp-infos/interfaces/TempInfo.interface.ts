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
import type { CommonOpeningHours } from "../../hours";
import type { ApiPlace } from "../../place";
import type { TempInfoStatus, TempInfoType } from "../enums";

export interface TempInfo {
  _id: string;

  // Temporary information's properties
  actif: boolean;
  dateDebut: Date;
  dateFin: Date | null;
  description: string | null;
  hours?: CommonOpeningHours;
  isCampaign: boolean;
  name: string | null;
  nbDays?: number;
  status: TempInfoStatus;
  tempInfoType: TempInfoType;
  createdAt: Date;
  updatedAt: Date;

  // Place linked to this temporary information
  place: ApiPlace;
  placeId: number;
  serviceObjectId?: string;
}
