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
import { AbstractControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import {
  ALL_SUPPORTED_LANGUAGES_NAME,
  SUPPORTED_LANGUAGES_BY_COUNTRY,
} from "@soliguide/common";
import { THEME_CONFIGURATION } from "../../../../models";

@Component({
  selector: "app-translatable-language-selector",
  templateUrl: "./translatable-language-selector.component.html",
})
export class TranslatableLanguageSelectorComponent implements OnInit {
  @Input() public f: { [key: string]: AbstractControl };
  @Input() public submitted: boolean = false;
  public labelToDisplay: string;

  public readonly AVAILABLE_LANGUAGES_FOR_TRANSLATION =
    SUPPORTED_LANGUAGES_BY_COUNTRY[THEME_CONFIGURATION.country].otherLanguages;

  constructor(private readonly translateService: TranslateService) {
    this.labelToDisplay = "";
  }

  ngOnInit(): void {
    this.getStringToDisplay();
  }

  public toggleCheckboxButton = (value: string): void => {
    const index = this.f.languages.value.indexOf(value);
    if (index !== -1) {
      this.f.languages.value.splice(index, 1);
    } else {
      this.f.languages.value.push(value);
    }

    this.f.languages.setValue(this.f.languages.value);
    this.f.languages.markAsTouched();
    this.f.languages.markAsDirty();
    this.getStringToDisplay();
  };

  public getStringToDisplay(): void {
    if (!this.f.languages.value?.length) {
      this.labelToDisplay = this.translateService.instant(
        "NO_LANGUAGE_SELECTED"
      );
      return;
    }

    const selectedLanguageNames =
      this.AVAILABLE_LANGUAGES_FOR_TRANSLATION.filter((language) =>
        this.f.languages.value.includes(language)
      ).map((language) =>
        this.translateService.instant(
          ALL_SUPPORTED_LANGUAGES_NAME[language].name
        )
      );

    this.labelToDisplay = selectedLanguageNames.join(", ");
  }
}
