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

import { AirtableSyncType } from "../../_models";

export const AirtableSyncSchema = new Schema<AirtableSyncType>(
  {
    _id: false,
    airtableContact: { default: false, type: Boolean },
    airtableId: { default: "", type: String },
    excluded: { default: true, type: Boolean },
    lastSync: { default: null, type: Date },
  },
  {
    strict: true,
  }
);

export const AIRTABLE_SYNC_DEFAULT: AirtableSyncType = {
  airtableId: "",
  excluded: true,
  lastSync: null,
};

export const AIRTABLE_SYNC_DEFAULT_USER: AirtableSyncType = {
  airtableContact: false,
  ...AIRTABLE_SYNC_DEFAULT,
};
