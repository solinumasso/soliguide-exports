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
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { Modalities } from "@soliguide/common";
import { CK_EDITOR_CONF, ModalitiesTypes } from "../../../../shared";
import { THEME_CONFIGURATION } from "../../../../models";

@Component({
  selector: "app-modalities-form",
  templateUrl: "./modalities-form.component.html",
  styleUrls: ["./modalities-form.component.css"],
})
export class ModalitiesFormComponent implements OnInit {
  @Input() public modalities: Modalities;
  @Input() public placeId: number;
  @Input() public serviceIndex: number;

  public readonly THEME_CONFIGURATION = THEME_CONFIGURATION;
  public inputPrefix: string;
  public editor = ClassicEditor;
  public editorConfig = CK_EDITOR_CONF;

  public ngOnInit(): void {
    if (typeof this.serviceIndex === "number") {
      this.inputPrefix = "service_" + this.serviceIndex.toString() + "_";
    } else {
      this.inputPrefix = "";
      this.serviceIndex = null;
    }
  }

  public changeModalities = (toSelect: ModalitiesTypes): void => {
    if (toSelect === "inconditionnel") {
      this.modalities.inconditionnel = !this.modalities.inconditionnel;
      this.modalities.orientation.checked = false;
      this.modalities.appointment.checked = false;
      this.modalities.inscription.checked = false;
    } else {
      this.modalities.inconditionnel = false;
      this.modalities[toSelect].checked = !this.modalities[toSelect].checked;
    }
  };

  public setAnimalChecked(value: boolean): void {
    this.modalities.animal.checked = value;
  }
  public setPmrChecked(value: boolean): void {
    this.modalities.pmr.checked = value;
  }

  public setPriceChecked(value: boolean): void {
    this.modalities.price = { checked: value, precisions: null };
  }
}
