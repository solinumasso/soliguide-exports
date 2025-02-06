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
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ManageMultipleSelectComponent } from "./components/manage-multiple-select/manage-multiple-select.component";
import { ManagePaginationComponent } from "./components/manage-pagination/manage-pagination.component";
import { ManageSortIconComponent } from "./components/manage-sort-icon/manage-sort-icon.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ManageMultipleSelectComponent,
    ManagePaginationComponent,
    ManageSortIconComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    TranslateModule,
  ],
  exports: [
    ManageMultipleSelectComponent,
    ManagePaginationComponent,
    ManageSortIconComponent,
  ],
})
export class ManageCommonModule {}
