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
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { TranslateModule } from "@ngx-translate/core";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AutocompleteLocationComponent } from "./components/autocomplete-location/autocomplete-location.component";
import { SearchComponent } from "./components/search/search.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { SingleResultComponent } from "./components/single-result/single-result.component";

import { SearchRoutingModule } from "./search-routing.module";

import { KmToMeters } from "./pipes/convert-km-to-meters.pipe";
import { HtmlToTextPipe } from "./pipes/html-to-text.pipe";
import { LimitToPipe } from "./pipes/limit-to.pipe";
import { FormatInternationalPhoneNumberPipe } from "../shared/pipes/formatInternationalPhoneNumber.pipe";

@NgModule({
  declarations: [
    AutocompleteLocationComponent,
    HtmlToTextPipe,
    KmToMeters,
    LimitToPipe,
    SearchComponent,
    SearchResultsComponent,
    SingleResultComponent,
  ],
  exports: [SearchResultsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    TranslateModule,
    FormatInternationalPhoneNumberPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchModule {}
