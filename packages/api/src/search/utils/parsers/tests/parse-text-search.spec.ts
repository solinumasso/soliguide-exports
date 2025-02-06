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
import { FilterQuery } from "mongoose";
import { createSafeRegex, parseTextSearch } from "../parse-text-search";

describe("CreateSafeRegex", () => {
  it("Should escape special characters", () => {
    const regex = createSafeRegex(".*?+[]{}()");
    expect(regex.source).toBe(".*\\.\\*\\?\\+\\[\\]\\{\\}\\(\\).*");
  });

  it("Should create a case-insensitive regex", () => {
    const regex = createSafeRegex("Test");
    expect(regex.source).toBe(".*Test.*");
  });
});

describe("ParseTextSearch", () => {
  let query: FilterQuery<any>;
  let searchData: { [key: string]: any };

  beforeEach(() => {
    query = {};
    searchData = {
      name: "Alice",
      email: null,
    };
  });

  it("Should add a regex query if field is not empty", () => {
    parseTextSearch(query, searchData, "name");
    expect(query).toEqual({
      name: {
        $options: "i",
        $regex: /.*Alice.*/,
      },
    });
  });

  it("should not add a regex query if field is empty", () => {
    parseTextSearch(query, searchData, "email");
    expect(query).toEqual({});
  });
});
