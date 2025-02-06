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
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TranslateModule } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";

import { CountryCodes, GeoPosition, GeoTypes } from "@soliguide/common";

import { PartnersLogosComponent } from "./partners-logos.component";
import { LocationService } from "../../../shared/services";

describe("PartnersLogosComponent", () => {
  let component: PartnersLogosComponent;
  let fixture: ComponentFixture<PartnersLogosComponent>;

  let locationService: LocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnersLogosComponent],
      imports: [TranslateModule.forRoot({}), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnersLogosComponent);
    locationService = TestBed.inject(LocationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("should update the logos when location is updated", () => {
    it("should return no logo when 00", () => {
      expect(component.logosToDisplay?.length).toBe(0);
    });

    it("should return the good amount of logos when we're in the correct territory", async () => {
      locationService.localPositionSubject.next(
        new GeoPosition({
          label: "Cap-d'Ail (06320)",
          coordinates: [7.398891, 43.725953],
          postalCode: "06320",
          cityCode: "06032",
          city: "Cap-d'Ail",
          name: "Cap-d'Ail",
          country: CountryCodes.FR,
          geoType: GeoTypes.CITY,
          slugs: {
            ville: "cap-dail",
            departement: "alpes-maritimes",
            pays: "fr",
            department: "alpes-maritimes",
            country: "fr",
            region: "provence-alpes-cote-dazur",
            city: "cap-dail",
          },
          geoValue: "cap-dail-06320",
          departmentCode: "06",
          department: "Alpes-Maritimes",
          region: "Provence-Alpes-Côte d'Azur",
          regionCode: "93",
        })
      );

      await firstValueFrom(locationService.logosToDisplaySubject);

      expect(component.logosToDisplay?.length).toEqual(3);
    });
  });
});
