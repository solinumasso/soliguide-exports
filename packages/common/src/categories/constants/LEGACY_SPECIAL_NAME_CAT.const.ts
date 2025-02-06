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
import type {
  LegacySpecialCatTypesKeys,
  LegacySubCategoryOptions,
} from "../types";

export const LEGACY_SPECIAL_NAME_CAT: number[] = [
  202, 204, 303, 305, 402, 602, 801, 804, 1204,
];

export const LEGACY_FRENCH_COURSES_SUB_CAT: LegacySubCategoryOptions = [
  { name: "ALPHABETISATION", value: "alphabetisation" },
  { name: "ASL", value: "asl" },
  { name: "FLE", value: "fle" },
];

export const LEGACY_CARE_PRODUCTS_SUB_CAT: LegacySubCategoryOptions = [
  { name: "SANITARY_MATERIALS", value: "sanitary_materials" },
  { name: "OTHER_CARE_PRODUCTS", value: "other_care_products" },
];

export const LEGACY_DOMICILIATIONS_SUB_CAT: LegacySubCategoryOptions = [
  { name: "DOMI1", value: "domi1" },
  { name: "DOMI2", value: "domi2" },
  { name: "DOMI4", value: "domi4" },
];

export const LEGACY_CANTEENS_SUB_CAT: LegacySubCategoryOptions = [
  { name: "PETITDEJ", value: "petitdej" },
  { name: "COLLATION", value: "collation" },
  { name: "BOISSON", value: "boisson" },
  { name: "DEJEUNER", value: "dejeuner" },
  { name: "GOUTER", value: "gouter" },
  { name: "DINER", value: "diner" },
];

export const LEGACY_SPECIAL_CAT_TYPES: Record<
  number,
  { options: LegacySubCategoryOptions; translationKey: string }
> = {
  202: {
    options: LEGACY_FRENCH_COURSES_SUB_CAT,
    translationKey: "FRENCH_COURSES_TYPE",
  },
  305: {
    options: LEGACY_CARE_PRODUCTS_SUB_CAT,
    translationKey: "CARE_PRODUCTS_TYPE",
  },
  402: {
    options: LEGACY_DOMICILIATIONS_SUB_CAT,
    translationKey: "DOMICILIATIONS_TYPE",
  },
  602: { options: LEGACY_CANTEENS_SUB_CAT, translationKey: "CANTEENS_TYPE" },
};

export const LEGACY_SPECIAL_CAT_TYPES_KEYS: LegacySpecialCatTypesKeys[] =
  Object.keys(LEGACY_SPECIAL_CAT_TYPES).map(Number);
