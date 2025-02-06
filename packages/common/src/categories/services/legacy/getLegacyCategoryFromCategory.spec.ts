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
import { Categories } from "../../enums";
import { getLegacyCategoryFromCategory } from "./getLegacyCategoryFromCategory";

describe("getLegacyCategoryFromCategory", () => {
  it("should find a legacy category for a basic category", () => {
    expect(
      getLegacyCategoryFromCategory(Categories.PUBLIC_WRITER)
    ).toStrictEqual(404);
  });

  describe("There is a legacy category for all categories", () => {
    Object.entries(Categories).forEach((categoryEntry) => {
      it(`should find a legacy category for category ${categoryEntry[0]}`, () => {
        expect(() =>
          getLegacyCategoryFromCategory(categoryEntry[1])
        ).not.toThrow();
      });
    });
  });
});
