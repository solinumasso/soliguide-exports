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
import { FilterQuery } from "mongoose";

import { ApiPlace, PlaceType } from "@soliguide/common";

import "../config/database/connection";
import { PlaceModel } from "../place/models";
import { TypesenseClient } from "./services/TypesenseClient.service";
import { TypesensePlaceDocument } from "./documents";

export const bulkIndexPlaces = async () => {
  console.log("[TYPESENSE] Starting indexing of places...");
  const placeFilterQuery: FilterQuery<ApiPlace> = {
    placeType: PlaceType.PLACE,
  };
  const limit = 1000;
  const count = await PlaceModel.countDocuments(placeFilterQuery);
  const totalPages = Math.ceil(count / limit);
  console.log(
    `[TYPESENSE] ${count} places to index in Typesense (${totalPages} pages of ${limit} places)`
  );
  const typesenseClient = TypesenseClient.instance;
  for (let page = 1; page <= totalPages; page++) {
    const placeModels: ApiPlace[] = await PlaceModel.find(placeFilterQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    for (const place of placeModels) {
      const typesensePlace = TypesensePlaceDocument.fromApiPlace(place);
      console.debug("[TYPESENSE] Place to index:", typesensePlace);
      const result = await typesenseClient.upsertPlace(typesensePlace);
      console.debug("[TYPESENSE] place index query result:", result);
    }
  }
  console.log(`[TYPESENSE] ${count} places successfully indexed!`);
};
