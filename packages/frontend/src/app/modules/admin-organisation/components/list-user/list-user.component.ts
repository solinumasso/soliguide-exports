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
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { type UserRightsForOrganizations, UserRole } from "@soliguide/common";
import type { PosthogProperties } from "@soliguide/common-angular";

import { CurrentLanguageService } from "../../../general/services/current-language.service";
import type { User } from "../../../users/classes";
import { USER_ROLES_COLORS } from "../../../users/constants";
import { PosthogService } from "../../../analytics/services/posthog.service";
import type { Organisation } from "../../interfaces";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"],
})
export class ListUserComponent implements OnInit, OnDestroy {
  @Input() public userRights: UserRightsForOrganizations[];
  @Input() public me!: User | null;
  @Input() private readonly organisation!: Organisation;

  public readonly UserRole = UserRole;
  public readonly USER_ROLES_COLORS = USER_ROLES_COLORS;
  private readonly subscription = new Subscription();

  public routePrefix: string;

  constructor(
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly posthogService: PosthogService
  ) {
    this.userRights = [];
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public captureEvent(eventName: string, properties?: PosthogProperties): void {
    this.posthogService.capture(`admin-orga-list-user-${eventName}`, {
      ...properties,
      organizationId: this.organisation._id,
      organization_id: this.organisation.organization_id,
    });
  }
}
