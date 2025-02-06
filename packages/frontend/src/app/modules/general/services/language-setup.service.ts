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
import { Injectable } from "@angular/core";
import { PRIMARY_OUTLET, Router } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";

import {
  SUPPORTED_LANGUAGES,
  SupportedLanguagesCode,
  isSupportedLanguage,
} from "@soliguide/common";

import { Subscription } from "rxjs";

import { CurrentLanguageService } from "./current-language.service";

@Injectable({
  providedIn: "root",
})
export class LanguageSetupService {
  private readonly subscription: Subscription = new Subscription();

  constructor(
    private readonly translateService: TranslateService,
    private readonly router: Router,
    private readonly currentLanguageService: CurrentLanguageService
  ) {}

  public setupTranslations() {
    // Setup the translation service supported languages
    this.translateService.addLangs(SUPPORTED_LANGUAGES);

    // Update the translation service when our current language change
    this.subscription.add(
      this.currentLanguageService.subscribe((lang) => {
        this.translateService.use(lang);
      })
    );
  }

  public tearDown() {
    this.subscription.unsubscribe();
  }

  public setLanguageRoutePrefix(language: SupportedLanguagesCode | string) {
    if (!isSupportedLanguage(language)) throw new Error("BAD_LANGUAGE");
    const urlTree = this.router.parseUrl(this.router.url);
    // Replace the language prefix
    // see https://angular.io/api/router/UrlTree#usage-notes for usage
    urlTree.root.children[PRIMARY_OUTLET].segments[0].path = language;
    this.router.navigateByUrl(urlTree);
  }
}
