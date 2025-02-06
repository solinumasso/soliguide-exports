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
import { USER_FIELDS_NAME } from "../../src/airtable/constants/AT_FIELDS_NAMES.const";

import { AirtableRecordType } from "../../src/_models/airtable/airtableRecord.type";

export const CONTACT: AirtableRecordType = {
  fields: {
    [USER_FIELDS_NAME.EMAIL]: "mail@soliguide.dev",
    [USER_FIELDS_NAME.NAME]: "Marcel",
    [USER_FIELDS_NAME.PHONE]: "0606060606",
    [USER_FIELDS_NAME.PLACES]: [
      "reciuJK0UsZEagBWT",
      "recjDqNnKulcjoCcC",
      "recKWpB9HaTwqkPlJ",
    ],
    [USER_FIELDS_NAME.TITLE]: "Responsable",
  },
  id: "rec01xO176ovLQVix",
};
