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
// Helpers related to languages
import { SUPPORTED_LANGUAGES, type SupportedLanguagesCode } from '@soliguide/common';

import { getStorageItem, setStorageItem } from './storage';

const STORAGE_KEY_LANGUAGE_CHOOSEN = 'lngSet';
const STORAGE_KEY_CURRENT_LANGUAGE = 'i18nextLng';

/**
 * lang is among supported languages
 */
export const isLangValid = (lang: string | SupportedLanguagesCode): boolean => {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguagesCode);
};

// Lang has been choosen
export const isLanguageSelected = (): boolean => {
  return !!getStorageItem(STORAGE_KEY_LANGUAGE_CHOOSEN);
};

export const markLanguageAsSelected = (): void => {
  setStorageItem(STORAGE_KEY_LANGUAGE_CHOOSEN, '1');
};

export const getCurrentLangInStorage = (): string => {
  return String(getStorageItem(STORAGE_KEY_CURRENT_LANGUAGE));
};
