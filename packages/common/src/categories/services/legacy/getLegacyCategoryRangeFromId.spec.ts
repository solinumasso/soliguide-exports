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
import { getLegacyCategoryRangeFromId } from "./getLegacyCategoryRangeFromId";

import { LEGACY_CATEGORIES } from "../../constants";

describe("getLegacyCategoryRangeFromId", () => {
  // We do not use LEGACY_CATEGORIES_RANGE because we use it in getLegacyCategoryRangeFromId so it would be equal to test nothing
  [
    { id: 100, from: 101, to: 110 },
    { id: 200, from: 201, to: 205 },
    { id: 300, from: 301, to: 306 },
    { id: 400, from: 401, to: 408 },
    { id: 500, from: 501, to: 505 },
    { id: 600, from: 601, to: 605 },
    { id: 700, from: 701, to: 705 },
    { id: 800, from: 801, to: 804 },
    { id: 900, from: 901, to: 904 },
    { id: 1100, from: 1101, to: 1122 },
    { id: 1200, from: 1201, to: 1204 },
    { id: 1300, from: 1301, to: 1305 },
  ].forEach((value) => {
    it(`should return the range [${value.from}, ${value.to}] for the category ${
      LEGACY_CATEGORIES[value.id].label
    }`, () => {
      expect(getLegacyCategoryRangeFromId(value.id).from).toEqual(value.from);
      expect(getLegacyCategoryRangeFromId(value.id).to).toEqual(value.to);
    });
  });
});
