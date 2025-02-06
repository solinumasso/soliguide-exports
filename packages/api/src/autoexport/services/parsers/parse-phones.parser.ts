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
import {
  SupportedLanguagesCode,
  CountryCodes,
  Phone,
  parsePhoneNumber,
} from "@soliguide/common";

import i18next from "i18next";

export const parsePhones = (
  language: SupportedLanguagesCode,
  phones?: Phone[]
): string => {
  if (!phones?.length) {
    return i18next.t("EXPORTS_NO_PHONE", { lng: language });
  }

  let phonesString = "";

  for (let i = 0; i < phones.length; i++) {
    const label = phones[i]?.label;
    if (label) {
      phonesString += `${label.trim()}: `;
    }

    if (phones[i].phoneNumber) {
      phonesString += parsePhoneNumber(phones[i], CountryCodes.FR);
    }

    if (i + 1 < phones.length) {
      phonesString += "\n";
    }
  }
  return phonesString.trim();
};
