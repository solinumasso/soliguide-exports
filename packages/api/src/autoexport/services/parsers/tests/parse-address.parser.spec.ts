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
import { CommonPlacePosition, CountryCodes } from "@soliguide/common";

import { parseAddress } from "../parse-address.parser";

describe("Get complete address for place ", () => {
  const POSITION_MOCK: CommonPlacePosition = new CommonPlacePosition({
    adresse: "32 rue Bouret, 75019 Paris",
    address: "32 rue Bouret, 75019 Paris",
    postalCode: "75019",
    codePostal: "75019",
    complementAdresse: null,
    department: "Paris",
    departmentCode: "75",
    location: {
      coordinates: [2.3742211, 48.8817267],
      type: "Point",
    },
    country: CountryCodes.FR,
    pays: "France",
    region: "Île-de-France",
    slugs: {
      department: "paris",
      departement: "paris",
      pays: "france",
      country: CountryCodes.FR,
      region: "ile-de-france",
      ville: "paris",
    },
    ville: "Paris",
    city: "Paris",
  });
  it("Without Additional address", () => {
    expect(parseAddress(POSITION_MOCK)).toEqual("32 rue Bouret, 75019 Paris");
  });
  it("With Additional address", () => {
    POSITION_MOCK.additionalInformation = "this is an additional informations";
    expect(parseAddress(POSITION_MOCK)).toEqual(
      "32 rue Bouret (this is an additional informations), 75019 Paris"
    );
  });
});
