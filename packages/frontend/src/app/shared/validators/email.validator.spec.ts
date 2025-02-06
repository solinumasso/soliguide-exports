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
import { EmailValidator } from "./email.validator";

describe("EmailValidator", () => {
  it("should return null for an empty or undefined control value", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const control: any = { value: "" };
    expect(EmailValidator(control)).toBeNull();

    control.value = undefined;
    expect(EmailValidator(control)).toBeNull();
  });

  it("should return null for valid emails", () => {
    const emailsOk = [
      "simple.email@example.com",
      "admin@example.org",
      "78@pole-emploi.fr",
      "firstname-lastname@example.com",
      "115.gironde@gmail.com",
      "0626281379@orange.fr",
      "firstname+tag+sorting@example.com",
      "2014asea@strasbourg.com",
    ];
    emailsOk.forEach((email: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const control: any = { value: email };
      expect(EmailValidator(control)).toEqual(null);
    });
  });

  it("should return an error object for invalid emails", () => {
    const emailsNotOk = [
      " @ ",
      "plainaddress",
      "@missingusername.com",
      "username@.com",
      "username@.com.",
      ".username@example.com",
      "username@-example.com",
      "username@example..com",
      "Abc..123@example.com",
      "username@example.c",
      "username@10.10.10.256",
    ];
    emailsNotOk.forEach((email: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const control: any = { value: email };
      expect(EmailValidator(control)).toEqual({ invalidEmail: true });
    });
  });
});
