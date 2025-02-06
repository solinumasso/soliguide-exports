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
import { getTodayName } from "./date.functions";

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2020-06-01T01:00:00.000Z"));
});

describe("Check Today's Name", () => {
  it("Check display date :", async () => {
    let fakeToday = new Date("2021-06-28T12:30:52.256Z"); // Monday June 28, 2021
    expect(getTodayName(fakeToday)).toBe("monday");
    fakeToday = new Date("2021-06-23T12:30:52.256Z"); // Wednesday June 23, 2021
    expect(getTodayName(fakeToday)).toBe("wednesday");

    const getFooTodayName = () => {
      getTodayName("foo");
    };
    expect(getFooTodayName).toThrow("The provided value isn't a date");
  });
});
