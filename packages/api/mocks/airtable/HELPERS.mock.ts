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
  KeyStringValueString,
  DEPARTMENT_CODES,
  CountryCodes,
} from "@soliguide/common";

import { USER_STATUS } from "../../src/airtable/constants/AT_FIELDS_VALUES.const";

import { AirtableEntityType } from "../../src/_models/airtable/airtableEntity.type";

import {
  RESPONSE_FAILURE_FIELD_NOT_EXISTS,
  RESPONSE_FAILURE_WRONG_TYPE,
  RESPONSE_FAILURE_ELEMENT_NOT_EXISTS,
  RECORD_ID_NOT_EXISTS,
} from "./ERROR.mock";

export const checkFieldsName = (
  dataToCheck: any,
  FIELD_ID_TYPE: KeyStringValueString
) => {
  for (const fieldId in dataToCheck) {
    if (Object.prototype.hasOwnProperty.call(dataToCheck, fieldId)) {
      if (Object.prototype.hasOwnProperty.call(FIELD_ID_TYPE, fieldId)) {
        continue;
      } else {
        throw new Error(RESPONSE_FAILURE_FIELD_NOT_EXISTS);
      }
    }
  }
};

export const checkFieldsType = (
  dataToCheck: any,
  FIELD_ID_TYPE: KeyStringValueString
) => {
  for (const fieldId in dataToCheck) {
    if (Object.prototype.hasOwnProperty.call(dataToCheck, fieldId)) {
      if (FIELD_ID_TYPE[fieldId] === "arrayOfString") {
        if (typeof dataToCheck[fieldId] === "object") {
          for (const value of dataToCheck[fieldId]) {
            if (typeof value === "string") {
              continue;
            } else {
              throw new Error(RESPONSE_FAILURE_WRONG_TYPE);
            }
          }
        } else if (
          dataToCheck[fieldId] === null ||
          typeof dataToCheck[fieldId] === "undefined"
        ) {
          continue;
        } else {
          throw new Error(RESPONSE_FAILURE_WRONG_TYPE);
        }
      } else if (FIELD_ID_TYPE[fieldId] === "arrayOfStringTerritories") {
        if (typeof dataToCheck[fieldId] === "object") {
          for (const value of dataToCheck[fieldId]) {
            if (DEPARTMENT_CODES[CountryCodes.FR].includes(value)) {
              continue;
            } else {
              throw new Error(RESPONSE_FAILURE_ELEMENT_NOT_EXISTS);
            }
          }
        } else if (
          dataToCheck[fieldId] === null ||
          typeof dataToCheck[fieldId] === "undefined"
        ) {
          continue;
        } else {
          throw new Error(RESPONSE_FAILURE_WRONG_TYPE);
        }
      } else if (FIELD_ID_TYPE[fieldId] === "statusString") {
        if (typeof dataToCheck[fieldId] === "string") {
          if (Object.values(USER_STATUS).includes(dataToCheck[fieldId])) {
            continue;
          } else {
            throw new Error(RESPONSE_FAILURE_ELEMENT_NOT_EXISTS);
          }
        } else if (
          dataToCheck[fieldId] === null ||
          typeof dataToCheck[fieldId] === "undefined"
        ) {
          continue;
        } else {
          throw new Error(RESPONSE_FAILURE_WRONG_TYPE);
        }
      } else {
        if (typeof dataToCheck[fieldId] === FIELD_ID_TYPE[fieldId]) {
          continue;
        } else {
          throw new Error(RESPONSE_FAILURE_WRONG_TYPE);
        }
      }
    }
  }
};

export const checkRecordIdExists = (
  recordId: string,
  airtableEntityType: AirtableEntityType
) => {
  if (
    (airtableEntityType === AirtableEntityType.USER &&
      recordId !== "recuxxxxxxxxxxxxx") ||
    (airtableEntityType === AirtableEntityType.PLACE &&
      recordId !== "recpxxxxxxxxxxxxx")
  )
    throw new Error(RECORD_ID_NOT_EXISTS);
};
