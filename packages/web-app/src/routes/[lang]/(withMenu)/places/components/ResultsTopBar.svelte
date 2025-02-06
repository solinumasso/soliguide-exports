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
  import Search from 'svelte-google-materialdesign-icons/Search.svelte';
  import ChevronLeft from 'svelte-google-materialdesign-icons/Chevron_left.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  /**
   * @type string
   */
  export let title;
</script>

<button role="link" on:click={() => dispatch('goBack')}>
  <span>
    <ChevronLeft size="24" />
  </span>
  <div class="fake-input-container">
    <span class="fake-input-icon">
      <Search size="18" color="var(--color-interactionHighlightPrimary)" />
    </span>
    <p class="fake-input-text text-secondary-caption1-medium">
      {title}
    </p>
  </div>
</button>

<style>
  button {
    position: fixed;
    width: 100%;
    height: 54px;
    padding: 0 var(--spacingLG);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-gradientBackground);
    z-index: 1;
  }

  button > span {
    display: flex;
    padding: var(--spacingXS);
    justify-content: center;
    align-items: center;
  }

  .fake-input-container {
    width: 100%;
    height: 34px;
    padding: var(--spacingXS) var(--spacingLG);
    border: 1px solid var(--color-borderNeutral);
    border-radius: var(--radiusFull);
    background-color: var(--color-interactionReversed);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--spacingXS);
  }

  .fake-input-icon {
    display: flex;
  }

  .fake-input-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
