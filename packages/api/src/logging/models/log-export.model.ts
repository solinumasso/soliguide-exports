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
  FILE_TYPES,
  ExportFileType,
  GeoTypes,
  SortingFilters,
  SortingOrder,
  WelcomedPublics,
  Categories,
  PLACE_LANGUAGES_LIST_MAP_KEY_FOR_LOGS,
} from "@soliguide/common";

import mongoose from "mongoose";

import { UserForLogsSchema } from "./subschemas/user-for-logs.schema";

import { locationAreasSchema } from "../../search/models/subschemas/location-areas.model";
import { LogExport } from "../interfaces/log-export.interface";

const LogExportSchema = new mongoose.Schema<LogExport>(
  {
    category: {
      enum: [...Object.values(Categories), null],
      default: null,
      type: String,
    },

    // Date when the export ended
    exportEndedAt: {
      default: null,
      required: true,
      type: Date,
    },

    // Date when the export started
    exportStartedAt: {
      default: null,
      required: true,
      type: Date,
    },

    // Export file format
    fileType: {
      default: ExportFileType.CSV,
      enum: FILE_TYPES,
      required: true,
      trim: true,
      type: String,
      uppercase: true,
    },

    languages: {
      default: null,
      enum: PLACE_LANGUAGES_LIST_MAP_KEY_FOR_LOGS,
      lowercase: true,
      trim: true,
      type: String,
    },

    location: {
      areas: locationAreasSchema,
      coordinates: {
        default: [0, 0],
        type: [Number],
      },
      distance: {
        default: null,
        type: Number,
      },
      geoType: {
        default: null,
        enum: GeoTypes,
        trim: true,
        type: String,
      },
      geoValue: {
        default: null,
        index: true,
        lowercase: true,
        trim: true,
        type: String,
      },
      label: {
        default: null,
        index: true,
        trim: true,
        type: String,
      },
    },

    modalities: {
      animal: {
        type: Boolean,
      },
      appointment: {
        type: Boolean,
      },
      inconditionnel: {
        type: Boolean,
      },
      inscription: {
        type: Boolean,
      },
      orientation: {
        type: Boolean,
      },
      pmr: {
        type: Boolean,
      },
      price: {
        type: Boolean,
      },
    },

    // Number of search results
    nbResults: {
      default: 0,
      required: true,
      type: Number,
    },

    options: {
      limit: {
        type: Number,
      },
      page: {
        type: Number,
      },
      sortBy: {
        type: String,
      },
      sortValue: {
        enum: SortingOrder,
        type: Number,
      },
    },

    publics: {
      accueil: {
        enum: WelcomedPublics,
        type: Number,
      },
      administrative: {
        enum: ADMINISTRATIVE_DEFAULT_VALUES,
        type: [String],
      },
      age: {
        type: Number,
      },
      familialle: {
        enum: FAMILY_DEFAULT_VALUES,
        type: [String],
      },
      gender: {
        enum: GENDER_DEFAULT_VALUES,
        type: [String],
      },
      other: {
        enum: OTHER_DEFAULT_VALUES,
        type: [String],
      },
    },

    selectedParams: {
      modalities: {
        type: Boolean,
      },
      email: {
        type: Boolean,
      },
      hours: {
        type: Boolean,
      },
      linkToSoliguide: {
        type: Boolean,
      },
      phone: {
        type: Boolean,
      },
      publics: {
        type: Boolean,
      },
      services: {
        type: Boolean,
      },
      tempClosure: {
        type: Boolean,
      },
      tempMessage: {
        type: Boolean,
      },
    },

    sortingFilter: {
      default: null,
      enum: [...Object.values(SortingFilters), null],
      type: String,
    },

    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },

    userData: {
      type: UserForLogsSchema,
    },

    word: {
      default: null,
      type: String,
    },
  },
  {
    collection: "logExports",
    strict: true,
    timestamps: true,
  }
);

export const LogExportModel = mongoose.model("LogExport", LogExportSchema);
