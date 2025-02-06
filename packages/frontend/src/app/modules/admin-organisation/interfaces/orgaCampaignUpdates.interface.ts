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
import { OrgaCampaignStatus } from "../../../models";

export class OrgaCampaignUpdates {
  public autonomyRate: number;
  public endDate: Date;
  public startDate: Date;
  public status: OrgaCampaignStatus;
  public toUpdate: boolean;

  constructor(orgaCampaignUpdates?: Partial<OrgaCampaignUpdates>) {
    this.autonomyRate = orgaCampaignUpdates?.autonomyRate ?? 0;
    this.endDate = orgaCampaignUpdates?.endDate
      ? new Date(orgaCampaignUpdates.endDate)
      : null;
    this.startDate = orgaCampaignUpdates?.startDate
      ? new Date(orgaCampaignUpdates.startDate)
      : null;
    this.status = orgaCampaignUpdates?.status ?? OrgaCampaignStatus.TO_DO;
    this.toUpdate = orgaCampaignUpdates?.toUpdate ?? false;
  }
}
