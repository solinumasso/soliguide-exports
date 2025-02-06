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
import { Component } from "@angular/core";

import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DateFrDirective } from "./date-fr.directive";

@Component({
  template: '<input type="text" name="dateNaissance" dateFr />',
})
class TestHoverFocusComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public value: any;
}

describe("Directive: Date FR", () => {
  let fixture: ComponentFixture<TestHoverFocusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, DateFrDirective],
    });

    fixture = TestBed.createComponent(TestHoverFocusComponent);
  }));

  it("should be created", fakeAsync(() => {
    const numberDebug = fixture.debugElement.query(By.css("input"));
    const numberInput = numberDebug.nativeElement as HTMLInputElement;
    numberDebug.triggerEventHandler("keydown", { bubbles: true, key: 2 });
    tick();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(numberInput.value).toEqual("");
    });
  }));
});
