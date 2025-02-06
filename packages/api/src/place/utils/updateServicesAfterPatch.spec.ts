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
import { updateServicesAfterPatch } from "./updateServicesAfterPatch";

import { MCP_PLACE } from "../../../mocks/places/MCP_PLACE.mock";

// Do not call location-api
jest.mock("../../search/services/location-api.service");

describe("updateServicesAfterPatch", () => {
  it("Different Hours, different modalities, different publics", async () => {
    const newServices = await updateServicesAfterPatch(MCP_PLACE);

    if (!newServices) {
      throw new Error("Services is falsy");
    }

    // Service 2: everything is different
    expect(newServices[1].modalities.appointment.precisions).toEqual(
      "different"
    );
    expect(newServices[1].modalities.inscription.precisions).toEqual(
      "different"
    );
    expect(newServices[1].modalities.orientation.precisions).toEqual(
      "different"
    );
    expect(newServices[1].modalities.price.precisions).toEqual("different");
    expect(newServices[1].hours.description).toEqual("different");
    expect(newServices[1].publics.description).toEqual("different");
    expect(newServices[1].modalities.other).toEqual("different");
  });

  it("Same Hours, same modalities, same publics", async () => {
    const newServices = await updateServicesAfterPatch(MCP_PLACE);

    if (!newServices) {
      throw new Error("Services is falsy");
    }

    expect(newServices[0].hours).toStrictEqual(MCP_PLACE.newhours);
    expect(newServices[0].publics).toStrictEqual(MCP_PLACE.publics);
    expect(newServices[0].modalities).toStrictEqual(MCP_PLACE.modalities);
  });
});
