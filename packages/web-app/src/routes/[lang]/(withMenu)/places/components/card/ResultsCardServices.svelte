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
  import { Text, Badge } from '@soliguide/design-system';
  import { getContext } from 'svelte';
  import { I18N_CTX_KEY } from '$lib/client/i18n.js';
  import { CategoryIcon } from '$lib/components';

  /** @type {import('$lib/client/types').I18nStore} */
  const i18n = getContext(I18N_CTX_KEY);

  /** @typedef {import('@soliguide/common').Categories[]} CategoriesArray */

  /** @type {CategoriesArray} */
  export let services;
  /** @type {CategoriesArray} */
  let servicesToDisplay;
  /** @type {CategoriesArray} */
  let servicesHidden;

  $: {
    servicesToDisplay = services.slice(0, 3);
    servicesHidden = services.slice(3);
  }
</script>

<div class="services-container">
  <Text as="h3" type="text2Medium">{$i18n.t('SERVICES')}</Text>
  <ul class="services">
    {#each servicesToDisplay as service}
      <li class="services-item">
        <CategoryIcon categoryId={service} />
        <Text as="span" color="shy" type="text2">{$i18n.t(service.toUpperCase())}</Text>
      </li>
    {/each}
    {#if servicesHidden.length > 0}
      <li class="services-item">
        <Text as="span" color="shy" type="text2">+</Text>
        <Badge text={String(servicesHidden.length)} />
      </li>
    {/if}
  </ul>
</div>

<style lang="scss">
  .services-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing3XS);
  }

  .services {
    margin-top: var(--spacing3XS);
    list-style-type: none;
    min-height: 50px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacingSM) var(--spacingLG);
  }

  .services-item {
    display: flex;
    align-items: center;
    gap: var(--spacing3XS);
  }
</style>
