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
import { TranslatedPlace } from "@soliguide/common";
import { FilterQuery, QueryOptions } from "mongoose";
import { ApiTranslatedPlace } from "../interfaces";
import { TranslatedPlaceModel } from "../models/translatedPlace.model";

export const countTranslatedPlaces = async (
  params: FilterQuery<ApiTranslatedPlace>
): Promise<number> => {
  return await TranslatedPlaceModel.countDocuments(params);
};

/**
 * @summary Get translated places
 * @param {Object} params <ApiTranslatedPlace>
 * @param {Object} options
 */
export const findTranslatedPlaces = async (
  params: FilterQuery<ApiTranslatedPlace>,
  options: QueryOptions
): Promise<TranslatedPlace[]> => {
  return await TranslatedPlaceModel.find(params)
    .limit(options?.limit ?? 100)
    .skip(options?.skip ?? 0)
    .sort(options.sort)
    .populate("place", "_id lieu_id seo_url name")
    .exec();
};

export const findTranslatedPlace = async (
  params: FilterQuery<ApiTranslatedPlace>
): Promise<ApiTranslatedPlace | null> => {
  return await TranslatedPlaceModel.findOne(params).exec();
};

export const patchTranslatedPlace = async (
  lieu_id: number,
  data: Partial<ApiTranslatedPlace>
): Promise<TranslatedPlace | null> => {
  // Set the right value
  // Update the element in the database
  return await TranslatedPlaceModel.findOneAndUpdate(
    { lieu_id },
    { $set: data },
    { new: true }
  )
    .lean()
    .exec();
};
