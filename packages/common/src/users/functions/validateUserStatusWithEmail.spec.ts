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

import { DOMAINS_ADMIN_TERRITORIES } from "../constants";
import { UserStatus } from "../enums";
import { validateUserStatusWithEmail } from "./validateUserStatusWithEmail";

describe("validateUserStatusWithEmail", () => {
  it("should return { required: true } if email is not provided", () => {
    expect(validateUserStatusWithEmail(UserStatus.ADMIN_SOLIGUIDE)).toEqual({
      required: true,
    });
  });

  it("should return { invalidAdminSoliguideEmail: true } if ADMIN_SOLIGUIDE status and email domain is not solinum.org", () => {
    expect(
      validateUserStatusWithEmail(
        UserStatus.ADMIN_SOLIGUIDE,
        "user@example.com"
      )
    ).toEqual({ invalidAdminSoliguideEmail: true });
  });

  it("should return { invalidAdminSoliguideEmail: true } if ADMIN_SOLIGUIDE status and email domain is not solinum.org", () => {
    expect(
      validateUserStatusWithEmail(UserStatus.SOLI_BOT, "user@example.com")
    ).toEqual({ invalidAdminSoliguideEmail: true });
  });

  it("should return null if ADMIN_SOLIGUIDE status and email domain is solinum.org", () => {
    expect(
      validateUserStatusWithEmail(
        UserStatus.ADMIN_SOLIGUIDE,
        "user@solinum.org"
      )
    ).toBeNull();
  });

  it("should return { invalidAdminTerritoryEmail: true } if ADMIN_TERRITORY status and email domain is not in DOMAINS_ADMIN_TERRITORIES", () => {
    expect(
      validateUserStatusWithEmail(
        UserStatus.ADMIN_TERRITORY,
        "user@example.com"
      )
    ).toEqual({ invalidAdminTerritoryEmail: true });
  });

  it.each(DOMAINS_ADMIN_TERRITORIES)(
    "should return null if ADMIN_TERRITORY status and email domain is in DOMAINS_ADMIN_TERRITORIES: %s",
    async (mail) => {
      expect(
        validateUserStatusWithEmail(UserStatus.ADMIN_TERRITORY, mail)
      ).toBeNull();
    }
  );

  it("should return { invalidSimpleUserEmail: true } if email domain is solinum.org and status is not admin", () => {
    expect(
      validateUserStatusWithEmail(UserStatus.SIMPLE_USER, "user@solinum.org")
    ).toEqual({ invalidSimpleUserEmail: true });
  });

  it("should return { invalidSimpleUserEmail: true } if email domain is in DOMAINS_ADMIN_TERRITORIES and status is not admin", () => {
    DOMAINS_ADMIN_TERRITORIES.push("validterritory.org");
    expect(
      validateUserStatusWithEmail(
        UserStatus.SIMPLE_USER,
        "user@validterritory.org"
      )
    ).toEqual({ invalidSimpleUserEmail: true });
  });

  it("should return null if email domain is not solinum.org or in DOMAINS_ADMIN_TERRITORIES and status is not admin", () => {
    expect(
      validateUserStatusWithEmail(UserStatus.SIMPLE_USER, "user@example.com")
    ).toBeNull();
  });

  it("should return null if email domain is solinum.org and status is SOLI_BOT", () => {
    expect(
      validateUserStatusWithEmail(UserStatus.SOLI_BOT, "user@solinum.org")
    ).toBeNull();
  });

  it("should return null if email domain is not in DOMAINS_ADMIN_TERRITORIES and status is not admin", () => {
    expect(
      validateUserStatusWithEmail(UserStatus.SIMPLE_USER, "user@example.com")
    ).toBeNull();
  });
});
