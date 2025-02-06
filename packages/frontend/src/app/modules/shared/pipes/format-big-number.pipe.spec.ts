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
import { FormatBigNumberPipe } from "./format-big-number.pipe";

describe("FormatBigNumberPipe", () => {
  let pipe: FormatBigNumberPipe;

  beforeEach(() => {
    pipe = new FormatBigNumberPipe();
  });

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should correctly format big numbers", () => {
    expect(pipe.transform(1234567890)).toEqual("1 234 567 890");
    expect(pipe.transform(100000)).toEqual("100 000");
  });

  it("should handle zero", () => {
    expect(pipe.transform(0)).toEqual("0");
  });
});
