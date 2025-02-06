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
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

import { Subscription } from "rxjs";

import { AdminPlaceService } from "../../services/admin-place.service";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import { Place } from "../../../../models/place/classes/place.class";

@Component({
  selector: "app-photos",
  templateUrl: "./photos.component.html",
  styleUrls: ["./photos.component.css"],
})
export class PhotosComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  public routePrefix: string;
  public place: Place;
  public loading: boolean;

  constructor(
    private readonly titleService: Title,
    private readonly adminPlaceService: AdminPlaceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService
  ) {
    this.loading = false;
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );

    this.titleService.setTitle(
      this.translateService.instant("EDITING_PHOTOS_OF", {
        placeName: this.place?.name ?? "",
      })
    );

    this.subscription.add(
      this.translateService.onLangChange.subscribe({
        next: () => {
          this.titleService.setTitle(
            this.translateService.instant("EDITING_PHOTOS_OF", {
              placeName: this.place?.name ?? "",
            })
          );
        },
      })
    );
    this.subscription.add(
      this.route.params.subscribe((params) => {
        if (params.lieu_id) {
          const id = params.lieu_id;
          this.subscription.add(
            this.adminPlaceService.getPlace(id, true).subscribe({
              next: (place: Place) => {
                this.place = place;

                this.titleService.setTitle(
                  this.translateService.instant("EDITING_PHOTOS_OF", {
                    placeName: this.place.name,
                  })
                );
              },
              error: () => {
                this.router.navigate([
                  this.currentLanguageService.routePrefix,
                  "fiche",
                  id,
                ]);
              },
            })
          );
        } else {
          this.router.navigate([
            this.currentLanguageService.routePrefix,
            "404",
          ]);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public submitPhotos() {
    this.loading = true;
    this.subscription.add(
      this.adminPlaceService.patchPhotos(this.place).subscribe({
        next: (place: Place) => {
          const route = `${this.currentLanguageService.routePrefix}/manage-place/${place.lieu_id}`;
          this.router.navigate([route]);
        },
        error: () => {
          this.loading = false;
          this.toastr.error(
            this.translateService.instant("ERROR_EDITING_PHOTOS")
          );
        },
      })
    );
  }
}
