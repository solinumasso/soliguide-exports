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
import { KeyValue } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

import { CAMPAIGN_DEFAULT_NAME, CampaignSource } from "@soliguide/common";

import { TranslateService } from "@ngx-translate/core";

import { ToastrService } from "ngx-toastr";

import { AdminPlaceService } from "../../../form-place/services/admin-place.service";

import { CAMPAIGN_SOURCE_LABELS } from "../../../../models/campaign";
import { Place } from "../../../../models/place";
import { PosthogService } from "../../../analytics/services/posthog.service";
import { PosthogComponent } from "../../../analytics/components/posthog.component";

@Component({
  selector: "app-campaign-source-update",
  templateUrl: "./campaign-source-update.component.html",
  styleUrls: ["./campaign-source-update.component.css"],
})
export class CampaignSourceUpdateComponent
  extends PosthogComponent
  implements OnInit
{
  @Input() public place!: Place;
  @Input() public placeIndex!: number;
  @Input() public disabled: boolean;

  public CAMPAIGN_SOURCE_LABELS = CAMPAIGN_SOURCE_LABELS;

  constructor(
    private readonly adminPlaceService: AdminPlaceService,
    private readonly toastr: ToastrService,
    private readonly translateService: TranslateService,
    posthogService: PosthogService
  ) {
    super(posthogService, "campaign-form-source-update");
    this.disabled = false;
  }

  public ngOnInit = (): void => {
    this.updateDefaultPosthogProperties({
      place: this.place,
      placeIndex: this.placeIndex,
      disabled: this.disabled,
      campaignIsActive: true,
      campaign: CAMPAIGN_DEFAULT_NAME,
    });
  };

  public updateCampaignSource = (place: Place, source: string) => {
    this.captureEvent({
      name: "click-update-source",
      properties: {
        oldSource: place.campaigns.runningCampaign.source,
        newSource: source,
      },
    });

    if (source === place.campaigns.runningCampaign.source) {
      return;
    }

    this.adminPlaceService
      .patchCampaignSource(place.lieu_id, source as CampaignSource)
      .subscribe({
        next: () => {
          place.campaigns.runningCampaign.source = source as CampaignSource;
          this.toastr.success(
            this.translateService.instant("CAMPAIGN_SOURCE_UPDATING_SUCCEEDED")
          );
        },
        error: () => {
          this.toastr.error(
            this.translateService.instant("CAMPAIGN_SOURCE_UPDATING_ERROR")
          );
        },
      });
  };

  public orderValues = (a: KeyValue<CampaignSource, string>): number => {
    if (
      a.key === CampaignSource.CALL ||
      a.key === CampaignSource.EMAIL ||
      a.key === CampaignSource.CHAT ||
      a.key === CampaignSource.CONTACT ||
      a.key === CampaignSource.VISIT ||
      a.key === CampaignSource.COORDINATION
    ) {
      return -1;
    }
    return 1;
  };
}
