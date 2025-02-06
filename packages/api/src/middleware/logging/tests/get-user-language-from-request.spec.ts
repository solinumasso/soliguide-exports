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
import { SupportedLanguagesCode } from "@soliguide/common";
import { getUserLanguageFromRequest } from "../services";

describe("getUserLanguageFromRequest", () => {
  let mockRequest: any;

  beforeEach(() => {
    mockRequest = {
      params: {},
    };
  });

  it("should return FR as default when no language parameter is provided", () => {
    const result = getUserLanguageFromRequest(mockRequest);
    expect(result).toBe(SupportedLanguagesCode.FR);
  });

  it("should return the provided language when it is supported", () => {
    mockRequest.params.lang = SupportedLanguagesCode.EN;
    const result = getUserLanguageFromRequest(mockRequest);
    expect(result).toBe(SupportedLanguagesCode.EN);
  });

  it("should throw an error when provided language is not supported", () => {
    mockRequest.params.lang = "DE" as SupportedLanguagesCode;
    expect(() => getUserLanguageFromRequest(mockRequest)).toThrow(
      "Language not supported"
    );
  });

  it("should handle undefined lang parameter", () => {
    mockRequest.params.lang = undefined;
    const result = getUserLanguageFromRequest(mockRequest);
    expect(result).toBe(SupportedLanguagesCode.FR);
  });

  it("should handle empty string as lang parameter", () => {
    mockRequest.params.lang = "";
    const result = getUserLanguageFromRequest(mockRequest);
    expect(result).toBe(SupportedLanguagesCode.FR);
  });
});
