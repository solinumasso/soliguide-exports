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
  CampaignPlaceAutonomy,
  CampaignSource,
  CampaignStatus,
} from "@soliguide/common";

import { Schema } from "mongoose";

import { ApiPlaceUpdateCampaign } from "../interfaces";

export const PlaceUpdateCampaignSchema = new Schema<ApiPlaceUpdateCampaign>(
  {
    // Autonomy level
    autonomy: {
      default: CampaignPlaceAutonomy.UNKNOWN,
      enum: CampaignPlaceAutonomy,
      trim: true,
      type: String,
      uppercase: true,
    },

    // Form current step
    currentStep: { default: 0, type: Number },

    // Form status (completed or not, starting date, etc.)
    general: {
      changes: { default: false, type: Boolean },
      endDate: { default: null, type: Date },
      startDate: { default: null, type: Date },
      updated: { default: false, type: Boolean },
    },

    // Reminder
    remindMeDate: { default: null, type: Date },

    // Change details
    sections: {
      tempClosure: {
        changes: { default: false, type: Boolean },
        date: { default: null, type: Date },
        updated: { default: false, type: Boolean },
      },
      hours: {
        changes: { default: false, type: Boolean },
        date: { default: null, type: Date },
        updated: { default: false, type: Boolean },
      },
      services: {
        changes: { default: false, type: Boolean },
        date: { default: null, type: Date },
        updated: { default: false, type: Boolean },
      },
      tempMessage: {
        changes: { default: false, type: Boolean },
        date: { default: null, type: Date },
        updated: { default: false, type: Boolean },
      },
    },

    // Update source
    source: {
      default: null,
      enum: [...Object.values(CampaignSource), null],
      type: String,
    },

    // Update status
    status: {
      default: CampaignStatus.TO_DO,
      enum: CampaignStatus,
      type: String,
    },

    // Whether the place has to be updated during this campaign
    toUpdate: { default: false, required: true, type: Boolean },
  },
  { _id: false }
);
