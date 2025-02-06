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
import mongoose from "mongoose";

import { ApiTranslatedPlace } from "../interfaces";
import { PositionForTranslationSchema } from "./subschemas/positionForTranslation.model";
import { SUPPORTED_LANGUAGES } from "@soliguide/common";

const TranslatedPlaceSchema = new mongoose.Schema<ApiTranslatedPlace>(
  {
    sourceLanguage: {
      type: String,
      enum: [...SUPPORTED_LANGUAGES],
      required: true,
    },

    languages: {
      type: Object,
      default: {},
      required: true,
    },
    lastUpdate: { default: Date.now(), type: Date },
    lieu_id: { index: true, unique: true, type: Number },
    placeObjectId: {
      ref: "Place",
      type: mongoose.Schema.Types.ObjectId,
    },
    position: {
      type: PositionForTranslationSchema,
    },
    // Translation rate, all languages combined
    translationRate: {
      default: 0,
      type: Number,
      index: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TranslatedPlaceSchema.index({ createdAt: 1, updatedAt: 1 });
TranslatedPlaceSchema.virtual("place", {
  ref: "Place",
  localField: "placeObjectId",
  foreignField: "_id",
  justOne: true,
});

export const TranslatedPlaceModel = mongoose.model(
  "TranslatedPlace",
  TranslatedPlaceSchema,
  "translatedPlaces"
);
