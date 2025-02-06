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
import {
  ALL_DEPARTMENT_CODES,
  CampaignName,
  CountryCodes,
  PlaceChangesSection,
  PlaceChangesStatus,
  PlaceType,
} from "@soliguide/common";

import mongoose, { Schema, model } from "mongoose";

import { UserForLogsSchema } from "../../logging/models/subschemas/user-for-logs.schema";
import { PlaceChanges } from "../interfaces/PlaceChanges.interface";

// Store the change log
const PlaceChangesSchema = new Schema<PlaceChanges>(
  {
    // Update by the bof
    automation: {
      default: false,
      type: Boolean,
    },

    campaignName: {
      enum: [...Object.values(CampaignName), null],
      default: null,
      type: String,
      index: true,
    },

    isCampaign: {
      default: false,
      required: true,
      type: Boolean,
      index: true,
    },

    lieu_id: {
      required: true,
      index: true,
      type: Number,
    },

    new: {
      default: null,
      type: Object,
    },

    noChanges: {
      default: false,
      type: Boolean,
    },

    old: {
      default: null,
      type: Object,
    },

    place: {
      ref: "Place",
      type: mongoose.Schema.Types.ObjectId,
    },

    placeOnline: {
      default: true,
      required: true,
      type: Boolean,
    },

    placeType: {
      default: PlaceType.PLACE,
      enum: PlaceType,
      required: true,
      index: true,
      type: String,
    },

    // Edited form sections
    section: {
      index: true,
      enum: PlaceChangesSection,
      required: true,
      type: String,
    },

    status: {
      index: true,
      default: PlaceChangesStatus.NOT_EVALUATED,
      enum: PlaceChangesStatus,
      type: String,
    },

    territory: {
      index: true,
      default: null,
      enum: [...ALL_DEPARTMENT_CODES, null],
      type: String,
    },
    country: {
      default: null,
      enum: [...Object.values(CountryCodes), null],
      type: String,
    },

    userData: {
      type: UserForLogsSchema,
    },
  },
  {
    collection: "placeChanges",
    strict: true,
    timestamps: true,
  }
);

PlaceChangesSchema.index({ createdAt: 1, updatedAt: 1 });

export const PlaceChangesModel = model<PlaceChanges>(
  "PlaceChanges",
  PlaceChangesSchema
);
