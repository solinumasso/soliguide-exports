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
import "./userRight.model";

import { DEFAULT_USER_PROPS } from "../constants/DEFAULT_USER_PROPS.const";

import { UserModel } from "../models/user.model";

import "../../organization/models/organization.model";
import "../../place/models/place.model";

describe("UserModel", () => {
  const testUser = {
    ...DEFAULT_USER_PROPS,
    user_id: 0,
    mail: "toto@toto.toto",
    name: "toto",
    lastname: "toto",
    password: "plop",
  };

  it("must create a user model with no territories and languages", async () => {
    const user = new UserModel({
      ...testUser,
    });
    await user.validate();
    expect(user).not.toBeNull();
    expect(user._id).not.toBeUndefined();
    expect(user._id).not.toBeNull();
    expect(user.territories).not.toBeUndefined();
    expect(user.territories).not.toBeNull();
    expect(user.areas).toBeUndefined();
  });

  it("must create a user model with valid territories", async () => {
    const user = new UserModel({
      ...testUser,
      territories: ["01", "09"],
    });
    await user.validate();
    expect(user.territories).toStrictEqual(["01", "09"]);
  });

  it("must not create a user model with invalid territories", () => {
    const user = new UserModel({
      ...testUser,
      territories: ["44", "123"],
    });

    user
      .validate()
      .then(() => fail())
      .catch((error) =>
        expect(error.message).toEqual(
          "User validation failed: territories.1: `123` is not a valid enum value for path `territories.1`."
        )
      );
  });

  it("must create an user model with valid languages", async () => {
    const user = new UserModel({
      ...testUser,
      languages: ["en", "ar"],
    });
    await user.validate();
    expect(user.languages).toStrictEqual(["en", "ar"]);
  });

  it("must create an user model with invalid languages", () => {
    const user = new UserModel({
      ...testUser,
      languages: ["en", "ar", "vb"],
    });
    user
      .validate()
      .then(() => fail())
      .catch((error) =>
        expect(error.message).toEqual(
          "User validation failed: languages: Path languages is not a list of valid languages"
        )
      );
  });
});
