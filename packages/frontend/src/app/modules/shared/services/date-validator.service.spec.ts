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
import { TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";
import { TranslateModule } from "@ngx-translate/core";

import { DateValidatorService } from "./date-validator.service";

describe("DateValidatorService", () => {
  let service: DateValidatorService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot({}), TranslateModule.forRoot({})],
      providers: [DateValidatorService],
    });
    service = TestBed.inject(DateValidatorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return false since d2 before d1", () => {
    const d1 = new Date();
    const d2 = new Date();
    d2.setDate(d1.getDate() - 1);
    expect(service.compareDate(d1, d2)).toBe(false);
    expect(service.validDate(d1, d2)).toBe(false);
  });

  it("should return true since d1 before d2", () => {
    const d1 = new Date();
    const d2 = new Date();
    d2.setDate(d1.getDate() + 1);
    expect(service.compareDate(d1, d2)).toBe(true);
    expect(service.validDate(d1, d2)).toBe(true);
  });

  it("should return true since we only need d1", () => {
    const d1 = new Date();
    expect(service.validDate(d1, null)).toBe(true);
  });

  it("should return false since we need d1 and d2, but we got only d1", () => {
    const d1 = new Date();
    expect(service.validDate(d1, null, true)).toBe(false);
  });
});
