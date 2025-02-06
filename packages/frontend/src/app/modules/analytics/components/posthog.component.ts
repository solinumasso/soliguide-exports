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
import { Component, EventEmitter, Inject, Output } from "@angular/core";

import type { PosthogProperties } from "@soliguide/common-angular";

import { PosthogService } from "../services/posthog.service";
import { POSTHOG_PREFIX } from "../injectors/posthog-prefix.injector";

@Component({ selector: "app-posthog-component", template: "" })
export class PosthogComponent {
  @Output() public readonly parentCaptureEvent = new EventEmitter<{
    name: string;
    properties?: PosthogProperties;
  }>();

  private defaultProperties: PosthogProperties;

  constructor(
    private readonly posthogService: PosthogService,
    @Inject(POSTHOG_PREFIX) private readonly prefix: string
  ) {
    this.defaultProperties = {};
  }

  public captureEvent = (event: {
    name: string;
    properties?: PosthogProperties;
  }): void => {
    if (this.parentCaptureEvent.observed) {
      this.parentCaptureEvent.emit({
        name: `${this.prefix}-${event.name}`,
        properties: { ...this.defaultProperties, ...event.properties },
      });
    } else {
      this.posthogService.capture(`${this.prefix}-${event.name}`, {
        ...this.defaultProperties,
        ...event.properties,
      });
    }
  };

  public updateDefaultPosthogProperties = (
    newProperties: PosthogProperties
  ): void => {
    this.defaultProperties = { ...this.defaultProperties, ...newProperties };
  };
}
