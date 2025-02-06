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
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

import { WidgetId } from "@soliguide/common";

import { WIDGETS, WidgetThemeProperties } from "../models";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public widgetId: WidgetId;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.widgetId = WidgetId.SOLINUM;
  }

  public setWidgetId = (widgetId: WidgetId): void => {
    this.widgetId = widgetId;
    this.setTheme();
  };

  public setTheme = (): void => {
    const theme = WIDGETS[this.widgetId].theme;

    Object.keys(theme).forEach((content: unknown) => {
      const key = content as WidgetThemeProperties;

      this.setPropertyColor(key, theme[key]);
    });
  };

  public setPropertyColor = (
    property: WidgetThemeProperties,
    color: string
  ): void => {
    if (color) {
      let selectedColor = color;

      if (!/^#[A-Fa-f0-9]{6}$/.test(color)) {
        selectedColor = WIDGETS[this.widgetId].theme[property];
      }

      const customizableElements =
        this.document.getElementsByClassName("customizable");

      Array.prototype.forEach.call(
        customizableElements,
        (element: HTMLElement) => {
          element.style.setProperty(`--${property}`, selectedColor);
        }
      );
    }
  };
}
