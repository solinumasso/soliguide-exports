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
import { SUPPORTED_LANGUAGES, TranslatedFieldStatus } from "@soliguide/common";

import mongoose from "mongoose";

import { ALL_FIELDS_TO_TRANSLATE } from "../constants";

import { ApiTranslatedField } from "../interfaces";
import { PositionForTranslationSchema } from "./subschemas/positionForTranslation.model";

const TranslatedFieldSchema = new mongoose.Schema<ApiTranslatedField>(
  {
    content: {
      default: null,
      required: true,
      type: String,
    },
    elementName: {
      enum: ALL_FIELDS_TO_TRANSLATE,
      required: true,
      type: String,
      index: true,
    },
    sourceLanguage: {
      type: String,
      required: true,
      enum: [...SUPPORTED_LANGUAGES],
    },
    languages: {
      type: Object,
      default: {},
      required: true,
    },
    lieu_id: {
      index: true,
      required: true,
      type: Number,
    },
    placeObjectId: {
      ref: "Place",
      type: mongoose.Schema.Types.ObjectId,
    },
    position: {
      type: PositionForTranslationSchema,
    },
    serviceObjectId: {
      default: null,
      index: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      default: TranslatedFieldStatus.NEED_AUTO_TRANSLATE,
      enum: TranslatedFieldStatus,
      required: true,
      type: String,
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

TranslatedFieldSchema.index({ createdAt: 1, updatedAt: 1 });

TranslatedFieldSchema.virtual("place", {
  ref: "Place",
  localField: "placeObjectId",
  foreignField: "_id",
  justOne: true,
});

export const TranslatedFieldModel = mongoose.model(
  "TranslatedField",
  TranslatedFieldSchema,
  "translatedFields"
);
