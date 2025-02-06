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

import { SupportedLanguagesCode } from "../enums";
import { translateDateInterval } from "../functions";

beforeAll(() => {
  jest.useFakeTimers();
  // Use a fake date to check function result
  jest.setSystemTime(new Date("2022-11-11T01:00:00.000Z"));
});

describe("Should display date of active temp information (hours, closure and message)", () => {
  it("From dd/MM/YYY to dd/MM/YYY", () => {
    const INTERVAL_IN_PROGRESS = {
      dateDebut: "2022-06-01T00:00:00.000Z",
      dateFin: "2022-12-31T23:59:59.999Z",
    };

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.FR,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("Du 01/06/2022 au 31/12/2022");

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.EN,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("From 01/06/2022 to 31/12/2022");
  });

  it("Start before Today and no end Date : Since dd/MM/YYY", () => {
    const INTERVAL_IN_PROGRESS = {
      dateDebut: new Date("2022-06-01T00:00:00.000Z"),
      dateFin: null,
    };

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.FR,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("Depuis le 01/06/2022");

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.EN,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("Since 01/06/2022");
  });

  it("Start tomorrow without end date: From dd/MM/YYYY", () => {
    const INTERVAL_IN_PROGRESS = {
      dateDebut: new Date("2022-12-12T00:00:00.000Z"),
      dateFin: null,
    };

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.FR,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("À partir du 12/12/2022");

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.EN,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("From 12/12/2022");
  });

  it("Start date = End date, will return one day", () => {
    const INTERVAL_IN_PROGRESS = {
      dateDebut: new Date("2022-12-25T00:00:00.000Z"),
      dateFin: new Date("2022-12-25T00:00:00.000Z"),
    };

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.FR,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("Le 25/12/2022");

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.EN,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("On 25/12/2022");

    expect(
      translateDateInterval(
        translator,
        SupportedLanguagesCode.ES,
        INTERVAL_IN_PROGRESS.dateDebut,
        INTERVAL_IN_PROGRESS.dateFin
      )
    ).toEqual("El 25/12/2022");
  });
});
