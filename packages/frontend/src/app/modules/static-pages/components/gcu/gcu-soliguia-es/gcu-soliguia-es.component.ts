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
import { Component, OnInit, OnDestroy } from "@angular/core";
import { StaticPagesComponentInterface } from "../../../models";
import { CurrentLanguageService } from "../../../../general/services/current-language.service";
import { getPathFromTheme } from "../../../../../shared/functions/getPathFromTheme";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-gcu-soliguia-es",
  templateUrl: "./gcu-soliguia-es.component.html",
})
export class GcuSoliguiaEsComponent
  implements StaticPagesComponentInterface, OnInit, OnDestroy
{
  private readonly subscription: Subscription = new Subscription();

  public dataProcessingAgreementLink: string;
  public routePrefix: string;
  public linkTitle: string;

  constructor(
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );
    this.dataProcessingAgreementLink = getPathFromTheme(
      "data-processing-agreement"
    );

    this.linkTitle = this.translateService.instant("COOKIE_POLICY");
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
