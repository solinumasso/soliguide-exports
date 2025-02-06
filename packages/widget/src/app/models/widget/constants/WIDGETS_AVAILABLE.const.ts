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
import { WidgetId } from "@soliguide/common";
import { WidgetThemeName } from "../enums";
import { WidgetTheme } from "../types";

export const WIDGETS: {
  [key in WidgetId]: {
    name: string;
    themeName: WidgetThemeName;
    theme: WidgetTheme;
  };
} = {
  CRF: {
    name: "Croix-Rouge française",
    themeName: WidgetThemeName.CRF,
    theme: {
      "bs-primary": "#e30614",
      "bs-primary-dark": "#be0511",
      "bs-primary-light": "#fce7e8",
      "bs-secondary": "#942615",
      "text-primary": "#e30614",
    },
  },
  SAMU_SOCIAL: {
    name: "Samu Social",
    themeName: WidgetThemeName.SAMU_SOCIAL,
    theme: {
      "bs-primary": "#0C469C",
      "bs-primary-dark": "#062655",
      "bs-primary-light": "#9cb7df",
      "bs-secondary": "#FFC800",
      "text-primary": "#0C469C",
    },
  },
  SOLINUM: {
    name: "Solinum",
    themeName: WidgetThemeName.SOLINUM,
    theme: {
      "bs-primary": "#3e3a71",
      "bs-primary-dark": "#22203F",
      "bs-primary-light": "#cdcae9",
      "bs-secondary": "#e65a46",
      "text-primary": "#3e3a71",
    },
  },
};
