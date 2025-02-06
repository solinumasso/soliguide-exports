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
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, map, catchError, of } from "rxjs";
import { AuthService } from "../modules/users/services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(private readonly authService: AuthService) {}
  public canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.isAuth().pipe(
      map((canAccess: boolean) => {
        if (!canAccess) {
          this.authService.logoutAndRedirect(route);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.authService.logoutAndRedirect(route);
        return of(false);
      })
    );
  }
}
