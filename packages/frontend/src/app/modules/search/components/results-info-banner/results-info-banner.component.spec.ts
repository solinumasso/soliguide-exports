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
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";

import { ResultsInfoBannerComponent } from "./results-info-banner.component";
import { PosthogService } from "../../../analytics/services/posthog.service";
import { CommonPosthogMockService } from "../../../../../../mocks";
import { Categories, CountryCodes } from "@soliguide/common";

describe("ResultsInfoBannerComponent", () => {
  let component: ResultsInfoBannerComponent;
  let fixture: ComponentFixture<ResultsInfoBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsInfoBannerComponent],
      imports: [TranslateModule.forRoot({})],
      providers: [
        { provide: PosthogService, useClass: CommonPosthogMockService },
        provideHttpClient(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsInfoBannerComponent);
    component = fixture.componentInstance;
    component.category = Categories.PARENT_ASSISTANCE;
    component.areas = {
      slugs: {},
      country: CountryCodes.FR,
      pays: "france",
      regionCode: "11",
      departementCode: "75",
      codePostal: "75009",
      departement: "Paris",
      region: "Île-de-France",
      ville: "Paris",
    };
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
