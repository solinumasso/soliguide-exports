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
  ADMINISTRATIVE_DEFAULT_VALUES,
  FAMILY_DEFAULT_VALUES,
  GENDER_DEFAULT_VALUES,
  OTHER_DEFAULT_VALUES,
  PublicsAdministrative,
  PublicsFamily,
  PublicsGender,
  PublicsOther,
} from "@soliguide/common";
import { model } from "mongoose";

import { PublicsSchema } from "../publics.model";

describe("PublicsSchema", () => {
  const PublicsModel = model("Publics", PublicsSchema);

  it("must create a publics model with no value in administrative, family and other situations as well as genders", async () => {
    const publics = new PublicsModel({});

    await publics.validate();

    expect(publics).not.toBeNull();
    expect(publics.administrative).toStrictEqual(ADMINISTRATIVE_DEFAULT_VALUES);
    expect(publics.familialle).toStrictEqual(FAMILY_DEFAULT_VALUES);
    expect(publics.gender).toStrictEqual(GENDER_DEFAULT_VALUES);
    expect(publics.other).toStrictEqual(OTHER_DEFAULT_VALUES);
  });

  it("must create publics model with valid administrative situations", async () => {
    const publics = new PublicsModel({
      administrative: [
        PublicsAdministrative.asylum,
        PublicsAdministrative.refugee,
      ],
    });

    await publics.validate();

    expect(publics.administrative).toStrictEqual([
      PublicsAdministrative.asylum,
      PublicsAdministrative.refugee,
    ]);
  });

  it("must create publics model with invalid administrative situations", async () => {
    const publics = new PublicsModel({
      administrative: [PublicsAdministrative.asylum, "disabled"],
    });

    publics
      .validate()
      .then(() => fail())
      .catch((error) =>
        expect(error.message).toEqual(
          "Publics validation failed: administrative: Path administrative is not a list of valid administrative situations"
        )
      );
  });

  it("must create publics model with valid family situations", async () => {
    const publics = new PublicsModel({
      familialle: [PublicsFamily.couple, PublicsFamily.pregnant],
    });

    await publics.validate();

    expect(publics.familialle).toStrictEqual([
      PublicsFamily.couple,
      PublicsFamily.pregnant,
    ]);
  });

  it("must create publics model with invalid family situations", async () => {
    const publics = new PublicsModel({
      familialle: [PublicsFamily.couple, "disabled"],
    });

    publics
      .validate()
      .then(() => fail())
      .catch((error) =>
        expect(error.message).toEqual(
          "Publics validation failed: familialle: Path familialle is not a list of valid family situations"
        )
      );
  });

  it("must create publics model with valid genders", async () => {
    const publics = new PublicsModel({
      gender: [PublicsGender.women],
    });

    await publics.validate();

    expect(publics.gender).toStrictEqual([PublicsGender.women]);
  });

  it("must create publics model with invalid genders", async () => {
    const publics = new PublicsModel({
      gender: [PublicsGender.women, "disabled"],
    });

    publics
      .validate()
      .then(() => fail())
      .catch((error) =>
        expect(error.message).toEqual(
          "Publics validation failed: gender: Path gender is not a list of valid genders"
        )
      );
  });

  it("must create publics model with valid other situations", async () => {
    const publics = new PublicsModel({
      other: [PublicsOther.addiction, PublicsOther.hiv],
    });

    await publics.validate();

    expect(publics.other).toStrictEqual([
      PublicsOther.addiction,
      PublicsOther.hiv,
    ]);
  });

  it("must create publics model with invalid other situations", async () => {
    const publics = new PublicsModel({
      other: [PublicsOther.addiction, "disabled"],
    });

    publics
      .validate()
      .then(() => fail())
      .catch((error) =>
        expect(error.message).toEqual(
          "Publics validation failed: other: Path other is not a list of valid other situations"
        )
      );
  });
});
