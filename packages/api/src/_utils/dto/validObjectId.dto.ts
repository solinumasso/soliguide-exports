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
import { ObjectId } from "bson";

import { body } from "express-validator";

import mongoose from "mongoose";

import { CHECK_STRING_NULL } from "../../config/expressValidator.config";

export const validObjectIdDto = [
  body("_id")
    .exists()
    .custom((value) => {
      return ObjectId.isValid(value);
    }),
];

export const parseObjectIdOptionalDto = [
  body("_id")
    .if(body("_id").exists(CHECK_STRING_NULL))
    .custom((value) => {
      if (!value) {
        return true;
      }
      return ObjectId.isValid(value);
    })
    .customSanitizer((value) => {
      if (value) {
        return new mongoose.Types.ObjectId(value);
      }
      return null;
    }),
];

export const parseServiceObjectIdDto = [
  body("serviceObjectId")
    .if(body("serviceObjectId").exists(CHECK_STRING_NULL))
    .custom((value) => {
      return ObjectId.isValid(value);
    })
    .customSanitizer((value) => {
      if (value) {
        return new mongoose.Types.ObjectId(value);
      }
      return null;
    }),
];
