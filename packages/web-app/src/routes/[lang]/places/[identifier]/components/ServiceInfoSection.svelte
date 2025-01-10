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
  import { I18N_CTX_KEY } from '$lib/client/i18n';
  import { Text, TextClamper } from '@soliguide/design-system';
  import { getContext } from 'svelte';
  import DOMPurify from 'dompurify';
  import {
    type PlaceDetailsInfo,
    PlaceDetailsInfoType,
    type TranslatableElement
  } from '$lib/models/types';
  import type { I18nStore } from '$lib/client/types';
  import { getTitleAndIcon } from '../functions';

  export let info: PlaceDetailsInfo[] = [];

  const i18n: I18nStore = getContext(I18N_CTX_KEY);

  const getFormattedDescription = (description: TranslatableElement[]): string => {
    return description.map(({ key, params }) => $i18n.t(key, params)).join(', ');
  };
</script>

<div class="info-content">
  {#each info as { type, description }}
    {@const details = getTitleAndIcon($i18n, type)}
    <div class="detail">
      <div class="title">
        <div class="icon">
          <svelte:component this={details.icon} size="16" />
        </div>
        <Text type="caption1Medium" color="dark">{details.title}</Text>
      </div>
      <TextClamper
        linesNotClamped={3}
        showMoreLabel={$i18n.t('SEE_MORE')}
        showLessLabel={$i18n.t('SEE_LESS')}
      >
        <Text type="caption1" color="shy">
          <span class="description">
            {#if type === PlaceDetailsInfoType.WELCOME_UNCONDITIONAL_CUSTOM || type === PlaceDetailsInfoType.WELCOME_EXCLUSIVE}
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {getFormattedDescription(description).toLowerCase()}
            {:else}
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html DOMPurify.sanitize(getFormattedDescription(description))}
            {/if}
          </span>
        </Text>
      </TextClamper>
    </div>
  {/each}
</div>

<style lang="scss">
  .info-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacingLG);
  }

  .detail {
    display: flex;
    flex-direction: column;
  }

  .title {
    display: flex;
    gap: var(--spacingMD);
  }

  .icon {
    height: 16px;
    width: 16px;
    color: var(--color-textDark);
  }

  .description {
    // The HTML doesn't display correctly without this because of the base styles
    :global(li) {
      margin-left: var(--spacingMD);
    }

    :global(ul li) {
      list-style: initial;
    }

    :global(ol li) {
      list-style: decimal;
    }
  }
</style>
