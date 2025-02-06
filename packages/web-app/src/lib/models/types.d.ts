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
import { z } from 'zod';
import { Categories, PlaceClosedHolidays, PlaceOpeningStatus } from '@soliguide/common';
import { types } from '@soliguide/design-system';
import { LocationSuggestionSchema } from './locationSuggestion';
import { placeDetailsInfoType, type TranslatableElement } from './placeDetails';
import { types } from '@soliguide/design-system';

export type LocationSuggestion = z.infer<typeof LocationSuggestionSchema>;

export type CategorySuggestion = Categories;

export type Phone = {
  label: string | null;
  phoneNumber: string | null;
  countryCode: CountryCodes;
  isSpecialPhoneNumber: boolean;
};

// Search result types
export type HoursRange = {
  start: string;
  end: string;
};
export type DaysRange = {
  start: string;
  end?: string;
};
export type TodayInfo = { openingHours?: HoursRange[]; closingDays?: DaysRange };
export type BannerMessage = {
  start: Date;
  end: Date | null;
  description: string | null;
  name: string | null;
};

export type SearchResultItem = {
  id: number;
  seoUrl: string;
  name: string;
  address: string;
  distance: number;
  services: Categories[];
  phones: Phone[];
  status: PlaceOpeningStatus;
  source?: string;
  banners: {
    message: BannerMessage | null;
    orientation: boolean;
    holidays: PlaceClosedHolidays;
  };
  todayInfo: TodayInfo;
};

export type SearchResult = {
  nbResults: number;
  places: SearchResultItem[];
};

// Work in progress fiche détaillée
export type PlaceDetailsOpeningHours = {
  monday?: HoursRange[];
  tuesday?: HoursRange[];
  wednesday?: HoursRange[];
  thursday?: HoursRange[];
  friday?: HoursRange[];
  saturday?: HoursRange[];
  sunday?: HoursRange[];
};

export type PlaceDetailsInfoType = (typeof placeDetailsInfoType)[keyof typeof placeDetailsInfoType];

export type Tag = {
  value: string;
  variant: types.TagVariant;
};

export type TranslatableElement = {
  key: string;
  params?: Record<string, string>;
};

export type PlaceDetailsInfo = {
  type: PlaceDetailsInfoType;
  description: TranslatableElement[];
  tags: Tag[];
};

export type PlaceDetails = {
  id: number;
  address: string;
  description: string;
  email: string;
  facebook: string;
  fax: string;
  hours: PlaceDetailsOpeningHours;
  info: PlaceDetailsInfo[];
  instagram: string;
  lastUpdate: string;
  name: string;
  onOrientation: boolean;
  phones: Phone[];
  services: Service[];
  status: PlaceOpeningStatus;
  todayInfo: TodayInfo;
  website: string;
};

export type Saturation = { tag: Tag; precisions?: string };

export type Service = {
  category: Categories;
  description: string;
  hours?: PlaceDetailsOpeningHours;
  info: PlaceDetailsInfo[];
  saturation?: Saturation;
};
