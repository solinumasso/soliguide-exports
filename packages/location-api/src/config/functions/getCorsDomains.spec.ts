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
import { getCorsDomains } from "./getCorsDomains";

describe("getCorsDomains", () => {
  it("should convert domains to RegExp patterns", () => {
    const domains = "fr.demo.soliguide.dev,es.demo.soliguide.dev";
    const result = getCorsDomains(domains);

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(RegExp);
    expect(result[0].toString()).toBe("/\\.fr\\.demo\\.soliguide\\.dev$/");
    expect(result[1].toString()).toBe("/\\.es\\.demo\\.soliguide\\.dev$/");
  });

  it("should handle single domain", () => {
    const result = getCorsDomains("fr.demo.soliguide.dev");
    expect(result).toHaveLength(1);
    expect(result[0].toString()).toBe("/\\.fr\\.demo\\.soliguide\\.dev$/");
  });

  it("should trim whitespace", () => {
    const result = getCorsDomains(
      " fr.demo.soliguide.dev , es.demo.soliguide.dev "
    );
    expect(result).toHaveLength(2);
  });
});
