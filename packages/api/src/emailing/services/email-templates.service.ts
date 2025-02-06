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

import EmailTemplateModel from "../models/email-template.model";
import { CampaignEmailTemplates, ModelWithId } from "../../_models";

export const findOneEmailTemplates = async (
  params: FilterQuery<CampaignEmailTemplates>
) => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  return await EmailTemplateModel.findOne(params).lean().exec();
};

export const findEmailTemplates = async (
  params: FilterQuery<CampaignEmailTemplates>
): Promise<
  | ModelWithId<CampaignEmailTemplates>
  | ModelWithId<CampaignEmailTemplates>[]
  | null
> => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  const templates = await EmailTemplateModel.find(params)
    .sort("territory")
    .lean<ModelWithId<CampaignEmailTemplates>[]>()
    .exec();

  if (!templates?.length) {
    return null;
  } else if (templates?.length === 1) {
    return templates[0];
  }

  return templates;
};

export const updatOneEmailTemplate = async (
  params: FilterQuery<CampaignEmailTemplates>,
  dataToUpdate: Partial<CampaignEmailTemplates>
): Promise<ModelWithId<CampaignEmailTemplates> | null> => {
  if (params._id) {
    params._id = new mongoose.Types.ObjectId(params._id);
  }

  return await EmailTemplateModel.findOneAndUpdate(
    params,
    { $set: dataToUpdate },
    { new: true }
  )
    .lean<ModelWithId<CampaignEmailTemplates>>()
    .exec();
};
