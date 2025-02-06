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
import { OpeningHoursSchema } from "./opening-hours.model";
import { PositionSchema } from "./position.model";
import { CommonOpeningHours } from "@soliguide/common";

export const ParcoursSchema = new mongoose.Schema(
  {
    description: {
      default: null,
      trim: true,
      type: String,
    },

    hours: {
      default: new CommonOpeningHours(),
      type: OpeningHoursSchema,
    },

    // Wiser to have pictures for each checkpoint rather than globally
    photos: {
      default: [],
      ref: "Photos",
      type: [mongoose.Schema.Types.ObjectId],
    },

    position: {
      default: null,
      required: true,
      type: PositionSchema,
    },
  },
  { strict: true, _id: false }
);
