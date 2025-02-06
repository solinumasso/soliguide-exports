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
import { USER_PRO_MOCK } from "../../../../../mocks/USER_PRO.mock";
import { User } from "../../users/classes";
import { UserFullNamePipe } from "./user-fullname.pipe";

describe("UserFullNamePipe", () => {
  let pipe: UserFullNamePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserFullNamePipe] });
    pipe = TestBed.inject(UserFullNamePipe);
  });

  it("can load instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("transforms X to Y", () => {
    const value: User = new User(USER_PRO_MOCK);
    expect(pipe.transform(value)).toEqual(value.name + " " + value.lastname);
  });
});
