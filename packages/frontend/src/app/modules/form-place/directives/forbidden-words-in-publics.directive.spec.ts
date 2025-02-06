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
import { Component, DebugElement, Input } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

import { ForbiddenValidatorDirective } from "./forbidden-words-in-publics.directive";

@Component({
  template: `
    <textarea
      #control="ngModel"
      appForbiddenWordsInPublics
      [(ngModel)]="inputText"
    ></textarea>
    <div *ngIf="control.hasError" class="test"></div>
  `,
})
class TestComponent {
  @Input() public inputText: string;
}

describe("ForbiddenWordsInPublicsDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debug: DebugElement[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ForbiddenValidatorDirective],
      imports: [FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.inputText = "RDV";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("the textarea should have error", () => {
    debug = fixture.debugElement.queryAll(By.css("div.test"));
    expect(debug.length).toBe(1);
  });
});
