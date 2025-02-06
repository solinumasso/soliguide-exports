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
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";

import { Categories, PublicsElement, WidgetId } from "@soliguide/common";

import { PublicsDropdownComponent } from "./publics-dropdown.component";

import { CommonPosthogMockService } from "../../../../analytics/mocks/CommonPosthogMockService.mock";
import { PosthogService } from "../../../../analytics/services/posthog.service";

import { WIDGETS } from "../../../../../models";
import { SharedModule } from "../../../../shared/shared.module";

describe("PublicsDropdownComponent", () => {
  let component: PublicsDropdownComponent;
  let fixture: ComponentFixture<PublicsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicsDropdownComponent],

      imports: [SharedModule, FormsModule, TranslateModule.forRoot({})],
      providers: [
        { provide: PosthogService, useClass: CommonPosthogMockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicsDropdownComponent);
    component = fixture.componentInstance;
    component.label = "GENDER";
    component.prop = PublicsElement.GENDER;
    component.formValue = {
      email: "",
      organizationName: "",
      cities: [],
      departments: [],
      national: true,
      regions: [],
      widgetId: WidgetId.SOLINUM,
      categories: [Categories.FOOD],
      publics: {},
      theme: WIDGETS[WidgetId.SOLINUM].theme,
      gcu: false,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
