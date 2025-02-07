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

import { SearchAutoCompleteSuggestion } from "@soliguide/common";
import { AutoCompleteModel } from "../models/auto-complete.model";

export const searchTerm = async (
  term: string
): Promise<
  { _id: "CATEGORY" | "EXPRESSION"; values: SearchAutoCompleteSuggestion[] }[]
> => {
  return await AutoCompleteModel.aggregate([
    {
      $match: {
        // VERSION 1 : $regex
        $or: [
          { label: { $options: "i", $regex: new RegExp(`.*${term}.*`) } },
          {
            synonyms: { $options: "i", $regex: new RegExp(`.*${term}.*`) },
          },
        ],
        // VERSION 2 : $text
        // cf. https://www.mongodb.com/docs/v5.0/reference/operator/query/text/ to implement this version
        // $text: {
        //   $caseSensitive: false,
        //   $diacriticSensitive: true,
        //   $search: term,
        // },
      },
    },
    {
      $group: {
        _id: "$type",
        values: {
          $addToSet: {
            categoryId: "$categoryId",
            expressionId: "$expressionId",
            label: "$label",
            seo: "$seo",
          },
        },
      },
    },
    { $limit: 12 },
  ]);
};
