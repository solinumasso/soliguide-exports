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
<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import PinDrop from 'svelte-google-materialdesign-icons/Pin_drop.svelte';
  import { Text, ListItem, AppIcon, PageLoader } from '@soliguide/design-system';
  import { I18N_CTX_KEY } from '$lib/client/i18n';
  import { capitalize } from '@soliguide/common';
  import type { LocationSuggestion } from '$lib/models/locationSuggestion';
  import type { I18nStore } from '$lib/client/types';

  export let items: LocationSuggestion[] = [];
  export let loading = false;

  const i18n: I18nStore = getContext(I18N_CTX_KEY);
  const dispatch = createEventDispatcher();
</script>

<PageLoader {loading}>
  <div class="results-list">
    {#if !!items.length}
      <span class="result-title">
        <Text type="text1Bold" as="h2">{$i18n.t('LOCATION_SUGGESTIONS')}</Text>
      </span>
    {/if}

    {#each items as item}
      <ListItem
        title={item.suggestionLine1}
        subTitle={capitalize($i18n.t(item.suggestionLine2))}
        shape="bordered"
        type="actionFull"
        size="small"
        on:click={() => dispatch('click', item)}
      >
        <AppIcon slot="icon" icon={PinDrop} type="secondary" />
      </ListItem>
    {/each}
  </div>
</PageLoader>

<style lang="scss">
  .results-list {
    padding-top: var(--spacingXL);
  }

  .result-title {
    display: inline-block;
    margin-bottom: var(--spacingXS);
  }
</style>
