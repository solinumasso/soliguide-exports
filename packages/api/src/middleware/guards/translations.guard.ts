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
import { NextFunction } from "express";

import { UserStatus } from "@soliguide/common";

import { findTranslatedField } from "../../translations/services/translatedField.service";

import { ExpressRequest, ExpressResponse } from "../../_models";

export const getTranslatedFieldFromUrl = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  if (
    req.params.translatedFieldObjectId != null && // !null and !undefined
    req.params.translatedFieldObjectId !== "null"
  ) {
    const translatedFieldObjectId = req.params.translatedFieldObjectId;

    try {
      const translatedField = await findTranslatedField({
        _id: translatedFieldObjectId,
      });
      if (translatedField) {
        req.translatedField = translatedField;
        next();
      } else {
        return res.status(400).send({ message: "TRANSLATED_FIELD_NOT_EXIST" });
      }
    } catch (e) {
      return res.status(400).send({ message: "TRANSLATED_FIELD_NOT_EXIST" });
    }
  } else {
    return res.status(400).send({ message: "TRANSLATED_FIELD_ID_NOT_EXIST" });
  }
};

export const isTranslator = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  if (!req.user.isLogged()) {
    return res.status(403).send({ message: "FORBIDDEN_USER" });
  }

  if (
    (req.isAdmin || req.user.translator) &&
    req.user.status !== UserStatus.API_USER
  ) {
    next();
  } else {
    return res.status(403).send({ message: "FORBIDDEN" });
  }
};
