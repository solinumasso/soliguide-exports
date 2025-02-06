<!--
Soliguide: Useful information for those who need it

SPDX-FileCopyrightText: © 2024 Solinum

SPDX-License-Identifier: AGPL-3.0-only

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import {
    categoryBrowserState,
    getCategorySelectorController
  } from './CategorySelectorController';
  import getCategoryService from '$lib/services/categoryService';
  import { THEME_CTX_KEY } from '$lib/theme';
  import CategoryButton from './CategoryButton.svelte';
  import CategoryBrowser from './CategoryBrowser.svelte';
  import { ROUTES_CTX_KEY } from '$lib/client/routing';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  /** @type {import('$lib/theme/types').ThemeDefinition} */
  const theme = getContext(THEME_CTX_KEY);
  /** @type {import('$lib/client/types').RoutingStore} */
  const routes = getContext(ROUTES_CTX_KEY);
  const componentStore = getCategorySelectorController(getCategoryService(theme.name));
  const dispatch = createEventDispatcher();

  /** @type {import('../../types').PageState} */
  const pageStore = getContext('PAGE_CONTROLLER_CTX_KEY');
  const { url } = $page;

  componentStore.init(url.searchParams.get('categorySelected'));

  /** @type {(category: import('@soliguide/common').Categories) => void} */
  const selectCategory = (category) => {
    componentStore.selectCategory(category);
    dispatch('selectCategory', category);
  };

  /** @type {(category: import('@soliguide/common').Categories) => void} */
  const addCategoryParam = (category) => {
    componentStore.navigateToDetail(category);
    const searchParams = new URLSearchParams({
      label: pageStore.locationLabel,
      geoValue: pageStore.selectedLocationSuggestion?.geoValue ?? '',
      categorySelected: category
    });
    goto(`${$routes.ROUTE_SEARCH}?${searchParams}`);
  };
</script>

<div class="category-selector">
  {#each $componentStore.categoryButtons as category}
    <CategoryButton {category} on:click={(event) => selectCategory(event.detail)} />
  {/each}
  <CategoryButton on:click={() => componentStore.openCategoryBrowser()} />
</div>

{#if $componentStore.browserState !== categoryBrowserState.CLOSED}
  <CategoryBrowser
    state={$componentStore.browserState}
    categories={$componentStore.categories}
    parentCategory={$componentStore.parentCategory}
    on:navigateChild={(event) => addCategoryParam(event.detail)}
    on:navigateParent={componentStore.navigateBack}
    on:selectCategory={(event) => selectCategory(event.detail)}
  />
{/if}

<style lang="scss">
  .category-selector {
    padding: var(--spacingXS) 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>
