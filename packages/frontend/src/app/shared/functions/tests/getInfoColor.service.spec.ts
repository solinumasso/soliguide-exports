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
import { getInfoColor } from "../getInfoColor.service";
import { addDays } from "date-fns";

describe("Validité des infos et messages temporaires", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2021-04-23T00:00:00.000Z"));
  });

  const dateDebutActive = new Date("2021-03-22T00:00:00.000Z");
  const dateFinActive = new Date("2021-05-22T00:00:00.000Z");

  const sixteenDaysbefore = new Date("2021-03-06T00:00:00.000Z");

  it("Validité inactive : couleur aucune", () => {
    const tmpNow = getInfoColor(null, null);
    expect(tmpNow).toBeTruthy();
    expect(tmpNow.infoColor).toEqual("");
  });

  it("Validité active : couleur danger", () => {
    const tmpNow = getInfoColor(dateDebutActive, dateFinActive);
    expect(tmpNow).toBeTruthy();
    expect(tmpNow.infoColor).toEqual("danger");
  });

  it("Validité active : 10 jours avant , couleur warning, ", () => {
    const tmpNow = getInfoColor(addDays(new Date(), 10), dateFinActive);
    expect(tmpNow).toBeTruthy();
    expect(tmpNow.infoColor).toEqual("warning");
  });

  it("Validité active : 16 jours avant , non actif", () => {
    jest.setSystemTime(sixteenDaysbefore);
    const tmpNow = getInfoColor(addDays(new Date(), 16), dateFinActive);
    expect(tmpNow).toBeTruthy();
    expect(tmpNow.actif).toBeFalsy();
  });

  it("Validité non active : dates dépassés", () => {
    jest.setSystemTime(new Date("2021-04-23T00:00:00.000Z"));
    const dateDebutNonActive = new Date("2021-05-12T00:00:00.000Z");
    const dateFinNonActive = new Date("2021-06-22T00:00:00.000Z");

    const tmp = getInfoColor(dateDebutNonActive, dateFinNonActive);
    expect(tmp).toBeTruthy();
    expect(tmp.actif).toBeFalsy();
  });

  it("Validité non active : dates dépassés", () => {
    jest.setSystemTime(new Date("2021-04-23T00:00:00.000Z"));
    const dateDebutNonActive = new Date("2021-03-12T00:00:00.000Z");
    const dateFinNonActive = new Date("2021-04-22T00:00:00.000Z");

    const tmp = getInfoColor(dateDebutNonActive, dateFinNonActive);
    expect(tmp).toBeTruthy();
    expect(tmp.actif).toBeFalsy();
  });
});
