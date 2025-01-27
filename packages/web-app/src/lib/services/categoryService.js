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
import { env } from '$env/dynamic/public';
import { CategoriesService, Categories } from '@soliguide/common';
import { fetch } from '$lib/client';
import { buildCategorySuggestion } from '$lib/models/categorySuggestion.js';

const apiUrl = env.PUBLIC_API_URL;

/**
 * @typedef {import('@soliguide/common').Categories} CategoriesType
 * @typedef {import('@soliguide/common').FlatCategoriesTreeNode} FlatCategoriesTreeNode
 * @typedef {import('@soliguide/common').Themes} Themes
 */

/**
 * Associates each category id with its children ids
 * in an object for easy access
 * @param {FlatCategoriesTreeNode[]} categories
 * @returns {Record<CategoriesType, CategoriesType[]>}
 */
const buildParentToChildrenStructure = (categories) => {
  return categories.reduce((acc, category) => {
    // Keep only the ids
    return { ...acc, [category.id]: category.children.map((child) => child.id) };
  }, /** @type {Record<CategoriesType, CategoriesType[]>} */ ({}));
};

/**
 * Remove specialists and  HEALTH_SPECIALISTS's children in global structure
 * @param {FlatCategoriesTreeNode[]} categories
 * @returns {FlatCategoriesTreeNode[]}
 */
const removeSpecialistsFromCategories = (categories) => {
  const specialistsParentNode = categories.find(
    (category) => category.id === Categories.HEALTH_SPECIALISTS
  );

  if (specialistsParentNode) {
    const specialists = specialistsParentNode.children.map((child) => child.id);
    return categories
      .map((category) => ({
        ...category,
        children: category.id === Categories.HEALTH_SPECIALISTS ? [] : category.children
      }))
      .filter((category) => !specialists.includes(category.id));
  }
  return [...categories];
};

/**
 * This service proxies the @soliguide/common category.service
 * and provides ad hoc functions and data
 *
 * Gets the category service
 * @param  {Themes} currentThemeName
 * @param  {import('$lib/client/transport.js').Fetcher} fetcher
 * @returns {import('./types').CategoryService}
 */
export default (currentThemeName, fetcher = fetch) => {
  const svc = new CategoriesService(currentThemeName);

  const allCategories = svc.getCategories();
  const categoriesWithoutSpecialists = removeSpecialistsFromCategories(allCategories);
  const parentToChildren = buildParentToChildrenStructure(categoriesWithoutSpecialists);

  /**
   * @returns {FlatCategoriesTreeNode[]}
   */
  const getAllCategories = () => {
    return allCategories;
  };

  /**
   * Checks if a category is a specialty
   * @param {Categories} categoryId
   * @returns {boolean}
   */
  const isSpecialist = (categoryId) => {
    return !categoriesWithoutSpecialists.find(({ id }) => id === categoryId);
  };

  /** @returns {Categories[]} */
  const getRootCategories = () => {
    return svc.getOrderRootCategoriesIds();
  };

  /**
   * Finds direct child category ids given a parent
   * @param {CategoriesType} categoryId
   * @returns {CategoriesType[]}
   */
  const getChildrenCategories = (categoryId) => {
    return parentToChildren[categoryId];
  };

  /**
   * @param categoryId {Categories}
   * @returns {boolean}
   */
  const isCategoryRoot = (categoryId) => {
    return svc.getOrderRootCategoriesIds().includes(categoryId);
  };

  /**
   * Auto-complete feature for categories. All apseiclists are filtered from the results
   * @param {string} searchTerm
   * @returns {Promise<import('$lib/models/types').CategorySuggestion[]>}
   */
  const getCategorySuggestions = async (searchTerm) => {
    if (searchTerm.length === 0) {
      return [];
    }

    const url = `${apiUrl}new-search/auto-complete/${encodeURI(searchTerm.trim())}`;

    /** @type {import('@soliguide/common').SearchAutoComplete} */
    const result = await fetcher(url);
    return buildCategorySuggestion(result, isSpecialist);
  };

  return {
    getAllCategories,
    getRootCategories,
    getChildrenCategories,
    isCategoryRoot,
    getCategorySuggestions
  };
};
