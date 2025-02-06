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
import { globalConstants } from "../../../shared/functions";
import { BehaviorSubject } from "rxjs";
import isValid from "date-fns/isValid";
import { ChatService } from "./chat.service";
import { AuthService } from "../../users/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class CookieManagerService {
  public consentSubject: BehaviorSubject<boolean>;

  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService
  ) {
    this.consentSubject = new BehaviorSubject<boolean>(
      CookieManagerService.hasUserGivenConsent()
    );
  }

  public get consentSubjectValue(): boolean {
    return this.consentSubject.value;
  }

  public static hasUserGivenConsent(): boolean {
    // If "USER_COOKIES_CONSENT" doesn't exist in locale storage getItem() return null
    // new Date(null) = Thu Jan 01 1970
    const cookieConsent = new Date(
      globalConstants.getItem("USER_COOKIES_CONSENT")
    );
    return isValid(cookieConsent) && new Date() < cookieConsent;
  }

  public setConsentCookie(): void {
    this.consentSubject.next(true);
    const dateExpiration = new Date();
    dateExpiration.setMonth(dateExpiration.getMonth() + 3);
    globalConstants.setItem("USER_COOKIES_CONSENT", dateExpiration.toString());
    this.chatService.openChat(this.authService.currentUserValue);
  }

  public deleteConsentCookie(): void {
    for (const item of globalConstants.listItems()) {
      if (item.startsWith("ZD")) {
        globalConstants.removeItem(item);
      }
    }

    globalConstants.removeItem("USER_COOKIES_CONSENT");
    this.chatService.resetSession();
    this.consentSubject.next(false);
  }
}
