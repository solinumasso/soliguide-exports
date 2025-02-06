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
import { SearchPublics, SearchModalities, SearchFilterUpdatedAt } from ".";

import { AdminSearchFilterOrganization, SearchFilterClosure } from "../enums";

import {
  CampaignPlaceAutonomy,
  CampaignSource,
  CampaignStatusForSearch,
} from "../../campaign";
import {
  AnyDepartmentCode,
  GeoPosition,
  SoliguideCountries,
} from "../../location";
import { PlaceType, SearchPlaceStatus, PlaceVisibility } from "../../place";
import { SupportedLanguagesCode } from "../../translations";
import { Categories } from "../../categories";

export interface PlaceSearchForAdmin {
  category?: Categories | null;
  categories?: Categories[];
  label?: string | null;
  word?: string | null;
  openToday?: boolean;
  location: GeoPosition;
  locations?: GeoPosition[];
  publics?: SearchPublics;
  modalities?: SearchModalities;
  languages: SupportedLanguagesCode | null;
  autonomy: CampaignPlaceAutonomy[];
  campaignStatus: CampaignStatusForSearch | null;
  catToExclude: Categories[];
  lieu_id: number | null;
  organization: AdminSearchFilterOrganization | null;
  placeType: PlaceType;
  priority: boolean | null;
  sourceMaj: CampaignSource[];
  status?: SearchPlaceStatus | null;
  toCampaignUpdate: boolean;
  visibility?: PlaceVisibility | null;
  updatedAt?: SearchFilterUpdatedAt | null;
  updatedByUserAt?: SearchFilterUpdatedAt | null;
  close?: SearchFilterClosure | null;
  // TODO: create a common interface for "ManageSearch" properties, which are shared by different search classes
  country: SoliguideCountries;
  territories: AnyDepartmentCode[];
}
