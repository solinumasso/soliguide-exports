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
import type { NextFunction } from "express";
import { ClassType, transformAndValidate } from "class-transformer-validator";

import type { ExpressResponse, ValidatedBodyExpressRequest } from "../_models";

export const validateBodyMiddlewareGenerator = <T extends object>(
  classType: ClassType<T>
) => {
  return async (
    req: ValidatedBodyExpressRequest<T>,
    res: ExpressResponse,
    next: NextFunction
  ) => {
    try {
      // transform and validate request body
      const validatedBody = await transformAndValidate(classType, req.body);
      if (Array.isArray(validatedBody)) {
        throw new Error("Body must not be an array");
      }
      // infered type of validatedBody is T, you can access all class prototype properties and methods
      req.validatedBody = validatedBody;
    } catch (err) {
      // your error handling
      return res.status(400).json(err);
    }
    return next();
  };
};
