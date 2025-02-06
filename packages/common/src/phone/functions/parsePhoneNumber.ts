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
import { CountryCodes } from "../../location";
import { Phone } from "../interfaces";

import libPhoneNumber from "google-libphonenumber";
const { PhoneNumberFormat, PhoneNumberUtil } = libPhoneNumber;

export const phoneUtil = PhoneNumberUtil.getInstance();

export const parsePhoneNumber = (
  phone: Phone,
  currentCountry: CountryCodes
): string | null => {
  if (phone?.isSpecialPhoneNumber) {
    return phone?.phoneNumber;
  }

  if (!phone?.phoneNumber) {
    return null;
  }

  try {
    const phoneNumber = phoneUtil.parse(
      phone.phoneNumber,
      phone.countryCode.toLowerCase()
    );
    if (!phoneUtil.isValidNumber(phoneNumber) || !phoneNumber) {
      return null;
    }

    const format =
      phone.countryCode !== currentCountry
        ? PhoneNumberFormat.INTERNATIONAL
        : PhoneNumberFormat.NATIONAL;
    return phoneUtil.format(phoneNumber, format);
  } catch (error) {
    return null;
  }
};
