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
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { CampaignName, AnyDepartmentCode } from "@soliguide/common";

import { ToastrService } from "ngx-toastr";

import { Subscription } from "rxjs";

import {
  EMAIL_FOR_MANAGE,
  EMAIL_STATUS_LABELS,
  EMAIL_TYPE_LABELS,
  EMAIL_TYPE_FOR_MANAGE,
} from "../../constants";

import { SearchEmail } from "../../interfaces";

import { EmailsService } from "../../services/emails.service";

import { Email, SearchEmailSortBy, SearchEmailResults } from "../../types";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import { User } from "../../../users/classes";
import { AuthService } from "../../../users/services/auth.service";

import { CAMPAIGN_NAME_LABELS } from "../../../../models";

import { fadeInOut, globalConstants } from "../../../../shared";

import { TranslateService } from "@ngx-translate/core";

@Component({
  animations: [fadeInOut],
  selector: "app-manage-emails",
  templateUrl: "./manage-emails.component.html",
  styleUrls: ["./manage-emails.component.css"],
})
export class ManageEmailsComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  public routePrefix: string;
  public emails: Email[];

  // Recherche
  public nbResults: number;
  public loading: boolean;
  public search: SearchEmail;

  public me!: User | null;

  public readonly EMAIL_STATUS_LABELS = EMAIL_STATUS_LABELS;
  public readonly EMAIL_TYPE_LABELS = EMAIL_TYPE_LABELS;
  public readonly EMAIL_FOR_MANAGE = EMAIL_FOR_MANAGE;
  public readonly EMAIL_TYPE_FOR_MANAGE = EMAIL_TYPE_FOR_MANAGE;
  public readonly CAMPAIGN_NAME_LABELS = CAMPAIGN_NAME_LABELS;

  public readonly emailLabels = Object.keys(EMAIL_FOR_MANAGE);
  public readonly emailTypeLabels = Object.keys(EMAIL_TYPE_FOR_MANAGE);

  constructor(
    private readonly authService: AuthService,
    private readonly searchService: EmailsService,
    private readonly titleService: Title,
    private readonly toastr: ToastrService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {
    this.emails = [];
    this.nbResults = 0;
    this.loading = true;
    this.me = null;
    this.search = new SearchEmail({}, this.me);
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );
    this.titleService.setTitle(this.translateService.instant("MANAGE_EMAILS"));

    // Récupère les données de l'utilisateur connecté afin d'initialiser la recherche de manière adaptée
    this.me = this.authService.currentUserValue;

    this.search = new SearchEmail(
      globalConstants.getItem("SEARCH_EMAIL"),
      this.me
    );

    this.launchSearch();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setTerritories(selectedTerritories: string[]): void {
    this.search.territories = selectedTerritories as AnyDepartmentCode[];
    this.launchSearch();
  }

  public setCampaigns(selectedCampaigns: string[]): void {
    this.search.campaigns = selectedCampaigns as CampaignName[];
    this.launchSearch();
  }

  public resetSearchArgument = (key: string): void => {
    this.search.resetSearchElement(key);
    this.launchSearch();
  };

  public sortBy(value: SearchEmailSortBy): void {
    this.search.options.sortValue = -this.search.options.sortValue;

    this.search.options.sortBy = value;
    this.launchSearch();
  }

  public launchSearch(): void {
    this.emails = [];
    this.loading = true;

    globalConstants.setItem("SEARCH_EMAIL", this.search);

    this.subscription.add(
      this.searchService.launchEmailSearch(this.search).subscribe({
        next: (response: SearchEmailResults) => {
          this.loading = false;
          if (response.nbResults === 0) {
            this.toastr.warning(
              this.translateService.instant("NO_EMAIL_FOR_SEARCH")
            );
          }
          this.emails = response.emails;
          this.nbResults = response.nbResults;
        },
        error: () => {
          this.toastr.error(this.translateService.instant("SEARCH_ERROR"));
        },
      })
    );
  }
}
