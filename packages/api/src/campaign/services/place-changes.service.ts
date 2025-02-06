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
import { CAMPAIGN_DEFAULT_NAME } from "@soliguide/common";

import { PlaceChangesModel } from "../../place-changes/models/place-changes.model";

export const findUpdatedSectionsWithParams = async (params: any) => {
  return await PlaceChangesModel.aggregate([
    {
      $match: {
        campaignName: CAMPAIGN_DEFAULT_NAME,
        isCampaign: true,
        ...params,
      },
    },
    {
      // To calculate the autonomy level we only have to know if all forms sections have been exclusively modified by pros or not
      $group: {
        _id: "$userData.status",
        sections: { $addToSet: "$section" },
      },
    },
  ]);
};
