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
import { PlaceModel } from "../../place/models/place.model";
import { OrganizationModel } from "../../organization/models/organization.model";

import "../../place/models/photo.model";
import "../../place/models/document.model";
import "../../place/models/parcours.model";
import "../../user/models/invitation.model";
import "../../user/models/userRight.model";

export const getRequiredPlaceForTest = async (name: string) => {
  const populateQuery = [
    { model: "Photos", path: "photos" },
    {
      path: "services_all",
      populate: { model: "Docs", path: "modalities.docs" },
    },
    { model: "Docs", path: "modalities.docs" },
  ];

  if (name.includes("MARAUDE")) {
    populateQuery.push({
      path: "parcours",
      populate: { model: "Photos", path: "photos" },
    });
  }

  return PlaceModel.findOne({ name }).populate(populateQuery).lean().exec();
};

export const getRequiredOrgaForTest = async (name: string) => {
  return OrganizationModel.findOne({ name })
    .populate([
      "users",
      "places",
      {
        path: "invitations",
        populate: { model: "User", path: "user" },
      },
      {
        path: "invitations",
        populate: { model: "Organization", path: "organization" },
      },
    ])
    .lean()
    .exec();
};
