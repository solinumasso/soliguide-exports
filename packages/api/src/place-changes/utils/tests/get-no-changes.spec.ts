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
import { PlaceChangesSection } from "@soliguide/common";
import { getNoChanges } from "../place-changes-utils";

describe("getNoChanges", () => {
  it("should return true if noChanges is true", () => {
    expect(
      getNoChanges(
        true,
        PlaceChangesSection.hours,
        { name: "hehehe" },
        { name: "hohoho" }
      )
    ).toBe(true);
  });

  it("should return false if section is 'photos'", () => {
    expect(
      getNoChanges(
        false,
        PlaceChangesSection.photos,
        { name: "xxx" },
        { name: "yyy" }
      )
    ).toBe(false);
  });

  it("should return true if section is false, but content is equal", () => {
    const data = {
      name: "value",
      entity: {
        name: "Little poney",
        phones: [],
      },
    };
    expect(
      getNoChanges(false, PlaceChangesSection.hours as any, data, data)
    ).toBe(true);
  });

  it("should return false if content is not equal", () => {
    const oldData = {
      name: "value",
      entity: {
        name: "Little turtle",
        phones: [],
      },
    };

    const newData = {
      name: "value",
      entity: {
        name: "Little horse",
        phones: [],
      },
    };
    expect(
      getNoChanges(false, PlaceChangesSection.hours as any, newData, oldData)
    ).toBe(false);
  });
});
