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

export const validateUserStatusWithEmail = (
  status: UserStatus,
  email?: string
):
  | { required: true }
  | { invalidAdminSoliguideEmail: true }
  | { invalidAdminTerritoryEmail: true }
  | { invalidSimpleUserEmail: true }
  | null => {
  if (!email) {
    return { required: true };
  }

  const domain = email?.substring(email.lastIndexOf("@") + 1);

  if (
    status === UserStatus.ADMIN_SOLIGUIDE ||
    status === UserStatus.ADMIN_TERRITORY ||
    status === UserStatus.SOLI_BOT
  ) {
    if (
      (status === UserStatus.ADMIN_SOLIGUIDE ||
        status === UserStatus.SOLI_BOT) &&
      domain !== "solinum.org"
    ) {
      return { invalidAdminSoliguideEmail: true };
    } else if (
      status === UserStatus.ADMIN_TERRITORY &&
      !DOMAINS_ADMIN_TERRITORIES.includes(domain)
    ) {
      return { invalidAdminTerritoryEmail: true };
    }
    return null;
  }

  // We can't have users with admin domain & another status (api, simple user, etc)
  if (domain === "solinum.org" || DOMAINS_ADMIN_TERRITORIES.includes(domain)) {
    return { invalidSimpleUserEmail: true };
  }

  return null;
};
