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

import { ONLINE_PLACE } from "../mocks";
import { computeTempIsActive } from "./computeTempIsActive";

describe("computeTempIsActive", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return false when temporary period is not active", () => {
    const inactivePlace = {
      ...ONLINE_PLACE,
      tempInfos: {
        hours: { ...ONLINE_PLACE.tempInfos.hours, actif: false },
      },
    };
    expect(computeTempIsActive(inactivePlace.tempInfos.hours)).toBe(false);
  });

  it("should return true when hours tempInfos date is active", () => {
    jest.setSystemTime(new Date("2024-06-15"));
    const activePlace = {
      ...ONLINE_PLACE,
      tempInfos: {
        hours: {
          ...ONLINE_PLACE.tempInfos.hours,
          actif: true,
          dateDebut: new Date("2024-06-01"),
          dateFin: new Date("2024-06-30"),
        },
      },
    };
    expect(computeTempIsActive(activePlace.tempInfos.hours)).toBe(true);
  });

  it("should return true when closure tempInfos date is active", () => {
    jest.setSystemTime(new Date("2024-06-15"));
    const activePlace = {
      ...ONLINE_PLACE,
      tempInfos: {
        closure: {
          ...ONLINE_PLACE.tempInfos.closure,
          actif: true,
          dateDebut: new Date("2024-06-01"),
          dateFin: new Date("2024-06-30"),
        },
      },
    };
    expect(computeTempIsActive(activePlace.tempInfos.closure)).toBe(true);
  });

  it("should return false when current date is before start date", () => {
    jest.setSystemTime(new Date("2023-12-31"));
    const inactivePlace = {
      ...ONLINE_PLACE,
      tempInfos: {
        closure: {
          ...ONLINE_PLACE.tempInfos.closure,
          actif: true,
          dateDebut: new Date("2025-06-01"),
          dateFin: null,
        },
      },
    };
    expect(computeTempIsActive(inactivePlace.tempInfos.closure)).toBe(false);
  });

  it("should return false when current date is after tempInfos closure end date", () => {
    jest.setSystemTime(new Date("2026-01-01"));
    const inactivePlace = {
      ...ONLINE_PLACE,
      tempInfos: {
        closure: {
          ...ONLINE_PLACE.tempInfos.closure,
          actif: true,
          dateDebut: new Date("2025-06-01"),
          dateFin: new Date("2025-08-01"),
        },
      },
    };

    expect(computeTempIsActive(inactivePlace.tempInfos.closure)).toBe(false);
  });

  it("should return true when current date is after tempInfo hours start date and when no end date is null", () => {
    jest.setSystemTime(new Date("2025-01-01"));
    const placeWithoutEndDate = {
      ...ONLINE_PLACE,
      tempInfos: {
        hours: {
          actif: true,
          ...ONLINE_PLACE.tempInfos.hours,
          dateDebut: new Date("2024-01-01"),
          dateFin: null,
        },
      },
    };

    expect(computeTempIsActive(placeWithoutEndDate.tempInfos.hours)).toBe(true);
  });
});
