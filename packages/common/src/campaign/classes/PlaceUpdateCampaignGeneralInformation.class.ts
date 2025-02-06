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
export class PlaceUpdateCampaignGeneralInformation {
  public changes: boolean; // Whether changes on the place have been reported through the form during the campaign
  public endDate: Date | null; // Date at which the form has been completed
  public startDate: Date | null; // Date at which the form started to be completed
  public updated: boolean; // Whether the place has been updated through the form during the campaign

  constructor(
    generalInformation?: Partial<PlaceUpdateCampaignGeneralInformation>
  ) {
    this.changes = generalInformation?.changes ?? false;
    this.endDate = generalInformation?.endDate
      ? new Date(generalInformation.endDate)
      : null;
    this.startDate = generalInformation?.startDate
      ? new Date(generalInformation.startDate)
      : null;
    this.updated = generalInformation?.updated ?? false;
  }
}
