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
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  Service,
  CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES,
  CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL,
} from "../../../../../../../models";
import {
  CategoriesSpecificFieldsEnumValue,
  DietaryRegimesType,
} from "@soliguide/common";
@Component({
  selector: "app-choose-subcategory-checklist",
  templateUrl: "./choose-subcategory-checklist.component.html",
  styleUrls: ["./choose-subcategory-checklist.component.css"],
})
export class ChooseSubCategoryChecklistComponent implements OnInit, OnDestroy {
  @Input() public service: Service;
  @Input() public serviceIndex: number;
  @Input() public categorySpecificField: string;
  public constructor(private readonly translateService: TranslateService) {}
  public readonly CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES =
    CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES;
  public readonly CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL =
    CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL;
  public stringToDisplay: string = "";
  public ngOnInit() {
    if (!this.service.categorySpecificFields) {
      this.service.categorySpecificFields = {};
    }
    if (!this.service.categorySpecificFields[this.categorySpecificField]) {
      this.service.categorySpecificFields[this.categorySpecificField] = [];
    }
    this.updateStringToDisplay();
  }
  ngOnDestroy() {
    if (
      this.service.categorySpecificFields?.dietaryRegimesType &&
      this.service.categorySpecificFields.dietaryRegimesType !==
        DietaryRegimesType.WE_ADAPT
    ) {
      delete this.service.categorySpecificFields.dietaryAdaptationsType;
    }
  }
  public toggleCheckbox(value: CategoriesSpecificFieldsEnumValue): void {
    const fieldIndex =
      this.service.categorySpecificFields[this.categorySpecificField].indexOf(
        value
      );
    if (fieldIndex === -1) {
      this.service.categorySpecificFields[this.categorySpecificField].push(
        value
      );
    } else {
      this.service.categorySpecificFields[this.categorySpecificField].splice(
        fieldIndex,
        1
      );
    }
    this.service.categorySpecificFields[this.categorySpecificField].sort(
      (a, b) => {
        return (
          CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES[
            this.categorySpecificField
          ].indexOf(a) -
          CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES[
            this.categorySpecificField
          ].indexOf(b)
        );
      }
    );
    this.updateStringToDisplay();
  }

  private updateStringToDisplay(): void {
    const displayValue =
      this.service.categorySpecificFields[this.categorySpecificField];
    this.stringToDisplay = displayValue
      .map((field) => this.translateService.instant(field.toUpperCase()))
      .join(", ");
  }
}
