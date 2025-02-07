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

import { writable } from 'svelte/store';
import { Categories } from '@soliguide/common';
import type { CategoryService, PosthogCaptureFunction } from '$lib/services/types';
import { posthogService } from '$lib/services/posthogService';
import { CategoryBrowserState, type CategorySelectorController, type PageState } from './types';
import { locationService } from '$lib/services';
import { getSearchPageController } from '../../pageController';

/**
 * Returns an instance of the service
 */
export const getCategorySelectorController = (
  categoryService: CategoryService
): CategorySelectorController => {
  const initialState: PageState = {
    categoryButtons: [Categories.FOOD, Categories.COUNSELING, Categories.WELCOME],
    parentCategory: null,
    categories: [],
    browserState: CategoryBrowserState.CLOSED,
    selectedCategory: null
  };

  const pageStore = writable(initialState);

  /**
   * Capture an event with a prefix for route context
   */
  const captureEvent: PosthogCaptureFunction = (eventName, properties) => {
    posthogService.capture(`search-page-${eventName}`, properties);
  };

  const openCategoryBrowser = () => {
    captureEvent('all-category');

    pageStore.update(
      (oldValue): PageState => ({
        ...oldValue,
        browserState: CategoryBrowserState.OPEN_ROOT_CATEGORIES,
        parentCategory: null,
        selectedCategory: null,
        categories: categoryService.getRootCategories()
      })
    );
  };

  /**
   * Get the children of the category to display them.
   */
  const navigateToDetail = (categoryId: Categories) => {
    pageStore.update((oldValue): PageState => {
      // We cannot navigate from other than a root category
      const isRoot = categoryService.isCategoryRoot(categoryId);
      if (!isRoot || oldValue.browserState !== CategoryBrowserState.OPEN_ROOT_CATEGORIES) {
        return oldValue;
      }
      return {
        ...oldValue,
        browserState: CategoryBrowserState.OPEN_CATEGORY_DETAIL,
        parentCategory: categoryId,
        categories: categoryService.getChildrenCategories(categoryId)
      };
    });
  };

  /**
   * Go to root categories page or close the browser, depending on the browserState
   */
  const navigateBack = () => {
    pageStore.update(
      (oldValue): PageState => ({
        ...oldValue,
        browserState:
          oldValue.browserState === CategoryBrowserState.OPEN_CATEGORY_DETAIL
            ? CategoryBrowserState.OPEN_ROOT_CATEGORIES
            : CategoryBrowserState.CLOSED,
        parentCategory: null,
        categories:
          oldValue.browserState === CategoryBrowserState.OPEN_CATEGORY_DETAIL
            ? categoryService.getRootCategories()
            : []
      })
    );
  };

  const selectCategory = (categoryId: Categories) => {
    const searchController = getSearchPageController(locationService, categoryService);
    searchController.captureEvent('select-category', { categorySelected: categoryId });

    pageStore.update(
      (oldValue): PageState => ({
        ...oldValue,
        browserState: CategoryBrowserState.CLOSED,
        parentCategory: null,
        categories: [],
        selectedCategory: categoryId
      })
    );
  };

  const init = (): void => pageStore.set(initialState);

  return {
    subscribe: pageStore.subscribe,
    openCategoryBrowser,
    navigateToDetail,
    captureEvent,
    navigateBack,
    selectCategory,
    init
  };
};
