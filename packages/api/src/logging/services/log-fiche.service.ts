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

import { LogFicheModel } from "../models/log-fiche.model";
import { FICHE_FIELDS_FOR_POPULATE } from "../constants";

export const save = async (fiche: any) => {
  return LogFicheModel.create(fiche);
};

export const findOne = async (params: FilterQuery<any>) => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  return LogFicheModel.findOne(params)
    .populate({ path: "fiche", select: FICHE_FIELDS_FOR_POPULATE })
    .lean()
    .exec();
};

export const updateWithParams = async (
  params: FilterQuery<any>,
  dataToUpdate: any
) => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  await LogFicheModel.updateMany(params, { $set: dataToUpdate }).lean().exec();
};

export const deleteMany = async (params: FilterQuery<any>) => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  return LogFicheModel.deleteMany(params).exec();
};
