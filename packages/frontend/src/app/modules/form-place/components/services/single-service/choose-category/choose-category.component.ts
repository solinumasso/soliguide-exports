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
import { Component, EventEmitter, Input, Output } from "@angular/core";

import {
  AvailableEquipmentType,
  Categories,
  DietaryRegimesType,
  getCategoriesService,
  getCategoriesSpecificFields,
  VoucherType,
} from "@soliguide/common";

import {
  Service,
  CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE,
  CATEGORIES_SPECIFIC_FIELDS_PLACEHOLDER,
  CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL,
  THEME_CONFIGURATION,
} from "../../../../../../models";
import { FoodProductType } from "@soliguide/common";

@Component({
  selector: "app-form-choose-category-fiche",
  templateUrl: "./choose-category.component.html",
  styleUrls: ["./choose-category.component.css"],
})
export class FormChooseCategoryFicheComponent {
  @Input() public service: Service;
  @Input() public serviceIndex: number;

  public readonly CATEGORIES_NODES_WITH_ONE_DEPTH_CHILDREN =
    getCategoriesService().geCategoriesNodesWithOneDepthChildren();
  public readonly CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING =
    getCategoriesSpecificFields(THEME_CONFIGURATION.country);
  public readonly CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE =
    CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE;
  public readonly CATEGORIES_SPECIFIC_FIELDS_PLACEHOLDER =
    CATEGORIES_SPECIFIC_FIELDS_PLACEHOLDER;
  public readonly CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL =
    CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL;

  @Output() public readonly noCategory = new EventEmitter<boolean>();

  public generateSortedArray = (from: number, to: number): number[] => {
    const n = to - from + 1;
    return [...Array(n).keys()].map((i) => i + from);
  };

  public updateCategory = (category: Categories): void => {
    if (this.CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING[category]) {
      const newCategorySpecificFields = {};

      for (const specificField of this
        .CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING[category]) {
        if (this.service.categorySpecificFields?.[specificField]) {
          newCategorySpecificFields[specificField] =
            this.service.categorySpecificFields?.[specificField];
        }
      }

      this.service.categorySpecificFields = newCategorySpecificFields;
    } else {
      delete this.service.categorySpecificFields;
    }
    this.service.category = category;
  };

  public updateCategorySpecificField = (
    categorySpecificFieldValue: string,
    categorySpecificField: string
  ): void => {
    this.service.categorySpecificFields[categorySpecificField] =
      categorySpecificFieldValue;
  };

  public displayTextareaForm(categorySpecificField: string): boolean {
    return !!(
      CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE.textarea.includes(
        categorySpecificField
      ) &&
      ((categorySpecificField !== "voucherTypePrecisions" &&
        categorySpecificField !== "otherProductTypePrecisions" &&
        categorySpecificField !== "availableEquipmentPrecisions") ||
        (categorySpecificField === "voucherTypePrecisions" &&
          this.service.categorySpecificFields?.voucherType ===
            VoucherType.OTHER) ||
        (categorySpecificField === "otherProductTypePrecisions" &&
          this.service.categorySpecificFields?.foodProductType.includes(
            FoodProductType.OTHER
          )) ||
        (categorySpecificField === "availableEquipmentPrecisions" &&
          this.service.categorySpecificFields?.availableEquipmentType?.includes(
            AvailableEquipmentType.OTHER
          )))
    );
  }

  public displayChecklistForm = (categorySpecificField: string): boolean => {
    return !!(
      CATEGORIES_SPECIFIC_FIELDS_FIELD_TYPE.checklist.includes(
        categorySpecificField
      ) &&
      (categorySpecificField !== "dietaryAdaptationsType" ||
        (categorySpecificField === "dietaryAdaptationsType" &&
          this.service.categorySpecificFields?.dietaryRegimesType ===
            DietaryRegimesType.WE_ADAPT))
    );
  };
}
