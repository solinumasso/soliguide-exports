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
import { AnalyticsService } from "../../services/analytics.service";

import { IframeFormType, IframeGeneratorStep } from "../../types";

@Component({
  selector: "app-gcu-form",
  templateUrl: "./gcu-form.component.html",
  styleUrls: ["./gcu-form.component.scss"],
})
export class GcuFormComponent {
  @Input() public formValue!: IframeFormType;

  constructor(private readonly analyticsService: AnalyticsService) {}

  public toggleGcu = async (): Promise<void> => {
    await this.analyticsService.capture(
      "update-cgu",
      IframeGeneratorStep.CGU,
      this.formValue,
      { newValue: !this.formValue.gcu }
    );
    this.formValue.gcu = !this.formValue.gcu;
  };
}
