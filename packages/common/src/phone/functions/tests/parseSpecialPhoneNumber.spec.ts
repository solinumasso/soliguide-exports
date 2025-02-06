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
import { parseSpecialPhoneNumber } from "../../../phone/functions/parseSpecialPhoneNumber";

describe("parseSpecialPhoneNumber Tests", () => {
  test("should return empty string for empty input", () => {
    expect(parseSpecialPhoneNumber("")).toBe("");
  });

  test("should format French phone number correctly by replacing +33 with 0", () => {
    expect(parseSpecialPhoneNumber("+33123456789")).toBe("01 23 45 67 89");
  });

  test("should remove dots and format correctly", () => {
    expect(parseSpecialPhoneNumber("+33.123.456.789")).toBe("01 23 45 67 89");
  });

  test("should return the same format if no changes are needed", () => {
    expect(parseSpecialPhoneNumber("0123456789")).toBe("01 23 45 67 89");
  });

  test("Should return a phone number with a space", () => {
    expect(parseSpecialPhoneNumber("3637")).toBe("36 37");
  });
});
