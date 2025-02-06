/*
 * Soliguide: Useful information for those who need it
 *
 * SPDX-FileCopyrightText: © 2025 Solinum
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
import { CountryCodes } from "../../../location";
import { CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING } from "../../constants";
import { Categories } from "../../enums";
import { getCategoriesSpecificFields } from "../getCategoriesSpecificFields";

describe("getCategoriesSpecificFields", () => {
  it("should return original mapping when country is FR", () => {
    const result = getCategoriesSpecificFields(CountryCodes.FR);
    expect(result).toEqual(CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING);
  });

  it("should remove specified fields for non-FR countries", () => {
    const result = getCategoriesSpecificFields(CountryCodes.ES);

    // Test a few specific categories that should have fields removed
    expect(result[Categories.FOOD_PACKAGES]).not.toContain(
      "nationalOriginProductType"
    );
    expect(result[Categories.FOOD_PACKAGES]).not.toContain(
      "organicOriginProductType"
    );
    expect(result[Categories.COOKING_WORKSHOP]).not.toContain(
      "nationalOriginProductType"
    );
    expect(result[Categories.COOKING_WORKSHOP]).not.toContain(
      "organicOriginProductType"
    );
  });

  it("should preserve other fields for non-FR countries", () => {
    const result = getCategoriesSpecificFields(CountryCodes.ES);

    // Check that other fields are preserved
    expect(result[Categories.FOOD_PACKAGES]).toContain("foodProductType");
    expect(result[Categories.FOOD_PACKAGES]).toContain("dietaryRegimesType");
    expect(result[Categories.COOKING_WORKSHOP]).toContain("dietaryRegimesType");
    expect(result[Categories.COOKING_WORKSHOP]).toContain(
      "dietaryAdaptationsType"
    );
  });

  it("should maintain categories without restricted fields unchanged", () => {
    const result = getCategoriesSpecificFields(CountryCodes.AD);

    expect(result[Categories.FRENCH_COURSE]).toEqual(
      CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING[Categories.FRENCH_COURSE]
    );
    expect(result[Categories.WELLNESS]).toEqual(
      CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING[Categories.WELLNESS]
    );
  });

  it("should handle empty or undefined fields correctly", () => {
    const mockMapping = {
      ...CATEGORIES_SPECIFIC_FIELDS_CATEGORY_MAPPING,
      [Categories.FOOD_PACKAGES]: undefined,
    };

    jest
      .spyOn(Object, "entries")
      .mockReturnValue(
        Object.entries(mockMapping) as Array<[Categories, string[]]>
      );

    const result = getCategoriesSpecificFields(CountryCodes.AD);
    expect(result[Categories.FOOD_PACKAGES]).toBeUndefined();
  });
});
