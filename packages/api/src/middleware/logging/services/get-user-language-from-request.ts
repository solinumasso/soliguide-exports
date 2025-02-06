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
import { ExpressRequest } from "../../../_models";
import { SUPPORTED_LANGUAGES, SupportedLanguagesCode } from "@soliguide/common";

export const getUserLanguageFromRequest = (
  req: ExpressRequest
): SupportedLanguagesCode => {
  const lang = req.params.lang;
  if (lang) {
    const cleanedLanguage = lang.trim().toLowerCase();
    if (
      SUPPORTED_LANGUAGES.includes(
        cleanedLanguage as unknown as SupportedLanguagesCode
      )
    ) {
      return cleanedLanguage as unknown as SupportedLanguagesCode;
    } else {
      throw new Error("Language not supported");
    }
  }
  return SupportedLanguagesCode.FR;
};
