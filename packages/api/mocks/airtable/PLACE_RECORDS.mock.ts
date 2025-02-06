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
import { PLACE_FIELDS_NAME } from "../../src/airtable/constants/AT_FIELDS_NAMES.const";

import { AirtableRecordType } from "../../src/_models/airtable/airtableRecord.type";

export const PLACE_RECORDS: AirtableRecordType[] = [
  {
    fields: {
      [PLACE_FIELDS_NAME.FICHE_ID]: 2963,
      [PLACE_FIELDS_NAME.NAME]: "CSAPA APORIA Nanterre",
    },
    id: "reciuJK0UsZEagBWT",
  },
  {
    fields: {
      [PLACE_FIELDS_NAME.FICHE_ID]: 2961,
      [PLACE_FIELDS_NAME.NAME]: "CSAPA AGATA Rueil-Malmaison",
    },
    id: "recjDqNnKulcjoCcC",
  },
  {
    fields: {
      [PLACE_FIELDS_NAME.FICHE_ID]: 2960,
      [PLACE_FIELDS_NAME.NAME]: "CSAPA AGATA Gennevilliers",
    },
    id: "recKWpB9HaTwqkPlJ",
  },
];
