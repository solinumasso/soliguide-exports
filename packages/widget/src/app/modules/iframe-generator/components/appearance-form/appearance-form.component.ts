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
import { Component, Input, OnInit } from "@angular/core";

import { IframeFormType, IframeGeneratorStep } from "../../types";

import {
  DEFAULT_WIDGET_PLACE,
  WidgetPlace,
  WidgetThemeProperties,
} from "../../../../models";

import { ThemeService } from "../../../../services/theme.service";
import { AnalyticsService } from "../../services/analytics.service";

@Component({
  selector: "app-appearance-form",
  templateUrl: "./appearance-form.component.html",
  styleUrls: ["./appearance-form.component.scss"],
})
export class AppearanceFormComponent implements OnInit {
  @Input() public formValue!: IframeFormType;

  public mockPlacesList: WidgetPlace[];

  public readonly WidgetThemeProperties = WidgetThemeProperties;

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly themeService: ThemeService
  ) {
    this.mockPlacesList = [...Array(5).keys()].map((i: number) => {
      const place = new WidgetPlace(DEFAULT_WIDGET_PLACE);
      place._id += `-${i}`;
      place.lieu_id += i;
      place.name = `${i + 1}. ${place.name}`;
      return place;
    });
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.themeService.setTheme();
    }, 100);
  }

  public setColor = async (
    colorProperty: WidgetThemeProperties
  ): Promise<void> => {
    await this.analyticsService.capture(
      "update-appearance",
      IframeGeneratorStep.APPEARANCE,
      this.formValue,
      { colorProperty }
    );
    this.themeService.setPropertyColor(
      colorProperty,
      this.formValue.theme[colorProperty]
    );
  };
}
