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
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import type { CountUpOptions } from "countup.js";

import type { PosthogProperties } from "@soliguide/common-angular";

import { GeneralService } from "../../services/general.services";
import { CurrentLanguageService } from "../../services/current-language.service";
import { PosthogService } from "../../../analytics/services/posthog.service";
import { THEME_CONFIGURATION } from "../../../../models";

@Component({
  selector: "app-home-territories-stats",
  templateUrl: "./home-territories-stats.component.html",
})
export class HomeTerritoriesStatsComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  public routePrefix: string;

  public readonly THEME_CONFIGURATION = THEME_CONFIGURATION;

  public statsTotal = 0;
  public statsServices = 0;
  public readonly countUpOptions: CountUpOptions = {
    duration: 2,
  } as const;

  constructor(
    private readonly generalService: GeneralService,
    private readonly posthogService: PosthogService,
    private readonly currentLanguageService: CurrentLanguageService
  ) {
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    // No need to load stats if we do not display them
    if (THEME_CONFIGURATION.territoriesStats) {
      this.subscription.add(
        this.currentLanguageService.subscribe(
          () => (this.routePrefix = this.currentLanguageService.routePrefix)
        )
      );

      this.subscription.add(
        this.generalService.statsAll().subscribe((statsAll) => {
          this.statsTotal = statsAll;
        })
      );

      this.subscription.add(
        this.generalService.statsServices().subscribe((statsServices) => {
          this.statsServices = statsServices;
        })
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public captureEvent(eventName: string, properties?: PosthogProperties): void {
    this.posthogService.capture(
      `home-territories-stats-${eventName.toLocaleLowerCase()}`,
      properties
    );
  }
}
