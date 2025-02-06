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
import { CommonPlaceDocument } from "@soliguide/common";
import { Schema, model } from "mongoose";

const DocsSchema = new Schema<CommonPlaceDocument>(
  {
    encoding: { default: null, type: String },
    filename: { default: null, type: String },
    lieu_id: { required: true, type: Number },
    mimetype: { required: true, type: String },
    name: { required: true, type: String },
    path: { required: true, type: String },
    serviceId: { type: Number },
    size: { type: Number },
  },
  { collection: "docs", strict: true, timestamps: true }
);

export const DocsModel = model<CommonPlaceDocument>("Docs", DocsSchema);
