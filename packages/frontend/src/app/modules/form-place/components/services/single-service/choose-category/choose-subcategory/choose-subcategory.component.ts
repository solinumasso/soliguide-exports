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
  Service,
  CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES,
  CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL,
  THEME_CONFIGURATION,
} from "../../../../../../../models";

@Component({
  selector: "app-form-choose-subcategory",
  templateUrl: "./choose-subcategory.component.html",
  styleUrls: ["./choose-subcategory.component.css"],
})
export class FormChooseSubCategoryComponent {
  @Input() public service: Service;
  @Input() public serviceIndex: number;
  @Input() public categorySpecificField: string;

  public readonly CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES =
    CATEGORIES_SPECIFIC_FIELDS_ENUM_VALUES;
  public readonly CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL =
    CATEGORIES_SPECIFIC_FIELDS_FORM_LABEL;
  public readonly THEME_CONFIGURATION = THEME_CONFIGURATION;
}
