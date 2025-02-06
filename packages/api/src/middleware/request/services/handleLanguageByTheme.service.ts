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
import { SupportedLanguagesCode, Themes } from "@soliguide/common";

const THEME_LANGUAGE_MAPPINGS: Record<Themes, SupportedLanguagesCode> = {
  [Themes.SOLIGUIA_AD]: SupportedLanguagesCode.CA,
  [Themes.SOLIGUIA_ES]: SupportedLanguagesCode.CA,
  [Themes.SOLIGUIDE_FR]: SupportedLanguagesCode.FR,
} as const;

export const handleLanguageByTheme = (
  theme: Themes | null
): SupportedLanguagesCode | undefined => {
  return theme && Object.keys(THEME_LANGUAGE_MAPPINGS).includes(theme)
    ? THEME_LANGUAGE_MAPPINGS[theme]
    : undefined;
};
