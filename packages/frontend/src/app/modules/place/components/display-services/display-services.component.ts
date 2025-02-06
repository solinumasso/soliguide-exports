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

import {
  ServiceSaturation,
  TempInfoType,
  Categories,
  getCategoriesSpecificFields,
} from "@soliguide/common";

import {
  CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL,
  CATEGORIES_SPECIFIC_FIELDS_PLACE_DISPLAYED,
  Service,
  THEME_CONFIGURATION,
} from "../../../../models";
import { PosthogComponent } from "../../../analytics/components/posthog.component";
import { FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS } from "../../../../shared/constants/FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS.const";
import { PosthogService } from "../../../analytics/services/posthog.service";

@Component({
  selector: "app-display-services",
  templateUrl: "./display-services.component.html",
  styleUrls: ["./display-services.component.css"],
})
export class DisplayServicesComponent extends PosthogComponent {
  @Input() public services!: Service[];
  @Input() public dateForTest!: Date;
  @Input() public specificField!: string;

  public readonly Categories = Categories;

  public readonly CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING =
    getCategoriesSpecificFields(THEME_CONFIGURATION.country);
  public readonly CATEGORIES_SPECIFIC_FIELDS_PLACE_DISPLAYED =
    CATEGORIES_SPECIFIC_FIELDS_PLACE_DISPLAYED;
  public readonly CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL =
    CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL;
  public readonly FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS =
    FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS;

  public readonly ServiceSaturation = ServiceSaturation;
  public readonly TempInfoType = TempInfoType;

  constructor(posthogService: PosthogService) {
    super(posthogService, "display-services");
  }
}
