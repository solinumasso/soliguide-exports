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
import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import { AdminPlaceMenuSteps, PlaceType } from "@soliguide/common";

import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

import { Observable, Subscription } from "rxjs";

import { AdminPlaceService } from "../../services/admin-place.service";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import { User } from "../../../users/classes";
import { AuthService } from "../../../users/services/auth.service";

import { Place, THEME_CONFIGURATION } from "../../../../models/";

import { ChatService } from "../../../shared/services/chat.service";

@Component({
  selector: "app-form-place-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class FormMenuPlaceComponent implements OnInit, OnDestroy {
  @Input() public place!: Place;
  @Input() public step!: AdminPlaceMenuSteps;

  private readonly subscription = new Subscription();
  public readonly isChatEnabled = !!THEME_CONFIGURATION.chatWebsiteId;
  public routePrefix: string;
  public placeInOrga: boolean;
  public readonly PlaceType = PlaceType;

  public currentUserSubject$: Observable<User | null>;

  constructor(
    private readonly toastr: ToastrService,
    private readonly adminPlaceService: AdminPlaceService,
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {
    this.currentUserSubject$ = this.authService.currentUserSubject;
    this.placeInOrga = false;
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );
    if (this.authService.currentUserValue.currentOrga) {
      this.placeInOrga = true;
    } else if (this.place?.lieu_id !== null) {
      this.subscription.add(
        this.adminPlaceService
          .checkInOrga(this.place.lieu_id)
          .subscribe((value: boolean) => {
            this.placeInOrga = value;
          })
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public infoStepNeeded() {
    this.toastr.warning(
      this.translateService.instant("MUST_COMPLETE_THIS_STEP_BEFORE_NEXT")
    );
  }

  public openChat() {
    this.chatService.openChat(this.authService.currentUserValue);
  }
}
