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
import { Types } from "mongoose";

import { PhotoModel } from "../models/photo.model";

import { ApiPlacePhoto, ModelWithId } from "../../_models";

import { getMongoId } from "../../_utils/functions/mongo/getMongoId";

import { PlaceModel } from "../../place/models/place.model";
import { ApiPlace } from "@soliguide/common";

export const createPhoto = async (data: any): Promise<ApiPlacePhoto> => {
  return new PhotoModel(data).save();
};

export const updatePlaceByPlaceIdAfterPhotoUpload = (
  lieu_id: number,
  _id: string,
  action: "$pull" | "$addToSet",
  parcoursId: number | null
): Promise<ModelWithId<ApiPlace> | null> => {
  const photoMongoId = new Types.ObjectId(_id);
  const update: any = {
    [action]: {
      photos: photoMongoId,
    },
  };

  if (parcoursId !== null) {
    update[action] = {
      [`parcours.${parcoursId}.photos`]: photoMongoId,
    };
  }

  return PlaceModel.findOneAndUpdate({ lieu_id }, update, { new: true })
    .populate(["photos"])
    .populate([
      {
        model: "Photos",
        path: parcoursId !== null ? `parcours.${parcoursId}.photos` : "photos",
      },
    ])
    .select(`lieu_id ${parcoursId !== null ? "parcours" : "photos"}`)
    .lean<ModelWithId<ApiPlace>>()
    .exec();
};

export const deletePhoto = async (
  _id: string
): Promise<ApiPlacePhoto | null> => {
  return await PhotoModel.findOneAndDelete({
    _id: getMongoId(_id),
  })
    .lean<ApiPlacePhoto>()
    .exec();
};
