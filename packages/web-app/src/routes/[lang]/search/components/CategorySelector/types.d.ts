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
import { Categories } from '@soliguide/common';
import { Writable } from 'svelte/store';
import { categoryBrowserState } from './CategorySelectorController';
import type { PosthogProperties } from '$lib/services/types';

export type BrowserState = (typeof categoryBrowserState)[keyof typeof categoryBrowserState];

export type PageState = {
  categoryButtons: Categories[];
  parentCategory: Categories | null;
  categories: Categories[];
  browserState: BrowserState;
  selectedCategory: Categories | null;
};

export type CategorySelectorController = {
  subscribe: Writable<PageState>['subscribe'];
  openCategoryBrowser(): void;
  navigateToDetail(categoryId: Categories): void;
  navigateBack(): void;
  selectCategory(categoryId: Categories): void;
  init(categorySelected: string | null): void;
};

export type CategoryBrowserController = {
  captureEvent(eventName: string, properties?: PosthogProperties): void;
};
