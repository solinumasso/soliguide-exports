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
import { translator } from "./i18n.config";

import {
  PLACE_PUBLICS_MOCK,
  PlacePublicsMock,
} from "./mocks/PLACE_PUBLICS.mock";

import { SupportedLanguagesCode } from "../enums";
import { translatePublics } from "../functions";

PLACE_PUBLICS_MOCK.forEach((publicForTest: PlacePublicsMock) => {
  describe(`Should translate publics in all languages ${publicForTest.name}`, () => {
    it("French", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.FR,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.fr);
    });
    it("Arabic", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.AR,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.ar);
    });
    it("Catalan", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.CA,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.ca);
    });
    it("English", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.EN,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.en);
    });
    it("Spanish", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.ES,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.es);
    });
    it("Farsi", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.FA,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.fa);
    });
    it("Georgian", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.KA,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.ka);
    });
    it("Pachto", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.PS,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.ps);
    });
    it("Romanian", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.RO,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.ro);
    });
    it("Russian", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.RU,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.ru);
    });
    it("Ukrainian", () => {
      expect(
        translatePublics(
          translator,
          SupportedLanguagesCode.UK,
          publicForTest.publics
        )
      ).toEqual(publicForTest.expectedResults.uk);
    });
  });
});
