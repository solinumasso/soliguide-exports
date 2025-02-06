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
import { TestBed } from "@angular/core/testing";

import { ReadableParcoursPipe } from "./readable-parcours.pipe";

import { PlaceParcours } from "../../../models";

describe("ReadableParcoursPipe", () => {
  let pipe: ReadableParcoursPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ReadableParcoursPipe] });
    pipe = TestBed.inject(ReadableParcoursPipe);
  });

  it("can load instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("transforms X to Y", () => {
    const value: PlaceParcours[] = [
      new PlaceParcours({
        position: {
          address: "12 rue des Fausset, 33000 Bordeaux",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      }),
      new PlaceParcours({
        position: {
          address: "1 cours de la Somme, 33800 Bordeaux",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      }),
    ];
    expect(pipe.transform(value)).toEqual(
      "1. 12 rue des Fausset, 33000 Bordeaux - 2. 1 cours de la Somme, 33800 Bordeaux"
    );
  });
});
