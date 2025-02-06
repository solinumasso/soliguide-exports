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

import mongoose, { FilterQuery, QueryOptions } from "mongoose";

import { ApiTranslatedField } from "../interfaces";
import { TranslatedFieldModel } from "../models/translatedField.model";
import { TranslatedPlaceModel } from "../models/translatedPlace.model";
import { PLACE_FIELDS_TO_TRANSLATE } from "../constants";

const TRANSLATED_PLACE_FIELDS_TO_POPULATE = {
  path: "place",
  select: "name seo_url lieu_id",
};

export const createFieldToTranslate = async (
  newElement: Partial<ApiTranslatedField>
): Promise<ApiTranslatedField> => {
  return await TranslatedFieldModel.create(newElement);
};

/**
 * @summary Search for translation
 * @param {Object} params
 * @param {Object} options
 */
export const findTranslatedFields = async (
  params: FilterQuery<ApiTranslatedField>,
  options: QueryOptions
): Promise<ApiTranslatedField[]> => {
  return await TranslatedFieldModel.find(params)
    .limit(options.limit ?? 100)
    .skip(options.skip ?? 0)
    .sort(options.sort)
    .populate(TRANSLATED_PLACE_FIELDS_TO_POPULATE)
    .lean()
    .exec();
};

export const countTranslatedFields = async (
  params: FilterQuery<ApiTranslatedField>
): Promise<number> => {
  return await TranslatedFieldModel.countDocuments(params);
};

export const updateManyTranslatedFields = async (
  params: FilterQuery<ApiTranslatedField>,
  data: Partial<ApiTranslatedField>
): Promise<void> => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  await TranslatedFieldModel.updateMany(params, { $set: data });
};

export const findTranslatedField = async (
  params: FilterQuery<ApiTranslatedField>
): Promise<ApiTranslatedField | null> => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }
  return await TranslatedFieldModel.findOne(params)
    .populate(TRANSLATED_PLACE_FIELDS_TO_POPULATE)
    .lean()
    .exec();
};

/**
 * @summary Search for elements
 * @param {number} lieu_id
 */
export const findParentElements = async (
  lieu_id: number
): Promise<ApiTranslatedField[]> => {
  return TranslatedFieldModel.find({
    elementName: { $in: PLACE_FIELDS_TO_TRANSLATE },
    lieu_id,
    serviceObjectId: null,
  })
    .populate(TRANSLATED_PLACE_FIELDS_TO_POPULATE)
    .lean()
    .exec();
};

export const findServicesForPlace = async (
  params: FilterQuery<ApiTranslatedField>
) => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }
  return await TranslatedFieldModel.find(params)
    .populate(TRANSLATED_PLACE_FIELDS_TO_POPULATE)
    .sort({ serviceObjectId: 1 })
    .lean()
    .exec();
};

export const deleteTranslatedField = async (
  params: FilterQuery<ApiTranslatedField>
): Promise<void> => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }
  await TranslatedFieldModel.deleteMany(params);
};

/**
 * @summary Delete translated places and elements to translate
 * @param  {number} lieu_id
 */
export const deleteTranslationsForPlace = async (
  lieu_id: number
): Promise<void> => {
  await TranslatedFieldModel.deleteMany({ lieu_id });
  await TranslatedPlaceModel.deleteMany({ lieu_id });
};
