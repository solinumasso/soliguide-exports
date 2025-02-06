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

import type { TempServiceClosure } from "../interfaces";

// Collection to gather temporary closures planned on services
const TempServiceClosureSchema = new mongoose.Schema<TempServiceClosure>(
  {
    startDate: { required: true, type: Date },
    endDate: { default: null, type: Date },
    nbDays: { default: null, type: Number },
    place: { required: true, type: mongoose.Schema.Types.ObjectId },
    serviceObjectId: { required: true, type: mongoose.Schema.Types.ObjectId },
    campaign: { default: null, type: String },
  },
  { strict: true, timestamps: true }
);

TempServiceClosureSchema.index(
  { serviceObjectId: 1, startDate: 1 },
  { unique: true }
);

export const TempServiceClosureModel = mongoose.model<TempServiceClosure>(
  "TempServiceClosure",
  TempServiceClosureSchema,
  "tempServiceClosures"
);
