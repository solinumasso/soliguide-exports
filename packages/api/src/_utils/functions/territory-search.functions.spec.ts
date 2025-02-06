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
import { generateRegexTerritories } from "./territory-search.functions";

describe("Construction d'une regex sans ses options pour prendre en compte le fait qu'un utilisateur peut être sur plusieurs territoires", () => {
  describe("Utilisateur sur le 75, le 92, le 982 et le 2A", () => {
    const regexStr = generateRegexTerritories(["75", "92", "974", "2A"]);
    it("Renvoyer la chaîne '75\\d{3}|92\\d{3}'", () => {
      expect(regexStr).toBe("75\\d{3}|92\\d{3}|974\\d{2}|20\\d{3}");
    });

    it("Être valide, car on teste la RegExp avec un territoire contenu dedans", () => {
      const regex = new RegExp(regexStr, "i");
      expect(regex.test("75013")).toBe(true); // Paris 13ème
      expect(regex.test("20260")).toBe(true); // Calvi in south Corsica
      expect(regex.test("97400")).toBe(true); // Saint-Denis in lLa Réunion
    });
  });
});
