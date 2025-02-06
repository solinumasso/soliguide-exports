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
import { Component, DebugElement } from "@angular/core";

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CurrentLanguageService } from "../../general/services/current-language.service";
import { TextDirectionDirective } from "./text-direction.directive";
import { SupportedLanguagesCode } from "@soliguide/common";
import { LanguageDirection } from "../../translations/enums";

@Component({
  template: `<div appTextDirection></div>`,
})
class TestComponent {}

describe("TextDirectionDirective", () => {
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;
  let currentLanguageService: CurrentLanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, TextDirectionDirective],
    }).compileComponents();

    currentLanguageService = TestBed.inject(CurrentLanguageService);
    fixture = TestBed.createComponent(TestComponent);
    divEl = fixture.debugElement.query(By.css("div"));
  });

  it("Should create TextDirectionDirective", () => {
    const directive = new TextDirectionDirective(divEl, currentLanguageService);
    expect(directive).toBeTruthy();
  });

  it("Should set dir to RTL for arabic language", () => {
    currentLanguageService.setCurrentLanguage(SupportedLanguagesCode.AR);
    fixture.detectChanges();
    expect(currentLanguageService.direction).toStrictEqual(
      LanguageDirection.RTL
    );
    expect(divEl.nativeElement.dir).toStrictEqual(LanguageDirection.RTL);
  });

  it("Should set dir to LTR for english", () => {
    currentLanguageService.setCurrentLanguage(SupportedLanguagesCode.EN);
    fixture.detectChanges();
    expect(currentLanguageService.direction).toStrictEqual(
      LanguageDirection.LTR
    );
    expect(divEl.nativeElement.dir).toStrictEqual(LanguageDirection.LTR);
  });
});
