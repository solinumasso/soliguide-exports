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
import { FormatPhoneNumberPipe } from "./format-phone-number.pipe";

describe("FormatPhoneNumberPipe", () => {
  let pipe: FormatPhoneNumberPipe;

  beforeEach(() => {
    pipe = new FormatPhoneNumberPipe();
  });

  it("should format French mobile numbers correctly", () => {
    expect(pipe.transform("+33612345678")).toBe("06 12 34 56 78");
    expect(pipe.transform("0612345678")).toBe("06 12 34 56 78");
    expect(pipe.transform("06.12.34.56.78")).toBe("06 12 34 56 78");
  });

  it("should format French landline numbers correctly", () => {
    expect(pipe.transform("+33123456789")).toBe("01 23 45 67 89");
    expect(pipe.transform("0123456789")).toBe("01 23 45 67 89");
    expect(pipe.transform("01.23.45.67.89")).toBe("01 23 45 67 89");
  });

  // Cas limites
  it("should handle edge cases", () => {
    expect(pipe.transform("")).toBe("");
    expect(pipe.transform("1234")).toBe("12 34");
  });
});
