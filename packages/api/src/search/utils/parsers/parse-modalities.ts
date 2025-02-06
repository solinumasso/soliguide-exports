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
import { SearchModalities } from "@soliguide/common";

export const parseModalities = (
  modalities: SearchModalities,
  nosqlQuery: any,
  inService = false
): void => {
  for (const key of Object.keys(modalities)) {
    const condModalities = modalities[key as keyof SearchModalities];

    if (key !== "inconditionnel") {
      if (inService) {
        nosqlQuery["services_all"]["$elemMatch"][`modalities.${key}.checked`] =
          condModalities;
      } else {
        nosqlQuery["$or"][0]["services_all"]["$elemMatch"][
          `modalities.${key}.checked`
        ] = condModalities;
        nosqlQuery["$or"][1]["$and"].push({
          [`modalities.${key}.checked`]: condModalities,
        });
      }
    } else {
      if (inService) {
        nosqlQuery["services_all"]["$elemMatch"]["modalities.inconditionnel"] =
          condModalities;
      } else {
        nosqlQuery["$or"][0]["services_all"]["$elemMatch"][
          "modalities.inconditionnel"
        ] = condModalities;
        nosqlQuery["$or"][1]["$and"].push({
          ["modalities.inconditionnel"]: condModalities,
        });
      }
    }
  }
};
