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
import { PublicsElement, SearchPublics } from "@soliguide/common";

export const parsePublics = (
  publics: SearchPublics,
  nosqlQuery: any,
  inService: boolean = false
): void => {
  for (const key of Object.keys(publics)) {
    if (key === "age") {
      const age = publics[key];

      if (age && 0 < age && age < 99) {
        const condAgeMin = { $lte: age };
        const condAgeMax = { $gte: age };

        if (inService) {
          nosqlQuery["services_all"]["$elemMatch"][`publics.${key}.min`] =
            condAgeMin;
          nosqlQuery["services_all"]["$elemMatch"][`publics.${key}.max`] =
            condAgeMax;
        } else {
          // No category, we look into services
          nosqlQuery["$or"][0]["services_all"]["$elemMatch"][
            `publics.${key}.min`
          ] = condAgeMin;
          nosqlQuery["$or"][0]["services_all"]["$elemMatch"][
            `publics.${key}.max`
          ] = condAgeMax;
          // And the place
          nosqlQuery["$or"][1]["$and"].push({
            [`publics.${key}.min`]: condAgeMin,
          });
          nosqlQuery["$or"][1]["$and"].push({
            [`publics.${key}.max`]: condAgeMax,
          });
        }
      }
    }

    if (key === "accueil" && typeof publics[key] === "number") {
      const condAccueil = publics[key];

      if (inService) {
        nosqlQuery["services_all"]["$elemMatch"][`publics.${key}`] =
          condAccueil;
      } else {
        nosqlQuery["$or"][0]["services_all"]["$elemMatch"][`publics.${key}`] =
          condAccueil;
        nosqlQuery["$or"][1]["$and"].push({ [`publics.${key}`]: condAccueil });
      }
    }

    if (key !== "accueil" && key !== "age" && publics[key as PublicsElement]) {
      const condOther = { $in: publics[key as PublicsElement] };

      if (inService) {
        nosqlQuery["services_all"]["$elemMatch"][`publics.${key}`] = condOther;
      } else {
        nosqlQuery["$or"][0]["services_all"]["$elemMatch"][`publics.${key}`] =
          condOther;
        nosqlQuery["$or"][1]["$and"].push({ [`publics.${key}`]: condOther });
      }
    }
  }
};
