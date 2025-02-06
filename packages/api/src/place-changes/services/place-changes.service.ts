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
import mongoose, { FilterQuery } from "mongoose";
import { PlaceChangesModel } from "../models/place-changes.model";
import {
  PlaceChanges,
  PlaceChangesPopulate,
} from "../interfaces/PlaceChanges.interface";
import { DEFAULT_SEARCH_OPTIONS } from "../../_utils/constants";
import { getMongoId } from "../../_utils/functions/mongo";
import { PlaceChangesSection } from "@soliguide/common";

/**
 * find - find changes
 * @param {Object} params - place.lieu_id
 */
export const findPlaceChanges = (
  params: FilterQuery<PlaceChanges>,
  options: any = DEFAULT_SEARCH_OPTIONS,
  light = false
): Promise<PlaceChangesPopulate[]> => {
  return PlaceChangesModel.find(params)
    .populate([{ path: "place", select: "name" }])
    .limit(options.limit)
    .skip(options.skip)
    .sort(options.sort)
    .select(light ? "" : "-old -new -__v -updatedAt")
    .lean<PlaceChangesPopulate[]>()
    .exec();
};

export const countPlaceChanges = (
  params: FilterQuery<PlaceChanges>
): Promise<number> => {
  return PlaceChangesModel.countDocuments(params).exec();
};

export const updatePlaceChangeWithParams = (
  params: FilterQuery<PlaceChanges>,
  dataToUpdate: Partial<PlaceChanges>
): Promise<PlaceChanges | null> => {
  if (params._id) {
    params._id = getMongoId(params._id);
  }

  return PlaceChangesModel.findOneAndUpdate(
    params,
    { $set: dataToUpdate },
    { new: true }
  ).exec();
};

export const updatePlaceChangesWithParams = async (
  params: FilterQuery<PlaceChanges>,
  dataToUpdate: Partial<PlaceChanges>
): Promise<void> => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  await PlaceChangesModel.updateMany(params, { $set: dataToUpdate })
    .lean()
    .exec();
};

/**
 * find - Search for a change to look for the change in the change log
 * @param {Object} params  ObjectId
 */
export const findOnePlaceChanges = async (
  params: FilterQuery<PlaceChanges>
): Promise<PlaceChanges | null> => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  const change = await PlaceChangesModel.findOne<PlaceChanges>(params)
    .lean()
    .exec();

  if (
    change?.section === PlaceChangesSection.emplacement ||
    change?.section === PlaceChangesSection.photos
  ) {
    const path =
      change?.section === PlaceChangesSection.emplacement
        ? ".parcours.photos"
        : "";

    return PlaceChangesModel.findOne(params)
      .populate([
        {
          model: "Photos",
          path: `old${path}`,
        },
        {
          model: "Photos",
          path: `new${path}`,
        },
      ])
      .lean()
      .exec();
  }

  return change;
};

export const savePlaceChanges = (
  changesToSave: Partial<PlaceChanges>
): Promise<PlaceChanges> => {
  // TODO: update all changes without territories with the same "lieu_id"
  return new PlaceChangesModel(changesToSave).save();
};
