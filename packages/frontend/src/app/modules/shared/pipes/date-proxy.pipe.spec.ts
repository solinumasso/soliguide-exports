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
import { DateProxyPipe } from "./date-proxy.pipe";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TestBed } from "@angular/core/testing";
import { SupportedLanguagesCode } from "@soliguide/common";

import { registerLocales } from "../../../shared";
import { CurrentLanguageService } from "../../general/services/current-language.service";

describe("🌍 DateProxyPipe", () => {
  let pipe: DateProxyPipe;
  let translateService: TranslateService;

  beforeAll(() => {
    registerLocales();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          defaultLanguage: SupportedLanguagesCode.FR,
        }),
      ],
      providers: [TranslateService, CurrentLanguageService],
    });

    translateService = TestBed.inject(TranslateService);
    translateService.currentLang = SupportedLanguagesCode.FR;

    pipe = new DateProxyPipe(translateService);
  });

  it("should format date in shortDate format", () => {
    translateService.currentLang = SupportedLanguagesCode.FR;
    const result = pipe.transform(new Date(2023, 7, 16), "shortDate");
    expect(result).toEqual("16/08/2023");
  });

  it("should format date in shortDate format in Russian", () => {
    translateService.currentLang = SupportedLanguagesCode.RU;
    const result = pipe.transform(new Date(2023, 7, 16), "shortDate");
    expect(result).toEqual("16.08.2023");
  });

  it("should format date in shortDate format in English", () => {
    translateService.currentLang = SupportedLanguagesCode.EN;
    const result = pipe.transform(new Date(2023, 7, 16), "shortDate");
    expect(result).toEqual("8/16/23");
  });
});
