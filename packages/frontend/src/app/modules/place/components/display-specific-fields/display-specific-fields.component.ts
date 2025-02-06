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
  BabyParcelAgeType,
  DegreeOfChoiceType,
  DietaryRegimesType,
  VoucherType,
  FoodProductType,
  AvailableEquipmentType,
  getCategoriesSpecificFields,
} from "@soliguide/common";
import {
  CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE,
  CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL,
  Service,
  THEME_CONFIGURATION,
} from "../../../../models";
import { FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS } from "../../../../shared/constants/FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS.const";

@Component({
  selector: "app-display-specific-fields",
  templateUrl: "./display-specific-fields.component.html",
  styleUrls: ["./display-specific-fields.component.css"],
})
export class DisplaySpecificFieldsComponent implements OnInit {
  @Input() specificField: string;
  @Input() service: Service;

  public readonly CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING =
    getCategoriesSpecificFields(THEME_CONFIGURATION.country);
  public readonly CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE =
    CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE;
  public readonly CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL =
    CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL;
  public readonly FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS =
    FA_ICONS_FOR_CATEGORIES_SPECIFIC_FIELDS;

  public readonly BabyParcelAgeType = BabyParcelAgeType;
  public readonly DegreeOfChoiceType = DegreeOfChoiceType;
  public readonly DietaryRegimesType = DietaryRegimesType;
  public readonly VoucherType = VoucherType;
  public readonly FoodProductType = FoodProductType;
  public readonly AvailableEquipmentType = AvailableEquipmentType;

  public toDisplay: boolean;

  constructor() {
    this.toDisplay = false;
  }

  public ngOnInit(): void {
    this.toDisplay =
      this.service.categorySpecificFields?.[this.specificField]?.length &&
      ((this.specificField !== "degreeOfChoiceType" &&
        this.specificField !== "dietaryRegimesType" &&
        this.specificField !== "voucherTypePrecisions" &&
        this.specificField !== "otherProductTypePrecisions" &&
        this.specificField !== "availableEquipmentPrecisions") ||
        (this.specificField === "degreeOfChoiceType" &&
          (this.service.categorySpecificFields[this.specificField] ===
            DegreeOfChoiceType.ACCOMPAGNIED_CHOICE ||
            this.service.categorySpecificFields[this.specificField] ===
              DegreeOfChoiceType.FREE_CHOICE)) ||
        (this.specificField === "dietaryRegimesType" &&
          this.service.categorySpecificFields[this.specificField] ===
            DietaryRegimesType.TRY_TO_ADAPT));
  }
}
