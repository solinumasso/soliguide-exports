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
import { PlaceUpdateCampaignGeneralInformation } from "./PlaceUpdateCampaignGeneralInformation.class";
import { PlaceUpdateCampaignSections } from "./PlaceUpdateCampaignSections.class";

import {
  CampaignPlaceAutonomy,
  CampaignSource,
  CampaignStatus,
} from "../enums";

export class PlaceUpdateCampaign {
  public autonomy: CampaignPlaceAutonomy;
  public currentStep: number;
  public general: PlaceUpdateCampaignGeneralInformation;
  public remindMeDate: Date | null;
  public sections: PlaceUpdateCampaignSections;
  public source: CampaignSource | null;
  public status: CampaignStatus;
  public toUpdate: boolean;

  constructor(placeUpdateCampaign?: Partial<PlaceUpdateCampaign>) {
    this.autonomy =
      placeUpdateCampaign?.autonomy ?? CampaignPlaceAutonomy.UNKNOWN;
    this.currentStep = placeUpdateCampaign?.currentStep ?? 0;
    this.general = new PlaceUpdateCampaignGeneralInformation(
      placeUpdateCampaign?.general
    );
    this.remindMeDate = placeUpdateCampaign?.remindMeDate
      ? new Date(placeUpdateCampaign.remindMeDate)
      : null;
    this.sections = new PlaceUpdateCampaignSections(
      placeUpdateCampaign?.sections
    );
    this.source = placeUpdateCampaign?.source ?? null;
    this.status = placeUpdateCampaign?.status ?? CampaignStatus.TO_DO;
    this.toUpdate = placeUpdateCampaign?.toUpdate ?? false;
  }
}
