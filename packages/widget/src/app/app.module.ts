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
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from "@ngx-translate/core";

import { DEFAULT_LANG } from "@soliguide/common";

import { ToastrModule } from "ngx-toastr";

import { GeneralModule } from "./modules/general/general.module";
import { IframeGeneratorModule } from "./modules/iframe-generator/iframe-generator.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { SharedModule } from "./modules/shared/shared.module";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { translateFactory, CustomLoaderTranslate } from "./shared";

import { ThemeService } from "./services/theme.service";
import { ServerErrorInterceptor } from "./interceptors/server-interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AnalyticsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    GeneralModule,
    HttpClientModule,
    IframeGeneratorModule,
    NgbModule,
    SharedModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoaderTranslate,
        deps: [HttpClient],
      },
      defaultLanguage: DEFAULT_LANG,
    }),
  ],
  providers: [
    {
      useClass: ServerErrorInterceptor,
      multi: true,
      provide: HTTP_INTERCEPTORS,
    },
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
