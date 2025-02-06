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
import { formatPhoneNumber } from "./formatPhoneNumber.functions";

describe("formatPhoneNumber", () => {
  it("should return null for empty string", () => {
    expect(formatPhoneNumber("")).toBeNull();
  });

  it("should return null for invalid phone number", () => {
    expect(formatPhoneNumber("abc")).toBeNull();
    expect(formatPhoneNumber("xxxx-sq-z6516198")).toBeNull();
    expect(formatPhoneNumber("+")).toBeNull();
    expect(formatPhoneNumber("+1 (123) 456-7890")).toBeNull();
  });

  it("should accept small phone numbers (Pôle emploi, CAF, etc)", () => {
    expect(formatPhoneNumber("32 30")).toBe("3230");
    expect(formatPhoneNumber("39-49")).toBe("3949");
  });
});
