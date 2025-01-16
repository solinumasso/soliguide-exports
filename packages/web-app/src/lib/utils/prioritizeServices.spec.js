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
import { Categories } from '@soliguide/common';
import { sortServicesByRelevance } from './prioritizeServices';

describe('applyWeightRules', () => {
  it('Category searched by user should be first in the list', () => {
    const categorySearchedByUser = Categories.FOOD_PACKAGES;

    /** @type {Partial<import('@soliguide/common').CommonNewPlaceService>[]} */
    const services = [
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

    const result = sortServicesByRelevance(services, categorySearchedByUser);

    expect(result).toEqual(expected);
  });

  it('Category with same parents should be first in the list', () => {
    const categorySearchedByUser = Categories.FOOD_PACKAGES;

    /** @type {Partial<import('@soliguide/common').CommonNewPlaceService>[]} */
    const services = [
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

    const result = sortServicesByRelevance(services, categorySearchedByUser);

    expect(result).toEqual(expected);
  });

  it('Categories with the same parents than the category search by user must be listing in first by order existing in order', () => {
    const categorySearchedByUser = Categories.COOKING_WORKSHOP;

    /** @type {Partial<import('@soliguide/common').CommonNewPlaceService>[]} */
    const services = [
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

    const result = sortServicesByRelevance(services, categorySearchedByUser);

    expect(result).toEqual(expected);
  });

  it('Searching a Root Category should prioritize its direct children.', () => {
    const categorySearchedByUser = Categories.FOOD;

    /** @type {Partial<import('@soliguide/common').CommonNewPlaceService>[]} */
    const services = [
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

    const result = sortServicesByRelevance(services, categorySearchedByUser);

    expect(result).toEqual(expected);
  });

  it('A search for a Specialist category should navigate through the full category hierarchy', () => {
    const categorySearchedByUser = Categories.GYNECOLOGY;

    /** @type {Partial<import('@soliguide/common').CommonNewPlaceService>[]} */
    const services = [
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

    const result = sortServicesByRelevance(services, categorySearchedByUser);

    expect(result).toEqual(expected);
  });
});
