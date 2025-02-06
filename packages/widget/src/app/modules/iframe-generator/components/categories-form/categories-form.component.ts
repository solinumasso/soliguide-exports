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
import { Component, Input } from "@angular/core";

import { WIDGET_CATEGORIES } from "../../constants";
import { AnalyticsService } from "../../services/analytics.service";
import { IframeFormType, IframeGeneratorStep } from "../../types";

@Component({
  selector: "app-categories-form",
  templateUrl: "./categories-form.component.html",
  styleUrls: ["./categories-form.component.scss"],
})
export class CategoriesFormComponent {
  @Input() public formValue!: IframeFormType;

  public readonly WIDGET_CATEGORIES = WIDGET_CATEGORIES;

  constructor(private readonly analyticsService: AnalyticsService) {}

  public toggleCategory = async (selectedCategory: string) => {
    await this.analyticsService.capture(
      "toggle-category",
      IframeGeneratorStep.CATEGORIES,
      this.formValue,
      { selectedCategory }
    );
    if (this.hasCategory(selectedCategory)) {
      const updatedCategories = this.formValue.categories.filter(
        (category) =>
          !this.WIDGET_CATEGORIES[selectedCategory].categories.includes(
            category
          )
      );
      this.formValue.categories = updatedCategories;
    } else {
      for (const category of this.WIDGET_CATEGORIES[selectedCategory]
        .categories) {
        this.formValue.categories.push(category);
      }
    }
  };

  public hasCategory = (selectedCategory: string): boolean => {
    return this.WIDGET_CATEGORIES[selectedCategory].categories.every(
      (category) => this.formValue.categories.includes(category)
    );
  };
}
