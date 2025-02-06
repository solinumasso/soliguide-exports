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
import { getTerritoryAndCountryFromPlace } from "../getTerritoryAndCountryFromPlace";
import { CountryCodes } from "../../enums";
import { ApiPlace, CommonPlacePosition, PlaceType } from "../../../place";
describe("getTerritoryAndCountryFromPlace", () => {
  const place = {
    placeType: PlaceType.PLACE,
    position: new CommonPlacePosition({
      departmentCode: "75",
      country: CountryCodes.FR,
    }),
  } as unknown as ApiPlace;

  const itinerary = {
    placeType: PlaceType.ITINERARY,
    parcours: [
      {
        position: new CommonPlacePosition({
          departmentCode: "75",
          country: CountryCodes.FR,
        }),
      },
    ],
  } as unknown as ApiPlace;

  it("should return '75' if place is in Paris", () => {
    expect(getTerritoryAndCountryFromPlace(place)).toEqual({
      territory: "75",
      country: CountryCodes.FR,
    });
  });
  it("should return '75' if itinerary is in Paris", () => {
    expect(getTerritoryAndCountryFromPlace(itinerary)).toEqual({
      territory: "75",
      country: CountryCodes.FR,
    });
  });
});
