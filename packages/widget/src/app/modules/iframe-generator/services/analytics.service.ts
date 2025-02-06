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
import { Injectable } from "@angular/core";
import { PosthogService } from "../../analytics/services/posthog.service";
import { IframeFormType, IframeGeneratorStep } from "../types";

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  constructor(private readonly posthogService: PosthogService) {}

  public async capture(
    eventName: string,
    currentStep: IframeGeneratorStep,
    formValues?: IframeFormType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties?: Record<string, any>
  ) {
    const currentStepName = IframeGeneratorStep[currentStep].toLowerCase();
    await this.posthogService.capture(
      `iframe-generator-${currentStepName}-${eventName}`,
      {
        ...properties,
        formValues,
        currentStep,
      }
    );
  }

  public async identify(email: string, organization: string) {
    await this.posthogService.identify(email, { organization });
  }
}
