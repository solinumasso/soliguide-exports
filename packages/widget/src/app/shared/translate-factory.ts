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
import { TranslateService } from "@ngx-translate/core";

import { BOTS_LIST } from "./constants";

import { SUPPORTED_LANGUAGES, SupportedLanguagesCode } from "@soliguide/common";

export const translateFactory = (
  translateService: TranslateService
): unknown => {
  return async () => {
    const languages = SUPPORTED_LANGUAGES;

    let selectedLanguage =
      languages.indexOf(
        navigator.language.substring(0, 2) as SupportedLanguagesCode
      ) !== -1
        ? navigator.language.substring(0, 2)
        : SupportedLanguagesCode.FR;

    const robots = new RegExp(BOTS_LIST.join("|"), "i");

    if (robots.test(window.navigator.userAgent)) {
      selectedLanguage = SupportedLanguagesCode.FR;
    }

    translateService.setDefaultLang(selectedLanguage);
    translateService.use(selectedLanguage);

    return new Promise<void>((resolve) => {
      translateService.onLangChange.subscribe(() => {
        resolve();
      });
    });
  };
};
