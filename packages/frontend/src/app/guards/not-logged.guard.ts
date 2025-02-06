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
import { ActivatedRouteSnapshot, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import { map, Observable } from "rxjs";
import { CurrentLanguageService } from "../modules/general/services/current-language.service";

import { AuthService } from "../modules/users/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { THEME_CONFIGURATION } from "../models";

@Injectable({ providedIn: "root" })
export class NotAuthGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isAuth().pipe(
      map((isLogged: boolean) => {
        if (isLogged) {
          let timeout = 6000;
          if (route.params?.idInvitation) {
            this.translateService.instant(
              "CANNOT_CREATE_ACCOUNT_WITH_EMAIL_LOG_OUT_TO_ACCEPT"
            );
            timeout = 10000;
          }
          this.router.navigate([this.currentLanguageService.routePrefix]);
          this.toastr.warning(
            this.translateService.instant("ALREADY_LOGGED_IN", {
              brandName: THEME_CONFIGURATION.brandName,
            }),
            undefined,
            {
              timeOut: timeout,
            }
          );
          return false;
        }
        return true;
      })
    );
  }
}
