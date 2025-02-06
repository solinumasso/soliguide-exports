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
import { RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";

import { GcuComponent } from "./components/gcu/gcu.component";
import { HelpSearchComponent } from "./components/help-search/help-search.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PersonalDataProtectionAgreementComponent } from "./components/personal-data-protection-agreement/personal-data-protection-agreement.component";

@NgModule({
  declarations: [
    GcuComponent,
    HelpSearchComponent,
    NotFoundComponent,
    PersonalDataProtectionAgreementComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forRoot([]),
    SharedModule,
    TranslateModule,
  ],
})
export class GeneralModule {}
