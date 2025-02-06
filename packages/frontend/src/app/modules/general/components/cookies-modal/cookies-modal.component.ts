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
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CookieManagerService } from "../../../shared/services";
import { Subscription } from "rxjs";
import { CurrentLanguageService } from "../../services/current-language.service";
import { getPathFromTheme } from "../../../../shared/functions/getPathFromTheme";

@Component({
  selector: "app-cookies-modal",
  templateUrl: "./cookies-modal.component.html",
})
export class CookiesModalComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();
  public routePrefix: string;
  public cookiePolicyLink: string;
  public chatConsent: boolean;

  constructor(
    private readonly modalService: NgbModal,
    private readonly cookieManagerService: CookieManagerService,
    private readonly currentLanguageService: CurrentLanguageService
  ) {
    this.routePrefix = this.currentLanguageService.routePrefix;
    this.chatConsent = this.cookieManagerService.consentSubjectValue;
  }

  ngOnInit(): void {
    this.cookiePolicyLink = getPathFromTheme("cookie-policy");

    this.subscription.add(
      this.cookieManagerService.consentSubject.subscribe((consent: boolean) => {
        this.chatConsent = consent;
      })
    );
  }

  public setUserConsent(): void {
    this.modalService.dismissAll();
    if (this.chatConsent) {
      this.cookieManagerService.setConsentCookie();
    } else {
      this.cookieManagerService.deleteConsentCookie();
    }
  }

  public close() {
    this.modalService.dismissAll();
  }
}
