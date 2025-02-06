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
  } from './CategorySelectorController.js';
  import getCategoryService from '$lib/services/categoryService.js';
  import { THEME_CTX_KEY } from '$lib/theme';
  import CategoryButton from './CategoryButton.svelte';
  import CategoryBrowser from './CategoryBrowser.svelte';

  /** @type {import('$lib/theme/types').ThemeDefinition} */
  const theme = getContext(THEME_CTX_KEY);
  const pageStore = getCategorySelectorController(getCategoryService(theme.name));
  const dispatch = createEventDispatcher();

  pageStore.init();

  /** @type {(category: import('@soliguide/common').Categories) => void} */
  const selectCategory = (category) => {
    pageStore.selectCategory(category);
    dispatch('selectCategory', category);
  };
</script>

<div class="category-selector">
  {#each $pageStore.categoryButtons as category}
    <CategoryButton {category} on:click={(event) => selectCategory(event.detail)} />
  {/each}
  <CategoryButton on:click={() => pageStore.openCategoryBrowser()} />
</div>

{#if $pageStore.browserState !== categoryBrowserState.CLOSED}
  <CategoryBrowser
    state={$pageStore.browserState}
    categories={$pageStore.categories}
    parentCategory={$pageStore.parentCategory}
    on:navigateChild={(event) => pageStore.navigateToDetail(event.detail)}
    on:navigateParent={pageStore.navigateBack}
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
