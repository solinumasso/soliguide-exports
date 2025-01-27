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
import { Categories, ROOT_CATEGORIES } from '@soliguide/common';

/**
 * @typedef {import('@soliguide/common').Categories} CategoriesType
 * @typedef {import('@soliguide/common').CommonNewPlaceService} CommonNewPlaceService
 * @typedef {import('@soliguide/common').FlatCategoriesTreeNode} FlatCategoriesTreeNode
 */

const CategoryWeights = {
  SAME_CATEGORY: 0,
  SAME_PARENT: 100,
  SAME_GRANDPARENT: 1000,
  DIFFERENT_FAMILY: 10000
};

/**
 * Find parent category of a given category
 * @param {CategoriesType | null} category
 * @param {FlatCategoriesTreeNode[]} categoriesFromTheme
 * @returns {CategoriesType | null}
 */
const findImmediateParent = (category, categoriesFromTheme) => {
  const isRootCategories = ROOT_CATEGORIES.some((root) => root.id === category);

  if (isRootCategories) return category;

  const parent = categoriesFromTheme.find((cat) =>
    cat.children.some((child) => child.id === category)
  );
  if (!parent) {
    throw new Error(`Category ${category} doesn't exist`);
  }

  return parent.id;
};

/**
 * Calculates the additional weight based on the relationship between categories
 * @param {CategoriesType} serviceCategory
 * @param {CategoriesType} targetCategory
 * @param {FlatCategoriesTreeNode[]} allCategoriesByTheme
 */
const calculateAdditionalWeight = (serviceCategory, targetCategory, allCategoriesByTheme) => {
  if (serviceCategory === targetCategory) return CategoryWeights.SAME_CATEGORY;

  const serviceParent = findImmediateParent(serviceCategory, allCategoriesByTheme);
  const targetParent = findImmediateParent(targetCategory, allCategoriesByTheme);

  // Same parent, notice that it works only if a place have maximum 99 services, should be increased if needed
  if (serviceParent === targetParent) return CategoryWeights.SAME_PARENT;

  // Look for grand parents
  const serviceGrandParent = findImmediateParent(serviceParent, allCategoriesByTheme);
  const targetGrandParent = findImmediateParent(targetParent, allCategoriesByTheme);

  // Same grand parents (only in Health case)
  if (serviceCategory && serviceGrandParent === targetGrandParent)
    return CategoryWeights.SAME_GRANDPARENT;

  return CategoryWeights.DIFFERENT_FAMILY;
};

/**
 * @typedef {Pick<import('@soliguide/common').CommonNewPlaceService, 'category'>} ServiceWithCategory
 */

/**
 * Sort services by relevance based on the category searched by the user
 * @param {ServiceWithCategory[]} services
 * @param {CategoriesType} category
 * @param {FlatCategoriesTreeNode[]} allCategoriesByTheme
 * @returns {ServiceWithCategory[]}
 */
const sortServicesByRelevance = (services, category, allCategoriesByTheme) => {
  return (
    // eslint-disable-next-line fp/no-mutating-methods
    services
      .map((service, index) => ({
        ...service,
        weight:
          index +
          calculateAdditionalWeight(
            /** @type {CategoriesType} */ (service.category),
            category,
            allCategoriesByTheme
          )
      }))
      .sort((service1, service2) => service1.weight - service2.weight)
      .map((service) =>
        Object.fromEntries(Object.entries(service).filter(([key]) => key !== 'weight'))
      )
  );
};
export { sortServicesByRelevance };
