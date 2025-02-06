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
import { Params } from "@angular/router";

@Component({
  selector: "app-return-to-place",
  templateUrl: "./return-to-place.component.html",
  styleUrls: ["./return-to-place.component.css"],
})
export class ReturnToPlaceComponent {
  @Input() public returnUrl!: { url: (string | number)[]; queryParams: Params };
  @Input() public buttonText!: string;
  @Input() public buttonTitle!: string;
}
