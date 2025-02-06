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

import { AutoComplete, AutoCompleteType, Categories } from "@soliguide/common";
import mongoose from "mongoose";

const AutoCompleteSchema = new mongoose.Schema<AutoComplete>({
  // Categories ID: 600, 100 etc.
  categoryId: {
    default: null,
    enum: [...Object.values(Categories), null],
    index: true,
    type: String,
  },

  description: {
    default: "",
    type: String,
  },
  // Slugged expression: Restos du Coeur = restos-du-coeur
  expressionId: {
    default: null,
    index: true,
    type: String,
  },
  // For the categories: same label than in the translation (ALIMENTATION / RESTAURATION_ASSISE)
  // For the expressions: the word directly (Restos du Coeur, Secours Catholique)
  label: {
    default: "",
    required: true,
    type: String,
  },
  // seo = expressionId for expressions
  seo: {
    default: "",
    type: String,
  },
  synonyms: {
    default: "",
    type: String,
  },
  type: {
    default: AutoCompleteType.CATEGORY,
    enum: AutoCompleteType,
    type: String,
    required: true,
  },
});

export const AutoCompleteModel = mongoose.model(
  "AutoComplete",
  AutoCompleteSchema,
  "autoComplete"
);
