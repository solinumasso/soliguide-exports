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
import { kmOrMeters } from "./kmOrMeters.function";

describe("kmOrMeters", () => {
  it("should return the input in meters if it is less than 1000", () => {
    expect(kmOrMeters(500)).toBe("500 m");
  });

  it("should return the input in kilometers if it is greater than or equal to 1000", () => {
    expect(kmOrMeters(1000)).toBe("1 km");
    expect(kmOrMeters(2000)).toBe("2 km");
    expect(kmOrMeters(2500)).toBe("2,5 km");
  });

  it("should round down distances ", () => {
    expect(kmOrMeters(999.9)).toBe("990 m");
    expect(kmOrMeters(1000.5)).toBe("1 km");
    expect(kmOrMeters(1234.56)).toBe("1,2 km");
  });
});
