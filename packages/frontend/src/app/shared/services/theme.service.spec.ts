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
describe("ThemeService", () => {
  let windowSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it("CURRENT_DATA not defined in html (in window)", () => {
    windowSpy.mockImplementation(() => ({}));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(() => require("./theme.service").themeService.getTheme()).toThrow(
      new Error("Theme not defined")
    );
  });

  it("Theme not defined in html (in window)", () => {
    windowSpy.mockImplementation(() => ({
      CURRENT_DATA: {},
    }));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(() => require("./theme.service").themeService.getTheme()).toThrow(
      new Error("Theme not defined")
    );
  });

  it("Theme defined wrongly in html (in window)", () => {
    windowSpy.mockImplementation(() => ({
      CURRENT_DATAS: {
        THEME: "foo bar",
      },
    }));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(() => require("./theme.service").themeService.getTheme()).toThrow(
      new Error("Theme not defined")
    );
  });

  it("Theme should be text from html (in window)", () => {
    windowSpy.mockImplementation(() => ({
      CURRENT_DATA: {
        THEME: "foo bar",
      },
    }));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require("./theme.service").themeService.getTheme()).toBe("foo bar");
  });
});
