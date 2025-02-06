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
export const SIGNUP_OK = {
  lastname: "Test",
  mail: "test@test.test",
  name: "test",
  password: "P4s$W0rD",
};

export const SIGNUP_FAIL = {
  lastname: "Test",
  mail: "non working email :'(",
  name: "test",
  password: "P4s$W0rD",
};

export const SIGNUP_TRANSLATOR_OK = {
  passwordConfirmation: "Azerty01!",
  languages: ["fa"],
  lastname: "traducteur",
  mail: "mathis01@soliguide.dev",
  name: "Mathis01",
  password: "Azerty01!",
  translator: true,
};

export const SIGNUP_TRANSLATOR_FAIL = {
  passwordConfirmation: "000",
  languages: ["fa"],
  lastname: "traducteur",
  mail: "mathis01@soliguide.dev",
  name: "Mathis01",
  password: "000",
  translator: true,
};
