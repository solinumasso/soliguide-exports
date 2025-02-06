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

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { Organisation } from "../../interfaces/organisation.interface";
import { OrganisationService } from "../../services/organisation.service";
import { UserForOrganization } from "../../types";
import { User } from "../../../users/classes";
import { UserRightsForOrganizations } from "@soliguide/common";

@Component({
  selector: "app-manage-roles",
  templateUrl: "./manage-roles.component.html",
  styleUrls: ["./manage-roles.component.css"],
})
export class ManageRolesComponent implements OnInit, OnDestroy {
  @Input() public me!: User | null;
  @Input() public organisation: Organisation;

  private readonly subscription = new Subscription();

  public loading = true;
  public invitationsRights: UserRightsForOrganizations[];
  public usersRights: UserRightsForOrganizations[];
  public users: UserForOrganization[];

  constructor(
    private readonly modalService: NgbModal,
    private readonly organisationService: OrganisationService
  ) {
    this.invitationsRights = [];
    this.usersRights = [];
  }

  public cancel() {
    this.modalService.dismissAll();
  }

  public ngOnInit(): void {
    this.getRolesForOrga();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getRolesForOrga = (): void => {
    this.subscription.add(
      this.organisationService
        .getRolesForOrga(this.organisation)
        .subscribe((userRights: UserRightsForOrganizations[]) => {
          this.usersRights = [];
          this.invitationsRights = [];
          for (const userRight of userRights) {
            if (userRight.verified) {
              this.usersRights.push(userRight);
            } else {
              this.invitationsRights.push(userRight);
            }
          }
          this.loading = false;
        })
    );
  };
}
