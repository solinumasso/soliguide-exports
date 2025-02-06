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
import { LEGACY_CATEGORIES } from "../../constants";
import { Categories } from "../../enums";

// [CATEGORY] File to remove after complete switch
export function getLegacyCategoryFromCategory(
  category: Categories
): number | undefined {
  const legacyCategoryEntry = Object.entries(LEGACY_CATEGORIES).find(
    (legacyCategoryEntry) => legacyCategoryEntry[1].newCategory === category
  );

  if (legacyCategoryEntry) {
    return parseInt(legacyCategoryEntry[0], 10);
  }

  return legacyCategoryEntry;
}
