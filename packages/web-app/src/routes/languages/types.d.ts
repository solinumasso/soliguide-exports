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
import { Writable } from 'svelte/store';
import { SupportedLanguagesCode } from '@soliguide/common';
import type { PosthogProperties } from '$lib/services/types';

// flag should be of type `import('svelte').SvelteComponent`
// but it uses the deprecated type `SvelteComponentType`
export type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
  flag: any;
};

export type PageState = {
  availableLanguages: LanguageOption[];
  selectedLanguage: SupportedLanguagesCode | null;
  canSubmit: boolean;
};

export type LanguagePageController = {
  subscribe: Writable<PageState>['subscribe'];
  init(
    supportedLanguages: AllSupportedLanguagesCode[],
    defaultLanguage: AllSupportedLanguagesCode
  ): void;
  changeSelection(lang: AllSupportedLanguagesCode): void;
  captureEvent(eventName: string, properties?: PosthogProperties): void;
};
