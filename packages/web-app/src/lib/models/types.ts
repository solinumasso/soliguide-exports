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
import type {
  Categories,
  CountryCodes,
  PlaceClosedHolidays,
  PlaceOpeningStatus
} from '@soliguide/common';
import type { types as DSTypes } from '@soliguide/design-system';

export interface Phone {
  label: string | null;
  phoneNumber: string | null;
  countryCode: CountryCodes;
  isSpecialPhoneNumber: boolean;
}

// Search result types
export interface HoursRange {
  start: string;
  end: string;
}
export interface DaysRange {
  start: string;
  end?: string;
}
export interface TodayInfo {
  openingHours?: HoursRange[];
  closingDays?: DaysRange;
}
export interface BannerMessage {
  start: Date;
  end: Date | null;
  description: string | null;
  name: string | null;
}

export interface Source {
  label: string;
  licenseLabel: string;
  licenseLink: string;
}

export interface SearchResultItem {
  id: number;
  seoUrl: string;
  name: string;
  address: string;
  distance: number;
  services: Categories[];
  phones: Phone[];
  status: PlaceOpeningStatus;
  sources: Source[];
  banners: {
    message: BannerMessage | null;
    orientation: boolean;
    holidays: PlaceClosedHolidays;
  };
  todayInfo: TodayInfo;
}

export interface SearchResult {
  nbResults: number;
  places: SearchResultItem[];
}

// Work in progress fiche détaillée
export interface PlaceDetailsOpeningHours {
  monday?: HoursRange[];
  tuesday?: HoursRange[];
  wednesday?: HoursRange[];
  thursday?: HoursRange[];
  friday?: HoursRange[];
  saturday?: HoursRange[];
  sunday?: HoursRange[];
}

export enum PlaceDetailsInfoType {
  WELCOME_UNCONDITIONAL_CUSTOM = 'WELCOME_UNCONDITIONAL_CUSTOM',
  WELCOME_UNCONDITIONAL = 'WELCOME_UNCONDITIONAL',
  WELCOME_EXCLUSIVE = 'WELCOME_EXCLUSIVE',
  PUBLICS_MORE_INFO = 'PUBLICS_MORE_INFO',
  ACCESS_ORIENTATION = 'ACCESS_ORIENTATION',
  ACCESS_FREE = 'ACCESS_FREE',
  APPOINTMENT = 'APPOINTMENT',
  REGISTRATION = 'REGISTRATION',
  MODALITIES_MORE_INFO = 'MODALITIES_MORE_INFO',
  PRICE = 'PRICE',
  PMR = 'PMR',
  ANIMALS = 'ANIMALS',
  LANGUAGES_SPOKEN = 'LANGUAGES_SPOKEN'
}

export interface Tag {
  value: string;
  variant: DSTypes.TagVariant;
}

export interface TranslatableElement {
  key: string;
  params?: Record<string, string>;
}

export interface PlaceDetailsInfo {
  type: PlaceDetailsInfoType;
  description: TranslatableElement[];
  tags: Tag[];
}

export interface Saturation {
  tag: Tag;
  precisions?: string;
}

export interface Service {
  category: Categories;
  description: string;
  hours?: PlaceDetailsOpeningHours;
  info: PlaceDetailsInfo[];
  saturation?: Saturation;
}

export interface PlaceDetails {
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
}

export interface SearchLocationParams {
  geoType: string;
  coordinates: number[];
  distance: number;
}
