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

import type { PlaceType, PlaceStatus, PlaceVisibility } from "../enums";
import type {
  CommonNewPlaceService,
  CommonPlaceEntity,
  CommonPlacePosition,
  CommonPlaceSource,
} from "../classes";

import type { CommonPlaceParcours } from "./CommonPlaceParcours.interface";
import type { SoliguideCountries } from "../../location";
import { Modalities } from "../../modalities";
import { Publics } from "../../publics";
import { CommonOpeningHours } from "../../hours";
import { SupportedLanguagesCode } from "../../translations";
import { PlaceStepsDone } from "./PlaceStepsDone.interface";
import { PlaceSlugs } from "./PlaceSlugs.interface";

export interface ApiPlace {
  _id?: string;
  lieu_id: number;
  seo_url: string;

  auto: boolean;
  name: string;
  description: string | null;

  status: PlaceStatus;
  visibility: PlaceVisibility;
  isOpenToday: boolean;

  photos: any[];
  organizations: any[];
  placeType: PlaceType;
  services_all: CommonNewPlaceService[];
  position: CommonPlacePosition;
  parcours: CommonPlaceParcours[];
  entity: CommonPlaceEntity;

  newhours: CommonOpeningHours;
  modalities: Modalities;
  publics: Publics;
  sourceLanguage: SupportedLanguagesCode;
  country: SoliguideCountries;
  languages: string[];

  createdAt: Date | string;
  updatedAt: Date | string;
  updatedByUserAt: Date | string;
  createdBy: string | null;

  stepsDone: PlaceStepsDone;

  tempInfos: any;

  sources?: CommonPlaceSource[];

  campaigns?: any;

  priority?: boolean;

  slugs?: PlaceSlugs;
  distance?: number;
}
