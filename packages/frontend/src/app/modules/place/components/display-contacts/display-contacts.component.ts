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

import { PlaceContact } from "@soliguide/common";

import { Subscription } from "rxjs";

import { PlaceContactsService } from "../../services/place-contacts.service";

import { User } from "../../../users/classes";

import { Place } from "../../../../models/place/classes";
import { PosthogComponent } from "../../../analytics/components/posthog.component";
import { PosthogService } from "../../../analytics/services/posthog.service";

@Component({
  selector: "app-display-contacts",
  templateUrl: "./display-contacts.component.html",
  styleUrls: ["./display-contacts.component.css"],
})
export class DisplayContactsComponent
  extends PosthogComponent
  implements OnInit, OnDestroy
{
  @Input() public me!: User | null;
  @Input() public place!: Place;
  @Input() public allContacts: PlaceContact[];
  @Input() public template: "public" | "admin" | "historique";

  private readonly subscription: Subscription = new Subscription();

  public ableToSeeContacts: boolean;
  public collapsed: boolean;
  public contacts: PlaceContact[];
  public nContacts: number;
  public nLimit: number;
  public toCollapse: boolean;

  constructor(
    private readonly placeContactsService: PlaceContactsService,
    posthogService: PosthogService
  ) {
    super(posthogService, "display-contacts");
    this.ableToSeeContacts = false;
    this.collapsed = false;
    this.contacts = [];
    this.nContacts = 0;
    this.nLimit = 3;
    this.toCollapse = true;
  }

  public ngOnInit(): void {
    if (
      this.me &&
      (this.me.pro || this.me.admin) &&
      this.template !== "historique"
    ) {
      this.ableToSeeContacts = true;

      this.subscription.add(
        this.placeContactsService
          .getPlaceContacts(this.place.lieu_id)
          .subscribe((contacts: PlaceContact[]) => {
            this.contacts = contacts;
            this.nContacts = contacts.length;
            this.toCollapse = this.nContacts > 3;
            this.nLimit = this.toCollapse ? 3 : this.nContacts;
            this.collapsed = this.toCollapse;

            this.updateDefaultPosthogProperties({
              template: this.template,
              contacts: this.contacts,
            });
          })
      );
    } else if (this.template === "historique") {
      this.ableToSeeContacts = true;
      this.contacts = this.allContacts;
      this.nContacts = this.contacts.length;

      this.updateDefaultPosthogProperties({
        template: this.template,
        contacts: this.contacts,
      });
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadMoreContacts = (): void => {
    this.collapsed = !this.collapsed;
    this.nLimit = this.collapsed ? 3 : this.nContacts;

    this.captureEvent({
      name: "click-load-more-less-contacts",
      properties: { toCollapse: this.collapsed },
    });
  };
}
