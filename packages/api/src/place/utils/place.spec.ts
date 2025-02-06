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
import {
  getHoursFromParcours,
  removeFieldFromPlaceForDuplication,
} from "./place";

import { ONLINE_PLACE } from "../../../mocks/places/ONLINE_PLACE.mock";
import { ONLINE_ITINERARY } from "../../../mocks/places/ONLINE_ITINERARY.mock";
import { PARCOURS } from "../../../mocks/PARCOURS.mock";

describe("Tests the removal of the fields to be removed for the duplication of places", () => {
  it("Should delete all useless properties for a duplicate place", () => {
    const placeToDuplicate = removeFieldFromPlaceForDuplication(
      structuredClone(ONLINE_PLACE)
    );
    expect(placeToDuplicate._id).toBeUndefined();
    expect(placeToDuplicate.services_all[0].serviceObjectId).not.toStrictEqual(
      ONLINE_PLACE.services_all[0].serviceObjectId
    );
  });
});

describe("Tests the function that builds the Newhours field from the journey points of a marald", () => {
  it("Must build the Newhours field of a route from a route", () => {
    expect({ ...getHoursFromParcours(PARCOURS) }).toStrictEqual(
      ONLINE_ITINERARY.newhours
    );
  });
});
