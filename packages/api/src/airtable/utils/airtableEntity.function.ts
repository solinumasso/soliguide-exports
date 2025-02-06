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
  AirtableEntity,
  AirtableEntityType,
} from "../../_models/airtable/airtableEntity.type";

export const getEntityId = (
  airtableEntity: AirtableEntity,
  airtableEntityType: AirtableEntityType
): number => {
  if (airtableEntityType === AirtableEntityType.USER) {
    return airtableEntity.user_id;
  } else if (airtableEntityType === AirtableEntityType.PLACE) {
    return airtableEntity.lieu_id;
  } else {
    throw new Error("WRONG_ENTITY_TYPE");
  }
};
export const getEntityIdName = (
  airtableEntityType: AirtableEntityType
): string => {
  if (airtableEntityType === AirtableEntityType.USER) {
    return "user_id";
  } else if (airtableEntityType === AirtableEntityType.PLACE) {
    return "lieu_id";
  } else {
    throw new Error("WRONG_ENTITY_TYPE");
  }
};
