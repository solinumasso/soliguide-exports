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
import { BadRequestException } from "@nestjs/common";
import { ParseLongitudePipe } from "../ParseLongitude.pipe";

describe("ParseLongitudePipe", () => {
  let parseLongitudePipe: ParseLongitudePipe;

  beforeEach(() => {
    parseLongitudePipe = new ParseLongitudePipe();
  });

  it("should be defined", () => {
    expect(parseLongitudePipe).toBeDefined();
  });

  it("should return the same value if it is a valid longitude", () => {
    const validLongitude = "2.333333"; // Longitude of Paris
    expect(parseLongitudePipe.transform(validLongitude)).toBe(validLongitude);
  });

  it("should throw BadRequestException if value is not a valid longitude", () => {
    const invalidLongitude = "999999999";
    expect(() => parseLongitudePipe.transform(invalidLongitude)).toThrow(
      BadRequestException
    );
  });
});
