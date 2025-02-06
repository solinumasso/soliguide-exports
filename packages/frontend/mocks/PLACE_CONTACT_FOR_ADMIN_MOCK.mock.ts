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
  CountryCodes,
  PlaceContactForAdmin,
  UserStatus,
} from "@soliguide/common";

export const PLACE_CONTACT_FOR_ADMIN_MOCK: PlaceContactForAdmin = {
  displayContactPro: true,
  name: "Harry",
  lastname: "Maguire",
  mail: "hmaguire@structure-social.fr",
  canEdit: false,
  canEditUserInfos: false,
  phone: {
    phoneNumber: "0606060606",
    countryCode: CountryCodes.FR,
    isSpecialPhoneNumber: false,
    label: null,
  },
  title: "Responsable",
  status: UserStatus.PRO,
  userObjectId: "5ebxsxsx874d79ab12e9",
  _id: "5ebxsxsx874d79ab12e9",
};
