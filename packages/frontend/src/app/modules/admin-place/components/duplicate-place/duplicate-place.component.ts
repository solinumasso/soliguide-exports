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
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";

import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { ToastrService } from "ngx-toastr";

import { Subscription } from "rxjs";

import { AdminPlaceService } from "../../../form-place/services/admin-place.service";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import { User } from "../../../users/classes/user.class";
import { AuthService } from "../../../users/services/auth.service";

import { Place } from "../../../../models/place/classes/place.class";

import { DEFAULT_MODAL_OPTIONS } from "../../../../shared";

import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-duplicate-place",
  templateUrl: "./duplicate-place.component.html",
  styleUrls: ["./duplicate-place.component.css"],
})
export class DuplicatePlaceComponent implements OnInit, OnDestroy {
  @ViewChild("duplicatePlaceModal", { static: true })
  duplicatePlaceModal!: TemplateRef<NgbModalRef>;
  @Input() public place!: Place;
  @Input() public buttonVersion: "light" | "complete" = "complete";
  private readonly subscription = new Subscription();
  public user: User;

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly modalService: NgbModal,
    private readonly authService: AuthService,
    private readonly adminPlaceService: AdminPlaceService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {
    this.user = null;
  }

  public ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public cancelDuplication(): void {
    this.modalService.dismissAll();
  }

  public openModal(): void {
    this.modalService.open(this.duplicatePlaceModal, DEFAULT_MODAL_OPTIONS);
  }

  public duplicatePlace(): void {
    this.subscription.add(
      this.adminPlaceService.duplicatePlace(this.place.lieu_id).subscribe({
        next: (newPlace: Place) => {
          this.modalService.dismissAll();
          this.toastr.success(
            this.translateService.instant("PLACE_DUPLICATED_SUCCESSFULLY")
          );

          const url = this.router.serializeUrl(
            this.router.createUrlTree([
              this.currentLanguageService.routePrefix,
              "manage-place",
              newPlace.lieu_id,
            ])
          );

          const fakeLink = document.createElement("a");
          fakeLink.href = url;
          fakeLink.target = "_blank";
          fakeLink.style.display = "none";
          document.body.appendChild(fakeLink);
          fakeLink.click();
          document.body.removeChild(fakeLink);
        },
        error: () => {
          this.toastr.error(this.translateService.instant("DUPLICATE_FAIL"));
        },
      })
    );
  }
}
