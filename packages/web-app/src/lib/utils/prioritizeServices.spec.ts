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
import { describe, expect, it } from 'vitest';
import { Categories, CommonNewPlaceService, Themes } from '@soliguide/common';
import { sortServicesByRelevance } from './prioritizeServices';

import { getCategoryService } from '$lib/services/categoryService.js';

const categoriesThemeFr = getCategoryService(Themes.SOLIGUIDE_FR).getAllCategories();
const categoriesThemeEs = getCategoryService(Themes.SOLIGUIA_ES).getAllCategories();
const categoriesThemeAd = getCategoryService(Themes.SOLIGUIA_AD).getAllCategories();

describe('applyWeightRules', () => {
  it('Category searched by user should be first in the list', () => {
    const categorySearchedByUser = Categories.FOOD_PACKAGES;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.SHOWER },
      { category: Categories.DAY_HOSTING },
      { category: Categories.FOOD_PACKAGES }
    ];

    const expected = [
      { category: Categories.FOOD_PACKAGES },
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.SHOWER },
      { category: Categories.DAY_HOSTING }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeFr
    );

    expect(result).toEqual(expected);
  });

  it('Category with same parents should be first in the list', () => {
    const categorySearchedByUser = Categories.FOOD_PACKAGES;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.SHOWER },
      { category: Categories.FOOD_PACKAGES },
      { category: Categories.DAY_HOSTING }
    ];

    const expected = [
      { category: Categories.FOOD_PACKAGES },
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.SHOWER },
      { category: Categories.DAY_HOSTING }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeFr
    );

    expect(result).toEqual(expected);
  });

  it('Categories with the same parents than the category search by user must be listing in first by order existing in order', () => {
    const categorySearchedByUser = Categories.COOKING_WORKSHOP;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.SHOWER },
      { category: Categories.FOOD_PACKAGES },
      { category: Categories.DAY_HOSTING }
    ];

    const expected = [
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.FOOD_PACKAGES },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.SHOWER },
      { category: Categories.DAY_HOSTING }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeFr
    );

    expect(result).toEqual(expected);
  });

  it('Searching a Root Category should prioritize its direct children.', () => {
    const categorySearchedByUser = Categories.FOOD;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.SHOWER },
      { category: Categories.FOOD_PACKAGES },
      { category: Categories.DAY_HOSTING }
    ];

    const expected = [
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.FOOD_PACKAGES },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.SHOWER },
      { category: Categories.DAY_HOSTING }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeFr
    );

    expect(result).toEqual(expected);
  });

  it('A search for a Specialist category should navigate through the full category hierarchy', () => {
    const categorySearchedByUser = Categories.GYNECOLOGY;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.ADDICTION },
      { category: Categories.DAY_HOSTING },
      { category: Categories.GYNECOLOGY },
      { category: Categories.ECHOGRAPHY }
    ];

    const expected = [
      { category: Categories.GYNECOLOGY },
      { category: Categories.ECHOGRAPHY },
      { category: Categories.ADDICTION },
      { category: Categories.FOOD_DISTRIBUTION },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.DAY_HOSTING }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeFr
    );

    expect(result).toEqual(expected);
  });

  it('Should be able to sort with French Course category if theme is soliguide_fr ', () => {
    const categorySearchedByUser = Categories.FRENCH_COURSE;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.ADDICTION },
      { category: Categories.DAY_HOSTING },
      { category: Categories.FRENCH_COURSE },
      { category: Categories.JOB_COACHING },
      { category: Categories.ECHOGRAPHY }
    ];

    const expected = [
      { category: Categories.FRENCH_COURSE },
      { category: Categories.JOB_COACHING },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.ADDICTION },
      { category: Categories.DAY_HOSTING },
      { category: Categories.ECHOGRAPHY }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeFr
    );

    expect(result).toEqual(expected);
  });

  it('Should be able to sort with Spanish and Catalan Courses categories if theme is soliguide_es', () => {
    const categorySearchedByUser = Categories.SPANISH_COURSE;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.ADDICTION },
      { category: Categories.DAY_HOSTING },
      { category: Categories.SPANISH_COURSE },
      { category: Categories.CATALAN_COURSE },
      { category: Categories.JOB_COACHING },
      { category: Categories.ECHOGRAPHY }
    ];

    const expected = [
      { category: Categories.SPANISH_COURSE },
      { category: Categories.CATALAN_COURSE },
      { category: Categories.JOB_COACHING },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.ADDICTION },
      { category: Categories.DAY_HOSTING },
      { category: Categories.ECHOGRAPHY }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeEs
    );

    expect(result).toEqual(expected);
  });

  it('Should be able to sort with Spanish and Catalan Courses categories if theme is soliguide_ad', () => {
    const categorySearchedByUser = Categories.CATALAN_COURSE;

    const services: Partial<CommonNewPlaceService>[] = [
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.ADDICTION },
      { category: Categories.DAY_HOSTING },
      { category: Categories.SPANISH_COURSE },
      { category: Categories.CATALAN_COURSE },
      { category: Categories.JOB_COACHING },
      { category: Categories.ECHOGRAPHY }
    ];

    const expected = [
      { category: Categories.CATALAN_COURSE },
      { category: Categories.SPANISH_COURSE },
      { category: Categories.JOB_COACHING },
      { category: Categories.BUDGET_ADVICE },
      { category: Categories.ADDICTION },
      { category: Categories.DAY_HOSTING },
      { category: Categories.ECHOGRAPHY }
    ];

    const result = sortServicesByRelevance(
      services as CommonNewPlaceService[],
      categorySearchedByUser,
      categoriesThemeAd
    );

    expect(result).toEqual(expected);
  });
});
