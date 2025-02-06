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
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  type TemplateRef,
  ViewChild,
} from "@angular/core";

import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

import {
  PlaceStatus,
  PlaceType,
  PlaceVisibility,
  UserRole,
} from "@soliguide/common";
import type { PosthogProperties } from "@soliguide/common-angular";

import type { Organisation } from "../../interfaces";
import type { PlaceForOrganization } from "../../types";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import type { User } from "../../../users/classes";
import { DEFAULT_MODAL_OPTIONS } from "../../../../shared";
import { PosthogService } from "../../../analytics/services/posthog.service";
import { THEME_CONFIGURATION } from "../../../../models";

@Component({
  selector: "app-list-places",
  templateUrl: "./list-places.component.html",
  styleUrls: ["./list-places.component.css"],
})
export class ListPlacesComponent implements OnInit, OnDestroy {
  @Input() public organisation: Organisation;
  @Input() public me!: User | null;

  private readonly subscription = new Subscription();

  public readonly THEME_CONFIGURATION = THEME_CONFIGURATION;
  public placeToRemove: PlaceForOrganization;
  public readonly PlaceStatus = PlaceStatus;
  public readonly PlaceVisibility = PlaceVisibility;
  public readonly UserRole = UserRole;
  public readonly PlaceType = PlaceType;
  public routePrefix: string;

  @ViewChild("removePlaceModal", { static: true })
  public removePlaceModal!: TemplateRef<NgbModalRef>;

  constructor(
    private readonly modalService: NgbModal,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly posthogService: PosthogService
  ) {
    this.placeToRemove = null;
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

  public canEditPlace(lieu_id: number): boolean {
    return (
      this.me.role === UserRole.OWNER ||
      this.me.admin ||
      (this.me.role === UserRole.EDITOR && this.me.places.includes(lieu_id))
    );
  }

  public openRemoveModal(placeToRemove: PlaceForOrganization): void {
    this.placeToRemove = placeToRemove;
    this.modalService.open(this.removePlaceModal, DEFAULT_MODAL_OPTIONS);
  }

  public captureEvent(eventName: string, properties?: PosthogProperties): void {
    this.posthogService.capture(`admin-orga-list-places-${eventName}`, {
      ...properties,
      organizationId: this.organisation._id,
      organization_id: this.organisation.organization_id,
    });
  }
}
