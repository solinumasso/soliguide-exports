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

import { CurrentLanguageService } from "./current-language.service";
import { LanguageDirection } from "../../translations/enums";
import { SupportedLanguagesCode } from "@soliguide/common";

describe("CurrentLanguageService", () => {
  let service: CurrentLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
    service = TestBed.inject(CurrentLanguageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should works with default language", () => {
    expect(service.currentLanguage).toStrictEqual("fr");
    expect(service.routePrefix).toStrictEqual("/fr");
  });

  it("should set current language", () => {
    let index = 0;
    const expectedLanguages = ["fr", "es"];
    service.subscribe((language) => {
      expect(language).toStrictEqual(expectedLanguages[index]);
      expect(service.currentLanguage).toStrictEqual(expectedLanguages[index]);
      expect(service.routePrefix).toStrictEqual("/" + expectedLanguages[index]);
      index++;
    });
    service.setCurrentLanguage("es");
    expect(index).toStrictEqual(expectedLanguages.length);
  });

  it("should change direction", () => {
    service.setCurrentLanguage(SupportedLanguagesCode.ES);
    expect(service.direction).toStrictEqual(LanguageDirection.LTR);
    service.setCurrentLanguage(SupportedLanguagesCode.AR);
    expect(service.direction).toStrictEqual(LanguageDirection.RTL);
  });

  it("should not accept a wrong language", (done) => {
    try {
      service.setCurrentLanguage("it");
      done("Exception not thrown");
    } catch (e) {
      expect(e).toEqual(new Error("BAD_LANGUAGE"));
      done();
    }
  });
});
