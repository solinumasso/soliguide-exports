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

import { catchError, map, Observable, of } from "rxjs";
import { CurrentLanguageService } from "../modules/general/services/current-language.service";

import { PlaceService } from "../modules/place/services/place.service";

import { AuthService } from "../modules/users/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: "root" })
export class CanEditGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly placeService: PlaceService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const lieuId = route.params.lieu_id;
    return this.placeService.canEditPlace(lieuId).pipe(
      map((canEdit: boolean) => {
        if (canEdit) {
          return true;
        } else {
          this.toastr.error(
            this.translateService.instant("NOT_AUTHORIZED_TO_ACCESS")
          );
          this.router.navigate([
            this.currentLanguageService.routePrefix,
            "fiche",
            lieuId,
          ]);
          return false;
        }
      }),
      catchError(() => {
        this.authService.notAuthorized();
        return of(false);
      })
    );
  }
}
