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
import { DocsModel } from "../models/document.model";
import { getMongoId } from "../../_utils/functions/mongo/getMongoId";
import { PlaceModel } from "../models/place.model";
import { ApiPlace, CommonPlaceDocument } from "@soliguide/common";
import mongoose, { FilterQuery } from "mongoose";

export class DocumentService {
  public async createDocument(
    data: CommonPlaceDocument
  ): Promise<CommonPlaceDocument> {
    delete data._id;
    return await DocsModel.create(data);
  }

  public updatePlaceByPlaceIdAfterDocUpload(
    lieu_id: number,
    _id: string | mongoose.Types.ObjectId,
    action: "$pull" | "$addToSet",
    serviceId: number | null
  ) {
    const docMongoId = getMongoId(_id);
    const update: FilterQuery<ApiPlace> = {
      [action]: {
        "modalities.docs": docMongoId,
      },
    };

    if (serviceId !== null) {
      update[action] = {
        [`services_all.${serviceId}.modalities.docs`]: docMongoId,
      };
    }

    return PlaceModel.findOneAndUpdate({ lieu_id }, update, { new: true })
      .populate([
        {
          model: "Docs",
          path:
            serviceId !== null
              ? `services_all.${serviceId}.modalities.docs`
              : "modalities.docs",
        },
      ])
      .select(`lieu_id ${serviceId !== null ? "services_all" : "modalities"}`)
      .lean()
      .exec();
  }

  public deleteDocument(
    _id: string | mongoose.Types.ObjectId
  ): Promise<CommonPlaceDocument | null> {
    return DocsModel.findOneAndDelete({
      _id: getMongoId(_id),
    })
      .lean<CommonPlaceDocument>()
      .exec();
  }
}

export default new DocumentService();
