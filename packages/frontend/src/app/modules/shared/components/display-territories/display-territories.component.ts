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
import {
  AnyDepartmentCode,
  CommonUser,
  DEPARTMENTS_MAP,
  getTerritoriesFromAreas,
} from "@soliguide/common";
import { THEME_CONFIGURATION } from "../../../../models";
import { Organisation } from "../../../admin-organisation/interfaces";

@Component({
  selector: "app-display-territories",
  templateUrl: "./display-territories.component.html",
  styleUrls: ["./display-territories.component.css"],
})
export class DisplayTerritoriesComponent implements OnInit {
  @Input() public organizationOrUser: CommonUser | Organisation;

  public departments: AnyDepartmentCode[] = [];

  public readonly DEPARTMENTS_LIST =
    DEPARTMENTS_MAP[THEME_CONFIGURATION.country];

  public readonly allDepartmentsLength = Object.values(
    DEPARTMENTS_MAP[THEME_CONFIGURATION.country]
  ).length;

  ngOnInit() {
    this.departments = getTerritoriesFromAreas(
      this.organizationOrUser,
      THEME_CONFIGURATION.country
    );
  }
}
