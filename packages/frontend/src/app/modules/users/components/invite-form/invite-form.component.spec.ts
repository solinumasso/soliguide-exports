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
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { ToastrModule, ToastrService } from "ngx-toastr";

import { InviteFormComponent } from "./invite-form.component";

import { Place } from "../../../../models/place/classes";

import { ORGANIZATION_MOCK } from "../../../../../../mocks";

describe("InviteFormComponent", () => {
  let component: InviteFormComponent;
  let fixture: ComponentFixture<InviteFormComponent>;
  let places: string[];
  let toastr: ToastrService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InviteFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    places = ORGANIZATION_MOCK.places.map((place: Place) => place._id);
    fixture = TestBed.createComponent(InviteFormComponent);
    component = fixture.componentInstance;
    component.inviteForm = new FormGroup({
      lastname: new FormControl(),
      mail: new FormControl(),
      name: new FormControl(),
      organizationName: new FormControl(),
      phone: new FormControl(),
      role: new FormControl(),
      title: new FormControl(),
    });
    component.organisation = ORGANIZATION_MOCK;
    component.places = places;
    jest.spyOn(component.placesChange, "emit");
    fixture.detectChanges();
  });

  it("Doit créer le composant", () => {
    expect(component).toBeTruthy();
  });

  it("Doit retirer puis remettre l'unique place de l'orga dans le tableau des places", () => {
    toastr = TestBed.inject(ToastrService);
    jest.spyOn(toastr, "error");
    component.addToPlace(places[0]);
    expect(toastr.error).toHaveBeenCalled();
    component.addToPlace(places[0]);
    expect(component.places).toEqual(places);
  });
});
