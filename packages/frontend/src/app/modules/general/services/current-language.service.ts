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
import { BehaviorSubject, Subscription } from "rxjs";

import { SupportedLanguagesCode, isSupportedLanguage } from "@soliguide/common";

import { LanguageDirection } from "../../translations/enums";
import { THEME_CONFIGURATION } from "../../../models";

@Injectable({
  providedIn: "root",
})
export class CurrentLanguageService {
  private readonly currentLang: BehaviorSubject<SupportedLanguagesCode> =
    new BehaviorSubject(THEME_CONFIGURATION.defaultLanguage);

  public get currentLanguage(): SupportedLanguagesCode {
    return this.currentLang.value;
  }

  public get routePrefix(): string {
    return `/${this.currentLang.value}`;
  }

  public get direction(): LanguageDirection {
    const RTL_LANGUAGES: SupportedLanguagesCode[] = [
      SupportedLanguagesCode.FA,
      SupportedLanguagesCode.AR,
      SupportedLanguagesCode.PS,
    ];
    return RTL_LANGUAGES.includes(this.currentLang.value)
      ? LanguageDirection.RTL
      : LanguageDirection.LTR;
  }

  public setCurrentLanguage(language: SupportedLanguagesCode | string) {
    const rightSizeLanguage = language.substring(0, 2);
    if (!isSupportedLanguage(rightSizeLanguage))
      throw new Error("BAD_LANGUAGE");
    const newCurrentLanguage = rightSizeLanguage as SupportedLanguagesCode;
    if (this.currentLang.value !== newCurrentLanguage) {
      this.currentLang.next(newCurrentLanguage);
    }
  }

  public subscribe(
    next: (_lang: SupportedLanguagesCode) => void
  ): Subscription {
    return this.currentLang.subscribe(next);
  }
}
