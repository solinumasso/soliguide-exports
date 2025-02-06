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
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import type { PosthogProperties } from "@soliguide/common-angular";

import { CurrentLanguageService } from "../../services/current-language.service";
import { PosthogService } from "../../../analytics/services/posthog.service";

import { IS_WEBVIEW_APP } from "../../../../shared";
import { THEME_CONFIGURATION } from "../../../../models";
import { getPathFromTheme } from "../../../../shared/functions/getPathFromTheme";

@Component({
  selector: "app-footer",
  styleUrls: ["./footer.component.css"],
  templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
  public readonly IS_WEBVIEW_APP = IS_WEBVIEW_APP;
  public readonly becomeTranslatorFormLink? =
    THEME_CONFIGURATION.becomeTranslatorFormLink;
  public readonly donateLink? = THEME_CONFIGURATION.donateLink;
  public readonly THEME_CONFIGURATION = THEME_CONFIGURATION;
  public readonly todayYear = new Date().getFullYear();
  public routePrefix: string;
  public policyPrivacyLink: string;
  public dataProcessingAgreementLink: string;
  public gcuLink: string;
  public legalNoticesLink: string;
  public privacyPolicyLink: string;

  @Output() public readonly openCookieConsentModal =
    new EventEmitter<boolean>();

  constructor(
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly posthogService: PosthogService
  ) {
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  ngOnInit() {
    this.policyPrivacyLink = getPathFromTheme("cookie-policy");
    this.dataProcessingAgreementLink = getPathFromTheme(
      "data-processing-agreement"
    );
    this.gcuLink = getPathFromTheme("gcu");
    this.legalNoticesLink = getPathFromTheme("legal-notices");
    this.privacyPolicyLink = getPathFromTheme("privacy-policy");
  }

  public openCookiesConsentModal(): void {
    this.captureEvent("manage-cookies");
    this.openCookieConsentModal.emit(true);
  }

  public captureEvent(eventName: string, properties?: PosthogProperties): void {
    this.posthogService.capture(`footer-${eventName}`, properties);
  }
}
