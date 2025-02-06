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
import { Component, Input, OnInit } from "@angular/core";

import {
  CampaignChangesSection,
  PlaceChangesSection,
  PlaceStatus,
  PlaceType,
  PlaceVisibility,
} from "@soliguide/common";

import { CAMPAIGN_SOURCE_LABELS } from "../../../../models/campaign";
import { PlaceChangesTypeEdition } from "../../../../models/place-changes";
import { Place } from "../../../../models/place";
import { ServicesChanges } from "../../classes";

@Component({
  selector: "app-display-place-changes",
  templateUrl: "./display-place-changes.component.html",
  styleUrls: ["./display-place-changes.component.scss"],
})
export class DisplayPlaceChangesComponent implements OnInit {
  @Input() public oldPlace!: Place;
  @Input() public placeChanged: Place;
  @Input() public section: PlaceChangesSection | CampaignChangesSection;
  @Input() public photosChanged: boolean;
  @Input() public changesDate: Date;
  @Input() public changeSection: "old" | "new";
  @Input() public typeOfEdition: PlaceChangesTypeEdition;

  public readonly CAMPAIGN_SOURCE_LABELS = CAMPAIGN_SOURCE_LABELS;

  public readonly PlaceChangesSection = PlaceChangesSection;
  public readonly PlaceStatus = PlaceStatus;
  public readonly PlaceType = PlaceType;
  public readonly PlaceVisibility = PlaceVisibility;

  public servicesChanges: ServicesChanges = new ServicesChanges([], []);

  ngOnInit(): void {
    if (
      this.section === PlaceChangesSection.services &&
      this.changeSection === "new" &&
      this.oldPlace
    ) {
      this.servicesChanges = new ServicesChanges(
        this.oldPlace.services_all,
        this.placeChanged.services_all
      );
    }
  }
}
