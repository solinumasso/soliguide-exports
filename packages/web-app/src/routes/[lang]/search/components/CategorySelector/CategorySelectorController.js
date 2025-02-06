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
/**
 * Shorthands
 * @typedef {import('./types').PageState} PageState
 * @typedef {import('./types').CategorySelectorController} CategorySelectorController
 * @typedef {import('./types').BrowserState} BrowserState
 * @typedef {import('$lib/services/types').PosthogProperties} PosthogProperties
 */

import { writable, get } from 'svelte/store';
import { Categories } from '@soliguide/common';
import { getSearchPageController } from '../../pageController';
import { locationService } from '$lib/services';
import { categoryService } from '$lib/services/categoryService';

/** @type {Record<string, symbol>} */
export const categoryBrowserState = {
  CLOSED: Symbol('closed'),
  OPEN_ROOT_CATEGORIES: Symbol('open with root categories'),
  OPEN_CATEGORY_DETAIL: Symbol('open with a category detail')
};

/**
 * Returns an instance of the service
 * @param {import('$lib/services/types').CategoryService} localCategoryService
 * @returns {CategorySelectorController}
 */
export const getCategorySelectorController = (localCategoryService) => {
  /** @type {PageState} */
  const initialState = {
    categoryButtons: [Categories.FOOD, Categories.COUNSELING, Categories.WELCOME],
    parentCategory: null,
    categories: [],
    browserState: categoryBrowserState.CLOSED,
    selectedCategory: null
  };

  /** @type { import('svelte/store').Writable<PageState>} */
  const pageStore = writable(initialState);

  const searchController = getSearchPageController(locationService, categoryService);

  const openCategoryBrowser = () => {
    searchController.captureEvent('all-category');

    pageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          browserState: categoryBrowserState.OPEN_ROOT_CATEGORIES,
          parentCategory: null,
          selectedCategory: null,
          categories: localCategoryService.getRootCategories()
        })
    );
  };

  /**
   * Get the children of the category to display them.
   * @param categoryId {Categories}
   */
  const navigateToDetail = (categoryId) => {
    pageStore.update((oldValue) => {
      // We cannot navigate from other than a root category
      const isRoot = categoryService.isCategoryRoot(categoryId);
      if (!isRoot || oldValue.browserState !== categoryBrowserState.OPEN_ROOT_CATEGORIES) {
        return oldValue;
      }
      return /** @type {PageState} */ ({
        ...oldValue,
        browserState: categoryBrowserState.OPEN_CATEGORY_DETAIL,
        CategoryListHeaderKey: categoryId,
        parentCategory: categoryId,
        categories: categoryService.getChildrenCategories(categoryId)
      });
    });
  };

  /**
   * Go to root categories page or close the browser, depending on the browserState
   */
  const navigateBack = () => {
    pageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          browserState:
            oldValue.browserState === categoryBrowserState.OPEN_CATEGORY_DETAIL
              ? categoryBrowserState.OPEN_ROOT_CATEGORIES
              : categoryBrowserState.CLOSED,
          parentCategory: null,
          categories:
            oldValue.browserState === categoryBrowserState.OPEN_CATEGORY_DETAIL
              ? categoryService.getRootCategories()
              : []
        })
    );
  };

  /** @param categoryId {Categories} */
  const selectCategory = (categoryId) => {
    const isFromBrowser = get(pageStore).browserState !== categoryBrowserState.CLOSED;

    pageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          browserState: categoryBrowserState.CLOSED,
          parentCategory: null,
          categories: [],
          selectedCategory: categoryId
        })
    );

    searchController.captureEvent(isFromBrowser ? 'select-category' : 'select-showcased-category', {
      categorySelected: categoryId
    });
  };

  /** @type {() => void} */
  const init = () => pageStore.set(initialState);

  return {
    subscribe: pageStore.subscribe,
    openCategoryBrowser,
    navigateToDetail,
    navigateBack,
    selectCategory,
    init
  };
};
