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
import { RootQuerySelector } from "mongoose";
import {
  ApiPlace,
  CountryCodes,
  getAllowedTerritories,
  PlaceType,
  SoliguideCountries,
} from "@soliguide/common";
import { UserPopulateType } from "../../../_models";

export const generateApiUserRestriction = (
  nosqlQuery: RootQuerySelector<ApiPlace>,
  user: UserPopulateType
): RootQuerySelector<ApiPlace> => {
  const apiUserRestriction: RootQuerySelector<ApiPlace> = {
    placeType: PlaceType.PLACE,
  };

  const userAreasCountries = Object.keys(user.areas ?? {});

  if (userAreasCountries.length === 1) {
    const allowedTerritories = getAllowedTerritories(
      user,
      userAreasCountries[0] as SoliguideCountries
    );

    apiUserRestriction["position.departmentCode"] = {
      $in: allowedTerritories,
    };
    apiUserRestriction["position.country"] =
      userAreasCountries[0] as SoliguideCountries;
  } else if (userAreasCountries.length > 1) {
    const $or = [];

    for (const country of Object.keys(user.areas ?? {})) {
      const allowedTerritories = getAllowedTerritories(
        user,
        country as SoliguideCountries
      );

      $or.push({
        "position.departmentCode": {
          $in: allowedTerritories,
        },
        "position.country": country as SoliguideCountries,
      });
    }

    apiUserRestriction.$or = $or;
  } else {
    const allowedTerritories = getAllowedTerritories(user, CountryCodes.FR);

    apiUserRestriction["position.departmentCode"] = {
      $in: allowedTerritories,
    };
    apiUserRestriction["position.country"] = CountryCodes.FR;
  }

  return { $and: [apiUserRestriction, nosqlQuery] };
};
