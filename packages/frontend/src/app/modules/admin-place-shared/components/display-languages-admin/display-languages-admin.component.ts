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
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  PLACE_LANGUAGES_LIST,
  SUPPORTED_LANGUAGES,
  SupportedLanguagesCode,
} from "@soliguide/common";
import { CurrentLanguageService } from "../../../general/services/current-language.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-display-languages-admin",
  templateUrl: "./display-languages-admin.component.html",
  styleUrls: ["./display-languages-admin.component.css"],
})
export class DisplayLanguagesAdminComponent implements OnInit, OnDestroy {
  public readonly PLACE_LANGUAGES_LIST = PLACE_LANGUAGES_LIST;
  public readonly AVAILABLE_FLAGS: string[] = SUPPORTED_LANGUAGES;

  @Input() public languages: string[];
  @Input() public edit: boolean;

  private readonly subscription: Subscription = new Subscription();

  public faTimes = faTimes;
  public currentLang: SupportedLanguagesCode;

  public constructor(
    private readonly currentLanguageService: CurrentLanguageService
  ) {}

  public ngOnInit() {
    this.subscription.add(
      this.currentLanguageService.subscribe((lang) => {
        this.currentLang = lang;
      })
    );
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeLang = (shortLang: string): void => {
    const indexLang = this.languages.indexOf(shortLang);
    this.languages.splice(indexLang, 1);
  };

  public flagExists = (shortLang: string): boolean => {
    return this.AVAILABLE_FLAGS.includes(shortLang);
  };
}
