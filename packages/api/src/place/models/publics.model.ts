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
  ADMINISTRATIVE_DEFAULT_VALUES,
  FAMILY_DEFAULT_VALUES,
  GENDER_DEFAULT_VALUES,
  OTHER_DEFAULT_VALUES,
  WelcomedPublics,
} from "@soliguide/common";

import { Schema } from "mongoose";

import {
  administrativeSituationsValidator,
  familySituationsValidator,
  gendersValidator,
  otherSituationsValidator,
} from "./validators";

import { ApiPublics } from "../interfaces";

export const PublicsSchema = new Schema<ApiPublics>(
  {
    accueil: {
      default: WelcomedPublics.UNCONDITIONAL,
      enum: WelcomedPublics,
      type: Number,
    },

    administrative: {
      default: ADMINISTRATIVE_DEFAULT_VALUES,
      type: [String],
      validate: administrativeSituationsValidator,
    },

    age: {
      max: { default: 99, type: Number },
      min: { default: 0, type: Number },
    },

    description: {
      default: null,
      type: String,
    },

    familialle: {
      default: FAMILY_DEFAULT_VALUES,
      type: [String],
      validate: familySituationsValidator,
    },

    gender: {
      default: GENDER_DEFAULT_VALUES,
      type: [String],
      validate: gendersValidator,
    },

    other: {
      default: OTHER_DEFAULT_VALUES,
      type: [String],
      validate: otherSituationsValidator,
    },
  },
  { strict: true, _id: false }
);
