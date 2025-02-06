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
import { Component, Input } from "@angular/core";

import { PlaceChangesStatus } from "@soliguide/common";

import { ToastrService } from "ngx-toastr";

import { PlaceChangesService } from "../../services/place-changes.service";

import { PlaceChanges } from "../../../../models/place-changes";

import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-check-place-changes",
  templateUrl: "./check-place-changes.component.html",
  styleUrls: ["./check-place-changes.component.css"],
})
export class CheckPlaceChangesComponent {
  @Input() public placeChanges!: PlaceChanges;
  @Input() public changeIndex!: number;

  public readonly PlaceChangesStatus = PlaceChangesStatus;
  public PlaceChangesStatusValues = Object.keys(
    PlaceChangesStatus
  ) as PlaceChangesStatus[];

  constructor(
    private readonly placeChangesService: PlaceChangesService,
    private readonly toastr: ToastrService,
    private readonly translateService: TranslateService
  ) {}

  public updateStatus(placeChanges: PlaceChanges, status: PlaceChangesStatus) {
    if (status === placeChanges.status) {
      return;
    }

    this.placeChangesService.updateStatus(placeChanges._id, status).subscribe({
      next: () => {
        placeChanges.status = status;
        this.toastr.success(
          this.translateService.instant("POSITION_UPDATE_SUCCESS")
        );
      },
      error: () => {
        this.toastr.error(
          this.translateService.instant(
            "IMPOSSIBLE_TO_UPDATE_STRUCTURES_UPDATE"
          )
        );
      },
    });
  }
}
