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

import { CommonOpeningHours, OpeningHoursContext } from "../../hours";
import { Modalities } from "../../modalities";
import { Publics } from "../../publics";
import { ServiceSaturation } from "../../services";

// [CATEGORY] File to remove after complete switch
export class CommonPlaceService {
  public categorie?: number;

  public close: {
    actif: boolean;
    dateDebut: Date | null;
    dateFin: Date | null;
  };

  public description: string;
  public differentHours: boolean;
  public differentModalities: boolean;
  public differentPublics: boolean;
  public hours: CommonOpeningHours;
  public isOpenToday: boolean;
  public jobsList?: string;
  public modalities: Modalities;
  public name?: string;
  public publics: Publics;

  public saturated: {
    status: ServiceSaturation;
    precision: string | null;
  };

  public serviceObjectId: any;
  public createdAt: Date;

  constructor(service?: Partial<CommonPlaceService>, isInForm = false) {
    if (service?.categorie) {
      this.categorie = service?.categorie;
    }
    this.description = service?.description ?? "";

    this.differentHours = service?.differentHours ?? false;
    this.differentPublics = service?.differentPublics ?? false;
    this.differentModalities = service?.differentModalities ?? false;

    this.isOpenToday = service?.isOpenToday ?? true;

    this.jobsList = service?.jobsList ?? "";

    this.name = service?.name ?? "";

    this.saturated = {
      status: ServiceSaturation.LOW,
      precision: null,
    };

    if (service?.saturated) {
      this.saturated = service.saturated;
    }

    this.serviceObjectId = service?.serviceObjectId ?? null;

    this.close = {
      actif: service?.close?.actif ?? false,
      dateDebut: service?.close?.dateDebut
        ? new Date(service?.close.dateDebut)
        : null,
      dateFin: service?.close?.dateFin
        ? new Date(service?.close.dateFin)
        : null,
    };

    this.hours = new CommonOpeningHours(
      service?.hours,
      isInForm ? OpeningHoursContext.ADMIN : OpeningHoursContext.PUBLIC
    );

    this.modalities = new Modalities(service?.modalities);

    this.publics = new Publics(service?.publics);

    this.createdAt = service?.createdAt
      ? new Date(service?.createdAt)
      : new Date();
  }
}
