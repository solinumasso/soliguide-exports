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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CountryCodes } from "../../enums";
import { getTimeZoneFromPosition } from "../getTimeZoneFromPosition";

describe("getTimeZoneFromPosition", () => {
  it('should throw an error if "country" is not provided', () => {
    const position: any = {
      pays: CountryCodes.FR,
      departmentCode: "75",
    };
    expect(() => getTimeZoneFromPosition(position)).toThrow("COUNTRY_IS_EMPTY");
  });

  [
    { in: "972", out: "America/Martinique" },
    { in: "973", out: "America/Cayenne" },
    { in: "974", out: "Indian/Reunion" },
    { in: "976", out: "Indian/Mayotte" },
    { in: "976", out: "Indian/Mayotte" },
  ].forEach((value) => {
    it(`Get timezone for french oversea : ${value.in}`, () => {
      expect(
        getTimeZoneFromPosition({
          country: CountryCodes.FR,
          departmentCode: value.in,
        } as any)
      ).toEqual(value.out);
    });
  });

  it("should handle Monaco correctly", () => {
    const position: any = {
      country: CountryCodes.FR,
      departmentCode: "98",
    };
    expect(getTimeZoneFromPosition(position)).toEqual("Europe/Paris");
  });

  it('should throw "COUNTRY_NOT_SUPPORTED" for unsupported countries', () => {
    const position: any = { country: "XX" };
    expect(() => getTimeZoneFromPosition(position)).toThrow(
      "COUNTRY_NOT_SUPPORTED"
    );
  });

  it('should throw "COUNTRY_NOT_SUPPORTED" if no matching region or department is found', () => {
    const position: any = { country: "FR", regionCode: "XX" };
    expect(() => getTimeZoneFromPosition(position)).toThrow(
      "COUNTRY_NOT_SUPPORTED"
    );
  });
});
