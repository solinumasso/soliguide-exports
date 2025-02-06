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
import { ActivatedRoute } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import { Subscription } from "rxjs";

import { EmailsService } from "../../services/emails.service";
import { Email } from "../../types";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-view-email",
  templateUrl: "./view-email.component.html",
  styleUrls: ["./view-email.component.css"],
})
export class ViewEmailComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  public routePrefix: string;
  public email: Email;

  constructor(
    private readonly emailService: EmailsService,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {
    this.email = null;
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );
    this.subscription.add(
      this.route.params.subscribe((params) => {
        if (params.id) {
          const emailObjectId = params.id;
          this.subscription.add(
            this.emailService.getEmail(emailObjectId).subscribe({
              next: (email: Email) => {
                this.email = email;
              },
              error: () => {
                this.toastr.error(
                  this.translateService.instant("SEARCH_ERROR")
                );
              },
            })
          );
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
