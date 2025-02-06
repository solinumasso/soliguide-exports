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
import { ActivatedRoute } from "@angular/router";

import { catchError, map, Observable, of } from "rxjs";

import { CampaignService } from "../modules/campaign/services/campaign.service";

import { AuthService } from "../modules/users/services/auth.service";

@Injectable({ providedIn: "root" })
export class CampaignGuard {
  constructor(
    private authService: AuthService,
    private campaignService: CampaignService,
    private route: ActivatedRoute
  ) {}

  public canActivate(): Observable<boolean> {
    if (this.route.snapshot.params.lieu_id) {
      return this.campaignService
        .getIfCampaignAccessible("place", this.route.snapshot.params.lieu_id)
        .pipe(
          map((hasAccess: boolean) => {
            if (hasAccess) {
              return true;
            }

            this.authService.notAuthorized();
            return false;
          }),
          catchError(() => {
            this.authService.notAuthorized();
            return of(false);
          })
        );
    } else if (this.route.snapshot.params.organization_id) {
      return this.campaignService
        .getIfCampaignAccessible(
          "orga",
          this.route.snapshot.params.organization_id
        )
        .pipe(
          map((hasAccess: boolean) => {
            if (hasAccess) {
              return true;
            }

            this.authService.notAuthorized();
            return false;
          }),
          catchError(() => {
            this.authService.notAuthorized();
            return of(false);
          })
        );
    } else {
      const user_id = this.authService.currentUserValue.user_id;
      return this.campaignService.getIfCampaignAccessible("user", user_id).pipe(
        map((hasAccess: boolean) => {
          if (hasAccess) {
            return true;
          }

          this.authService.notAuthorized();
          return false;
        }),
        catchError(() => {
          this.authService.notAuthorized();
          return of(false);
        })
      );
    }
  }
}
