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
import { Component, Input, OnInit } from "@angular/core";
import { EXTERNAL_SOURCE_MAPPING } from "../../../../models";
import { PlaceSource } from "../../../../models/place/classes/place-sources.class";

@Component({
  selector: "app-display-sources",
  templateUrl: "./display-sources.component.html",
  styleUrls: ["./display-sources.component.scss"],
})
export class DisplaySourcesComponent implements OnInit {
  @Input() public sources: PlaceSource[];

  public isAtLeastOneSourceMustBeDisplayed: boolean;
  public sourceName: string;

  public EXTERNAL_SOURCE_MAPPING = EXTERNAL_SOURCE_MAPPING;

  ngOnInit(): void {
    this.isAtLeastOneSourceMustBeDisplayed = this.sources.some(
      (source) => source?.toDisplay
    );
  }
}
