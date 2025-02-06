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
import { AIRTABLE_MOCKS } from "./airtable";

import { CONFIG } from "../src/_models/config/constants/CONFIG.const";

const airtableTableIdReverse: { [key: string]: "USER" } = {
  [CONFIG.AT_TABLE_ID_USER]: "USER",
};

let AIRTABLE_MOCKS_ENTITY: any;
let AIRTABLE_HELPERS_ENTITY: any;

export const AIRTABLE_MODULE = (tableId: string) => {
  if (!Object.prototype.hasOwnProperty.call(airtableTableIdReverse, tableId)) {
    throw new Error("The table name is incorrect");
  }

  AIRTABLE_MOCKS_ENTITY = AIRTABLE_MOCKS[airtableTableIdReverse[tableId]].MOCK;
  AIRTABLE_HELPERS_ENTITY = AIRTABLE_MOCKS.HELPERS;

  return { create, update };
};

const create = (records: any[]) => {
  for (const recordToCreate of records) {
    try {
      AIRTABLE_HELPERS_ENTITY.checkFieldsName(
        recordToCreate.fields,
        AIRTABLE_MOCKS_ENTITY.CREATION.FIELD_ID_TYPE
      );

      AIRTABLE_HELPERS_ENTITY.checkFieldsType(
        recordToCreate.fields,
        AIRTABLE_MOCKS_ENTITY.CREATION.FIELD_ID_TYPE
      );
    } catch (e) {
      throw new Error(e);
    }

    return AIRTABLE_MOCKS_ENTITY.CREATION.RESPONSE_SUCCESS;
  }
};

const update = (records: any[]) => {
  for (const recordToCreate of records) {
    try {
      AIRTABLE_HELPERS_ENTITY.checkFieldsName(
        recordToCreate.fields,
        AIRTABLE_MOCKS_ENTITY.UPDATE.FIELD_ID_TYPE
      );

      AIRTABLE_HELPERS_ENTITY.checkFieldsType(
        recordToCreate.fields,
        AIRTABLE_MOCKS_ENTITY.UPDATE.FIELD_ID_TYPE
      );
    } catch (e) {
      throw new Error(e);
    }

    return AIRTABLE_MOCKS_ENTITY.UPDATE.RESPONSE_SUCCESS;
  }
};
