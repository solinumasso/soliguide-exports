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
import { KeyStringValueString } from "@soliguide/common";

import { CONFIG, AirtableRecordType } from "../../src/_models";

export const REQUEST_SUCCESS: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_CREATION_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_CREATION_NAME]: "John Doe",
    [CONFIG.AT_FIELD_USER_CREATION_PHONE]: "0606060606",
    [CONFIG.AT_FIELD_USER_CREATION_TERRITORIES]: ["75"],
    [CONFIG.AT_FIELD_USER_CREATION_TITLE]: "",
    [CONFIG.AT_FIELD_USER_ID]: 32,
  },
};

export const REQUEST_FAILURE_WRONG_TYPE1: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_CREATION_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_CREATION_NAME]: "John Doe",
    [CONFIG.AT_FIELD_USER_CREATION_PHONE]: 60606,
    [CONFIG.AT_FIELD_USER_CREATION_TERRITORIES]: ["75"],
    [CONFIG.AT_FIELD_USER_CREATION_TITLE]: "",
    [CONFIG.AT_FIELD_USER_ID]: "32",
  },
};

export const REQUEST_FAILURE_WRONG_TYPE2: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_CREATION_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_CREATION_NAME]: "John Doe",
    [CONFIG.AT_FIELD_USER_CREATION_PHONE]: 60606,
    [CONFIG.AT_FIELD_USER_CREATION_TERRITORIES]: ["75", 45],
    [CONFIG.AT_FIELD_USER_CREATION_TITLE]: "",
    [CONFIG.AT_FIELD_USER_ID]: 32,
  },
};

export const REQUEST_FAILURE_NON_EXISTING_ELEMENT: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_CREATION_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_CREATION_NAME]: "John Doe",
    [CONFIG.AT_FIELD_USER_CREATION_PHONE]: "0606060606",
    [CONFIG.AT_FIELD_USER_CREATION_TERRITORIES]: ["75", "645"],
    [CONFIG.AT_FIELD_USER_CREATION_TITLE]: "",
    [CONFIG.AT_FIELD_USER_ID]: 32,
  },
};

export const RESPONSE_SUCCESS: (AirtableRecordType & {
  getId(): string | undefined;
})[] = [
  {
    ...REQUEST_SUCCESS,
    getId: () => {
      return RESPONSE_SUCCESS[0].id;
    },
  },
];

export const FIELD_ID_TYPE: KeyStringValueString = {
  [CONFIG.AT_FIELD_USER_CREATION_NAME]: "string",
  [CONFIG.AT_FIELD_USER_CREATION_PHONE]: "string",
  [CONFIG.AT_FIELD_USER_CREATION_EMAIL]: "string",
  [CONFIG.AT_FIELD_USER_CREATION_TITLE]: "string",
  [CONFIG.AT_FIELD_USER_CREATION_TERRITORIES]: "arrayOfStringTerritories",
  [CONFIG.AT_FIELD_USER_ID]: "number",
};
