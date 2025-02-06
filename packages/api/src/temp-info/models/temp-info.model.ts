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
import { ObjectId } from "mongodb";
import mongoose, { Schema, model } from "mongoose";

import { TempInfoType, TempInfoStatus } from "@soliguide/common";

import { OpeningHoursSchema } from "../../place/models";
import type { TempInfo } from "../types";

const TempInfoSchema = new Schema<TempInfo>(
  {
    dateDebut: { required: true, type: Date },

    dateFin: { default: null, type: Date },

    description: { default: null, trim: true, type: String },

    hours: { default: null, type: OpeningHoursSchema },

    name: { default: null, trim: true, type: String },

    // Number of days this info is valid
    nbDays: { default: null, type: Number },

    place: {
      ref: "Place",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    placeId: { required: true, type: Number },

    // Service ObjectID if this info is linked to a service
    serviceObjectId: { default: null, type: ObjectId },

    status: {
      default: TempInfoStatus.FUTURE,
      enum: TempInfoStatus,
      required: true,
      type: String,
    },

    tempInfoType: {
      enum: TempInfoType,
      required: true,
      type: String,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

TempInfoSchema.index(
  {
    dateDebut: 1,
    placeId: 1,
    serviceObjectId: 1,
    tempInfoType: 1,
  },
  { unique: true }
);

export const TempInfoModel = model("TempInfo", TempInfoSchema, "tempInfos");
