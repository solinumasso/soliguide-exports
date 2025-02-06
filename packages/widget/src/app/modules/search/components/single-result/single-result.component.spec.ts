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
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { TranslateModule } from "@ngx-translate/core";

import { SingleResultComponent } from "./single-result.component";

import { KmToMeters } from "../../pipes/convert-km-to-meters.pipe";
import { LimitToPipe } from "../../pipes/limit-to.pipe";

import { DEFAULT_WIDGET_PLACE } from "../../../../models";
import { PosthogService } from "../../../analytics/services/posthog.service";
import { CommonPosthogMockService } from "../../../analytics/mocks/CommonPosthogMockService.mock";
import { FormatInternationalPhoneNumberPipe } from "../../../shared/pipes/formatInternationalPhoneNumber.pipe";

describe("SingleResultComponent", () => {
  let component: SingleResultComponent;
  let fixture: ComponentFixture<SingleResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleResultComponent, LimitToPipe, KmToMeters],
      imports: [
        NoopAnimationsModule,
        TranslateModule.forRoot({}),
        FormatInternationalPhoneNumberPipe,
      ],
      providers: [
        { provide: PosthogService, useClass: CommonPosthogMockService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleResultComponent);
    component = fixture.componentInstance;
    component.place = DEFAULT_WIDGET_PLACE;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
