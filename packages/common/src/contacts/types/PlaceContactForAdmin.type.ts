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
import { UserStatus } from "../../users";
import { PlaceContact } from "../interfaces";

export type PlaceContactForAdmin = PlaceContact & {
  _id: string;
  canEdit: boolean; // Whether the user can show or mask someone else in the professional directory
  canEditUserInfos: boolean; // Whether the user can edit someone else information
  displayContactPro: boolean;
  edit?: boolean; // Edit in progress
  status: UserStatus;
  userObjectId: string;
};
