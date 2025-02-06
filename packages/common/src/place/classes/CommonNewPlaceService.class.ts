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
import { Categories } from "../../categories/enums";
import { CategoriesSpecificFields } from "../../categories/interfaces";
import { ServiceSaturation } from "../../services";
import { CommonOpeningHours, OpeningHoursContext } from "../../hours";
import { Modalities } from "../../modalities";
import { Publics } from "../../publics";
import { CommonPlaceService } from "./CommonPlaceService.class";
import { CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING } from "../../categories/constants";

export class CommonNewPlaceService extends CommonPlaceService {
  public category?: Categories;
  public categorySpecificFields?: CategoriesSpecificFields;

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
  public modalities: Modalities;
  public publics: Publics;

  public saturated: {
    status: ServiceSaturation;
    precision: string | null;
  };

  public serviceObjectId: any;
  public createdAt: Date;

  constructor(service?: Partial<CommonNewPlaceService>, isInForm = false) {
    super(service);

    this.category = service?.category;

    if (
      service?.category &&
      CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING[service.category]
    ) {
      const tempCategorySpecificFields: any = {};
      const categorySpecificFields =
        CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING[service.category] ?? [];

      for (const categorySpecificField of categorySpecificFields) {
        tempCategorySpecificFields[categorySpecificField] =
          service.categorySpecificFields?.[
            categorySpecificField as keyof CategoriesSpecificFields
          ];
      }

      this.categorySpecificFields = tempCategorySpecificFields;
    }

    this.description = service?.description ?? "";

    this.differentHours = service?.differentHours ?? false;
    this.differentPublics = service?.differentPublics ?? false;
    this.differentModalities = service?.differentModalities ?? false;

    this.isOpenToday = service?.isOpenToday ?? true;

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
