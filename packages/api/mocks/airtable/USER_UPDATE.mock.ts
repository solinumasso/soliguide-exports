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
    [CONFIG.AT_FIELD_USER_BLOCKED]: false,
    [CONFIG.AT_FIELD_USER_FIRSTNAME]: "Test firstName",
    [CONFIG.AT_FIELD_USER_LASTNAME]: "Test LastName",
    [CONFIG.AT_FIELD_USER_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_ORGA]: "Nom orga",
    [CONFIG.AT_FIELD_USER_PHONE]: "0606060606",
    [CONFIG.AT_FIELD_USER_STATUS]: "Pro",
    [CONFIG.AT_FIELD_USER_TITLE]: "Bénévole",
    [CONFIG.AT_FIELD_USER_TRANSLATOR]: true,
    [CONFIG.AT_FIELD_USER_VERIFIED]: true,
    [CONFIG.AT_FIELD_USER_DELETED]: false,
    [CONFIG.AT_FIELD_USER_ID]: 32,
  },
  id: "recuxxxxxxxxxxxx0",
};

export const REQUEST_SUCCESS_SHORT: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_PHONE]: "0606060606",
    [CONFIG.AT_FIELD_USER_STATUS]: "Pro",
    [CONFIG.AT_FIELD_USER_TITLE]: "Bénévole",
    [CONFIG.AT_FIELD_USER_TRANSLATOR]: true,
    [CONFIG.AT_FIELD_USER_VERIFIED]: true,
    [CONFIG.AT_FIELD_USER_DELETED]: false,
    [CONFIG.AT_FIELD_USER_ID]: 32,
  },
  id: "recuxxxxxxxxxxxx1",
};

export const REQUEST_FAILURE_WRONG_TYPE1: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_BLOCKED]: "false",
    [CONFIG.AT_FIELD_USER_FIRSTNAME]: "Test firstName",
    [CONFIG.AT_FIELD_USER_LASTNAME]: "Test LastName",
    [CONFIG.AT_FIELD_USER_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_ORGA]: "Nom orga",
    [CONFIG.AT_FIELD_USER_PHONE]: "0606060606",
    [CONFIG.AT_FIELD_USER_STATUS]: "Pro",
    [CONFIG.AT_FIELD_USER_TITLE]: "Bénévole",
    [CONFIG.AT_FIELD_USER_TRANSLATOR]: true,
    [CONFIG.AT_FIELD_USER_VERIFIED]: true,
    [CONFIG.AT_FIELD_USER_DELETED]: false,
    [CONFIG.AT_FIELD_USER_ID]: 32,
  },
  id: "recuxxxxxxxxxxxx0",
};

export const REQUEST_FAILURE_WRONG_TYPE2: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_BLOCKED]: false,
    [CONFIG.AT_FIELD_USER_FIRSTNAME]: "Test firstName",
    [CONFIG.AT_FIELD_USER_LASTNAME]: "Test LastName",
    [CONFIG.AT_FIELD_USER_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_ORGA]: "Nom orga",
    [CONFIG.AT_FIELD_USER_PHONE]: "0606060606",
    [CONFIG.AT_FIELD_USER_STATUS]: "Pro",
    [CONFIG.AT_FIELD_USER_TITLE]: "Bénévole",
    [CONFIG.AT_FIELD_USER_TRANSLATOR]: true,
    [CONFIG.AT_FIELD_USER_VERIFIED]: true,
    [CONFIG.AT_FIELD_USER_DELETED]: false,
    [CONFIG.AT_FIELD_USER_ID]: "32",
  },
  id: "recuxxxxxxxxxxxx0",
};

export const REQUEST_FAILURE_NON_EXISTING_ELEMENT: AirtableRecordType = {
  fields: {
    [CONFIG.AT_FIELD_USER_BLOCKED]: false,
    [CONFIG.AT_FIELD_USER_FIRSTNAME]: "Test firstName",
    [CONFIG.AT_FIELD_USER_LASTNAME]: "Test LastName",
    [CONFIG.AT_FIELD_USER_EMAIL]: "test@test.test",
    [CONFIG.AT_FIELD_USER_ORGA]: "Nom orga",
    [CONFIG.AT_FIELD_USER_PHONE]: "0606060606",
    [CONFIG.AT_FIELD_USER_STATUS]: "Rockstar",
    [CONFIG.AT_FIELD_USER_TITLE]: "Bénévole",
    [CONFIG.AT_FIELD_USER_TRANSLATOR]: true,
    [CONFIG.AT_FIELD_USER_VERIFIED]: false,
    [CONFIG.AT_FIELD_USER_DELETED]: false,
    [CONFIG.AT_FIELD_USER_ID]: 32,
  },
  id: "recuxxxxxxxxxxxx0",
};

export const RESPONSE_SUCCESS: (AirtableRecordType & {
  getId(): string | undefined;
})[] = [
  {
    ...REQUEST_SUCCESS,
    getId: (): string | undefined => {
      return REQUEST_SUCCESS.id;
    },
  },
  {
    ...REQUEST_SUCCESS_SHORT,
    getId: (): string | undefined => {
      return REQUEST_SUCCESS_SHORT.id;
    },
  },
];

export const FIELD_ID_TYPE: KeyStringValueString = {
  [CONFIG.AT_FIELD_USER_BLOCKED]: "boolean",
  [CONFIG.AT_FIELD_USER_ORGA]: "string",
  [CONFIG.AT_FIELD_USER_ID]: "number",
  [CONFIG.AT_FIELD_USER_TITLE]: "string",
  [CONFIG.AT_FIELD_USER_STATUS]: "statusString",
  [CONFIG.AT_FIELD_USER_EMAIL]: "string",
  [CONFIG.AT_FIELD_USER_LASTNAME]: "string",
  [CONFIG.AT_FIELD_USER_FIRSTNAME]: "string",
  [CONFIG.AT_FIELD_USER_PHONE]: "string",
  [CONFIG.AT_FIELD_USER_VERIFIED]: "boolean",
  [CONFIG.AT_FIELD_USER_DELETED]: "boolean",
  [CONFIG.AT_FIELD_USER_TRANSLATOR]: "boolean",
};

export const GOOD_RECORD_IDS = ["recuxxxxxxxxxxxx0", "recuxxxxxxxxxxxx1"];
