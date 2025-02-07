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
  import LocationOn from 'svelte-google-materialdesign-icons/Location_on.svelte';
  import { Text } from '@soliguide/design-system';
  import { getContext } from 'svelte';
  import { I18N_CTX_KEY } from '$lib/client/i18n';
  import type { I18nStore } from '$lib/client/types';

  const i18n: I18nStore = getContext(I18N_CTX_KEY);
</script>

<button on:click class="search-input-button">
  <span class="sib-content">
    <LocationOn size="16px" class="sib-icon" variation="filled" />
    <Text type="caption1">{$i18n.t('WHERE_YOU_NEED_TO_SEARCH')}</Text>
  </span>
</button>

<style lang="scss">
  .search-input-button {
    border-radius: var(--radiusFull);
    padding: var(--spacingLG) var(--spacing2XL);
    background-color: var(--color-interactionReversed);
    // ShadowXS is not visible enough
    box-shadow: 2px 2px 4px -4px rgba(23, 23, 23, 0.9);
    cursor: pointer;
    .sib-content {
      display: flex;
      gap: var(--spacingXS);
      :global(.sib-icon) {
        color: var(--color-surfacePrimary3);
      }
    }
  }
</style>
