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
  import { createEventDispatcher } from 'svelte';
  import { ToggleButton } from '@soliguide/design-system';
  import type { LanguageOption } from './types';

  export let options: LanguageOption[] = [];
  export let selectedOption: string | null = null;

  const dispatch = createEventDispatcher();
</script>

<section>
  {#each options as option, i}
    <button
      class:odd-last={i === options.length - 1 && options.length % 2 === 1}
      role="radio"
      tabindex={i}
      aria-checked={selectedOption === option.code}
      type="button"
    >
      <ToggleButton
        checked={selectedOption === option.code}
        value={option.code}
        block
        icon={option.flag}
        on:change={() => dispatch('change', option.code)}
      >
        {option.nativeName}
      </ToggleButton>
    </button>
  {/each}
</section>

<style lang="scss">
  $column-gap: var(--spacingXL);
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: var(--spacingLG);
    column-gap: $column-gap;
    justify-items: stretch;

    // When total of options is odd, center the last element
    .odd-last {
      transform: translateX(calc(50% + ($column-gap / 2)));
    }
  }
</style>
