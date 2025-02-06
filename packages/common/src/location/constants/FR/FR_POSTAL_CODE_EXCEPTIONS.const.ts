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

import { CountryCodes } from "../../enums";
import { DepartmentCode } from "../../types";

export const FR_EXCEPTIONAL_POSTAL_CODES: Record<
  string,
  {
    department: string;
    departmentCode: DepartmentCode<CountryCodes.FR>;
  }
> = {
  // https://fr.wikipedia.org/wiki/Liste_des_communes_de_France_dont_le_code_postal_ne_correspond_pas_au_d%C3%A9partement
  "01200": {
    department: "Haute-Savoie",
    departmentCode: "74",
  },
  "01410": {
    department: "Jura",
    departmentCode: "39",
  },
  "01590": {
    department: "Jura",
    departmentCode: "39",
  },
  "05110": {
    department: "Alpes-de-Haute-Provence",
    departmentCode: "04",
  },
  "05130": {
    department: "Alpes-de-Haute-Provence",
    departmentCode: "04",
  },
  "05160": {
    department: "Alpes-de-Haute-Provence",
    departmentCode: "04",
  },
  "05700": {
    department: "Drôme",
    departmentCode: "26",
  },
  "13780": {
    department: "Var",
    departmentCode: "83",
  },
  "21340": {
    department: "Saône-et-Loire",
    departmentCode: "71",
  },
  "33220": {
    department: "Dordogne",
    departmentCode: "24",
  },
  "37160": {
    department: "Vienne",
    departmentCode: "86",
  },
  "42620": {
    department: "Allier",
    departmentCode: "03",
  },
  "43450": {
    department: "Cantal",
    departmentCode: "15",
  },
  "48250": {
    department: "Ardèche",
    departmentCode: "07",
  },
  "52100": {
    department: "Marne",
    departmentCode: "51",
  },
  "94390": {
    department: "Essonne",
    departmentCode: "91",
  },
  // https://fr.wikipedia.org/wiki/Saint-Barth%C3%A9lemy_(Antilles_fran%C3%A7aises)
  "97133": {
    department: "Saint-Barthélemy",
    departmentCode: "977",
  },
  // https://fr.wikipedia.org/wiki/Saint-Martin_(Antilles_fran%C3%A7aises)
  "97150": {
    department: "Saint-Martin",
    departmentCode: "978",
  },
};
