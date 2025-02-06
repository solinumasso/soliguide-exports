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
import { User } from "../src/app/modules/users/classes/user.class";
import { CountryCodes, UserStatus } from "@soliguide/common";

export const USER_SOLIGUIDE_MOCK: User = new User({
  _id: "xxxx",
  categoriesLimitations: [],
  devToken: null,
  languages: [],
  lastname: "USER LAST NAME",
  mail: "USER@solinum.org",
  name: "USER FIRST NAME",
  organizations: [],
  phone: {
    phoneNumber: "0606060606",
    countryCode: CountryCodes.FR,
    isSpecialPhoneNumber: false,
    label: null,
  },
  places: [],
  role: null,
  selectedOrgaIndex: 0,
  status: UserStatus.ADMIN_SOLIGUIDE,
  title: "Chips",
  translator: false,
  user_id: 1433,
  verified: true,
});
