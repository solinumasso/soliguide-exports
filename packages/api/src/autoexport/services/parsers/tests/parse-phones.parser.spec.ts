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
import { Phone, SupportedLanguagesCode, CountryCodes } from "@soliguide/common";
import { parsePhones } from "..";

describe("Get complete address for place ", () => {
  it("No phone", () => {
    expect(parsePhones(SupportedLanguagesCode.EN, [])).toEqual(
      "No phone number given"
    );
  });

  it("Phones with label", () => {
    const phones: Phone[] = [
      {
        label: "Phone 1 ",
        phoneNumber: "09 09 09 09 09",
        isSpecialPhoneNumber: false,
        countryCode: CountryCodes.FR,
      },
      {
        label: "Phone number 2",
        phoneNumber: "06.10.20.22.22 ",
        isSpecialPhoneNumber: false,
        countryCode: CountryCodes.FR,
      },
    ];
    expect(parsePhones(SupportedLanguagesCode.EN, phones)).toEqual(
      "Phone 1: 09 09 09 09 09\nPhone number 2: 06 10 20 22 22"
    );
  });
  it("Phones with label", () => {
    const phones: Phone[] = [
      {
        label: "Phone number One",
        phoneNumber: "+ 33 09 09 09 09 09",
        isSpecialPhoneNumber: false,
        countryCode: CountryCodes.FR,
      },
    ];
    expect(parsePhones(SupportedLanguagesCode.EN, phones)).toEqual(
      "Phone number One: 09 09 09 09 09"
    );
  });
});
