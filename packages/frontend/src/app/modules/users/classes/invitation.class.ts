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
  CommonInvitation,
  type CommonUser,
  type AnyDepartmentCode,
  type UserRole,
} from "@soliguide/common";

import type { User } from "./user.class";
import { Organisation } from "../../admin-organisation/interfaces/organisation.interface";

export class Invitation implements CommonInvitation {
  public _id: string | null;
  public createdBy?: string;
  public createdAt: Date | null;
  public acceptedAt: Date | null;
  public roleType: UserRole;
  public territories: AnyDepartmentCode[];
  public organization: Organisation;
  public organization_id: number | null;
  public organizationName: string | null;
  public pending: boolean;
  public token: string | null;
  public user: CommonUser | User | null;
  public user_id: number | null;

  constructor(invitation?: Partial<Invitation>) {
    this._id = invitation?._id ?? null;
    this.acceptedAt = invitation?.acceptedAt
      ? new Date(invitation.acceptedAt)
      : null;
    this.roleType = invitation?.roleType ?? null;
    this.createdAt = invitation?.createdAt
      ? new Date(invitation.createdAt)
      : null;
    this.organization = invitation?.organization
      ? new Organisation(invitation.organization)
      : null;
    this.organization_id = invitation?.organization_id ?? null;
    this.organizationName = invitation?.organizationName ?? null;
    this.pending = invitation?.pending ?? true;
    this.token = invitation?.token ?? null;
    this.user = invitation?.user ?? null;
    this.user_id = invitation?.user_id ?? null;
    this.createdBy = invitation?.createdBy;
  }
}
