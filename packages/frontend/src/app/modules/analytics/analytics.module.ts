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
import {
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { createErrorHandler, TraceService } from "@sentry/angular";
import { PosthogModule } from "@soliguide/common-angular";
import { environment } from "../../../environments/environment";
import { PosthogInitService } from "./services/posthog-init.service";
import { SentryService } from "./services/sentry.service";
import { POSTHOG_PREFIX } from "./injectors/posthog-prefix.injector";

@NgModule({
  imports: [
    PosthogModule.forRoot({
      posthogUrl: environment.posthogUrl,
      posthogApiKey: environment.posthogApiKey,
      posthogLibraryName: "soliguide_frontend",
      soliguideApiUrl: environment.apiUrl,
      posthogDebug: environment.environment === "DEV",
    }),
  ],
  providers: [
    PosthogInitService,
    SentryService,
    {
      provide: ErrorHandler,
      useValue: createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [TraceService],
      multi: true,
    },
    { provide: POSTHOG_PREFIX, useValue: "" },
  ],
  exports: [PosthogModule],
})
export class AnalyticsModule {
  constructor(
    sentryService: SentryService,
    posthogInitService: PosthogInitService,
    @Optional() @SkipSelf() parentModule?: AnalyticsModule
  ) {
    if (parentModule !== null) {
      throw new Error(
        "AnalyticsModule is already loaded. Import it in the AppModule only"
      );
    }
    sentryService.registerUserChange();
    posthogInitService.init();
  }
}
