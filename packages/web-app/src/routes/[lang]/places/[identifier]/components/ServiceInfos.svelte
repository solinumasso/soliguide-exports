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
  import { I18N_CTX_KEY } from '$lib/client/i18n';
  import { Text, TextClamper } from '@soliguide/design-system';
  import { getContext } from 'svelte';
  import Accessible from 'svelte-google-materialdesign-icons/Accessible.svelte';
  import Euro from 'svelte-google-materialdesign-icons/Euro.svelte';
  import Group from 'svelte-google-materialdesign-icons/Group.svelte';
  import Pets from 'svelte-google-materialdesign-icons/Pets.svelte';
  import Star from 'svelte-google-materialdesign-icons/Star.svelte';
  import Event from 'svelte-google-materialdesign-icons/Event.svelte';
  import DOMPurify from 'dompurify';
  import { placeDetailsInfoType } from '$lib/models/placeDetails';

  /**
   * @typedef {import('$lib/models/types').PlaceDetailsInfo} PlaceDetailInfo
   */

  /**
   * @type {PlaceDetailInfo[]}
   */
  export let info = [];

  /** @type {import('$lib/client/types').I18nStore} */
  const i18n = getContext(I18N_CTX_KEY);

  /**
   * @param {import('$lib/models/types').PlaceDetailsInfoType} type
   * @returns {import('../types').TitleAndIcon}
   */
  const getTitleAndIcon = (type) => {
    switch (type) {
      case placeDetailsInfoType.WELCOME_UNCONDITIONAL_CUSTOM:
        return { icon: Group, title: $i18n.t('UNCONDITIONAL_ADAPTED_ACCESS') };
      case placeDetailsInfoType.WELCOME_EXCLUSIVE:
        return { icon: Group, title: $i18n.t('EXCLUSIVE_ACCESS') };
      case placeDetailsInfoType.WELCOME_UNCONDITIONAL:
        return { icon: Group, title: $i18n.t('PUBLICS_WELCOME_UNCONDITIONAL') };
      case placeDetailsInfoType.PUBLICS_MORE_INFO:
        return { icon: Group, title: $i18n.t('ADDITIONAL_INFORMATION') };
      case placeDetailsInfoType.ACCESS_ORIENTATION:
        return { icon: Event, title: $i18n.t('ACCESS_ON_ORIENTATION_DISPLAY') };
      case placeDetailsInfoType.ACCESS_FREE:
        return { icon: Event, title: $i18n.t('FREE_ACCESS') };
      case placeDetailsInfoType.APPOINTMENT:
        return { icon: Event, title: $i18n.t('ACCESS_CONDITION_ON_APPOINTMENT') };
      case placeDetailsInfoType.REGISTRATION:
        return { icon: Event, title: $i18n.t('ACCESS_CONDITION_ON_REGISTRATION') };
      case placeDetailsInfoType.MODALITIES_MORE_INFO:
        return { icon: Event, title: $i18n.t('ACCESS_CONDITION_OTHER_PRECISIONS') };
      case placeDetailsInfoType.PRICE:
        return { icon: Euro, title: $i18n.t('ACCESS_CONDITION_FINANCIAL_PARTICIPATION_REQUIRED') };
      case placeDetailsInfoType.PMR:
        return {
          icon: Accessible,
          title: $i18n.t('ACCESS_CONDITION_PEOPLE_WITH_REDUCED_MOBILITY')
        };
      case placeDetailsInfoType.ANIMALS:
        return { icon: Pets, title: $i18n.t('ACCESS_CONDITION_ACCEPTED_ANIMALS') };
      default:
        return { icon: Star, title: $i18n.t('OTHER') };
    }
  };

  /**
   * @param {import('$lib/models/types').TranslatableElement[]} description
   * @returns {string}
   */
  const getFormattedDescription = (description) => {
    return description.map(({ key, params }) => $i18n.t(key, params)).join(', ');
  };
</script>

<div class="info-content">
  {#each info as { type, description }}
    {@const details = getTitleAndIcon(type)}
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
            {#if type === placeDetailsInfoType.WELCOME_UNCONDITIONAL_CUSTOM || type === placeDetailsInfoType.WELCOME_EXCLUSIVE}
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
