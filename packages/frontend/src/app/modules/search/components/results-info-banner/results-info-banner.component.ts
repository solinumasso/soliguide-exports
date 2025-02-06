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
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import {
  type SupportedLanguagesCode,
  Categories,
  type ChildCategory,
  getCategoriesService,
  type LocationAreas,
} from "@soliguide/common";
import { PosthogService } from "../../../analytics/services/posthog.service";
import { environment } from "../../../../../environments/environment";
import { LANGUAGE_FOR_PRACTICAL_FILES, themeService } from "../../../../shared";
import { CurrentLanguageService } from "../../../general/services/current-language.service";

@Component({
  selector: "app-results-info-banner",
  templateUrl: "./results-info-banner.component.html",
})
export class ResultsInfoBannerComponent implements OnInit, OnDestroy {
  @Input() public category!: Categories | null;
  @Input() public areas!: LocationAreas;

  private readonly subscription: Subscription = new Subscription();
  public readonly Categories = Categories;

  public departmentCode: string | null;
  public learningAndEmploymentDepartements: string[];
  public learningAndEmploymentCategories: ChildCategory[];
  public isRelevantForLearningAndEmployment: boolean;
  public howToGetAccommodationLink: string;
  public readonly isThemeSoliguideFr: boolean;

  private currentLang: SupportedLanguagesCode;

  constructor(
    private readonly posthogService: PosthogService,
    private readonly currentLanguageService: CurrentLanguageService
  ) {
    this.departmentCode = null;

    // TODO: update this to disable for other countries
    this.learningAndEmploymentDepartements = [
      "13",
      "31",
      "33",
      "35",
      "44",
      "54",
      "59",
      "69",
    ];
    this.learningAndEmploymentCategories =
      getCategoriesService().getFlatCategoryTreeNode(
        Categories.TRAINING_AND_JOBS
      ).children;
    this.isThemeSoliguideFr = themeService.isSoliguideFr();
  }

  public ngOnInit(): void {
    this.currentLang = this.currentLanguageService.currentLanguage;
    this.subscription.add(
      this.currentLanguageService.subscribe((language) => {
        this.currentLang = language;
      })
    );

    if (this.areas?.departmentCode) {
      this.departmentCode = this.areas?.departmentCode;
    }

    this.isRelevantForLearningAndEmployment =
      this.learningAndEmploymentDepartements.includes(this.departmentCode) &&
      this.learningAndEmploymentCategories
        .map((c) => c.id)
        .includes(this.category);

    this.howToGetAccommodationLink = `${environment.praticalFilesLink}/${
      LANGUAGE_FOR_PRACTICAL_FILES[this.currentLang]
    }/19895172153629`;
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public captureEvent(eventName: string) {
    this.posthogService.capture(`search-results-info-banner-${eventName}`, {
      isRelevantForLearningAndEmployment:
        this.isRelevantForLearningAndEmployment,
      departmentCode: this.departmentCode,
      category: this.category,
    });
  }
}
