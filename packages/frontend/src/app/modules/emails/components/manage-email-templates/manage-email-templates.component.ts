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

import { ToastrService } from "ngx-toastr";

import { Subscription } from "rxjs";

import { EmailsService } from "../../services/emails.service";
import { EmailTemplates } from "../../types";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import { User } from "../../../users/classes";
import { AuthService } from "../../../users/services/auth.service";

import {
  TERRITORIES_NOTIF,
  UserStatus,
  DEPARTMENTS_MAP,
  CountryCodes,
} from "@soliguide/common";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-manage-email-templates",
  templateUrl: "./manage-email-templates.component.html",
  styleUrls: ["./manage-email-templates.component.css"],
})
export class ManageEmailTemplatesComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  public routePrefix: string;
  public emailTemplates: EmailTemplates[];
  public me!: User | null;

  public readonly FR_DEPARTMENTS_MAP = DEPARTMENTS_MAP[CountryCodes.FR];
  public readonly TERRITORIES_NOTIF = TERRITORIES_NOTIF;

  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailsService,
    private readonly titleService: Title,
    private readonly toastr: ToastrService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {
    this.emailTemplates = [];
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );
    this.me = this.authService.currentUserValue;
    this.titleService.setTitle(
      this.translateService.instant("EDIT_EMAIL_TEMPLATES")
    );

    this.subscription.add(
      this.emailService.getAllTemplates().subscribe({
        next: (emailTemplates: EmailTemplates[]) => {
          if (this.me.status === UserStatus.ADMIN_SOLIGUIDE) {
            this.emailTemplates = emailTemplates.filter(
              (template: EmailTemplates) =>
                this.me.territories.includes(template.territory)
            );
          } else {
            this.emailTemplates = emailTemplates;
          }
        },
        error: () => {
          this.toastr.error(this.translateService.instant("SEARCH_ERROR"));
        },
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
