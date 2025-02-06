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
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormPhoneInputComponent } from "./form-phone-input.component";
import { CountryCodes } from "@soliguide/common";

describe("FormPhoneInputComponent", () => {
  let component: FormPhoneInputComponent;
  let fixture: ComponentFixture<FormPhoneInputComponent>;

  const formBuilder = new FormBuilder();
  const form = formBuilder.group({
    entity: formBuilder.group({ phones: formBuilder.array([]) }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPhoneInputComponent);
    component = fixture.componentInstance;

    component.submitted = false;
    component.phoneLabelPlaceholder = "placeHolder";
    component.phone = {
      phoneNumber: "0606060606",
      isSpecialPhoneNumber: false,
      countryCode: CountryCodes.FR,
      label: "",
    };
    component.index = 0;
    component.needLabel = false;
    component.parentForm = form.controls.entity as FormGroup;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
