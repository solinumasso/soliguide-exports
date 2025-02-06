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
import { Schema } from "mongoose";

import { ApiPhone } from "../interfaces";
import { COUNTRIES_CALLING_CODES } from "@soliguide/common";

export const PhoneSchema = new Schema<ApiPhone>(
  {
    label: { default: null, trim: true, type: String },
    phoneNumber: { default: null, trim: true, type: String },
    countryCode: {
      trim: true,
      type: String,
      lowercase: true,
      required: true,
      enum: Object.keys(COUNTRIES_CALLING_CODES),
    },
    isSpecialPhoneNumber: { default: false, type: Boolean },
  },
  { _id: false }
);
