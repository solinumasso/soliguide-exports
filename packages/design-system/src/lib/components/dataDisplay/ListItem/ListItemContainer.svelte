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
  import type { ListItemType } from '$lib/types/ListItem';
  import { createEventDispatcher } from 'svelte';

  export let type: ListItemType;
  export let href: string | null = null;
  export let disabled = false;

  const dispatch = createEventDispatcher();
</script>

{#if href && (type === 'link' || type === 'externalLink')}
  <a
    {href}
    target={type === 'externalLink' ? '_blank' : '_self'}
    class="item-container"
    class:disabled
    on:click={() => dispatch('click')}
  >
    <slot />
  </a>
{:else if type === 'actionFull'}
  <button on:click={() => dispatch('click')} class="item-container" {disabled}>
    <slot />
  </button>
{:else}
  <div class="item-container">
    <slot />
  </div>
{/if}

<style>
  .item-container {
    display: flex;
    align-items: center;
    gap: var(--spacingXS);
    padding: var(--spacingLG) var(--spacingXS);
    min-height: 64px;
  }

  button {
    text-align: left;
    cursor: pointer;
    width: 100%;
    &:disabled {
      cursor: not-allowed;
    }
  }

  a {
    text-decoration: none;
    &.disabled {
      cursor: not-allowed;
    }
  }
</style>
