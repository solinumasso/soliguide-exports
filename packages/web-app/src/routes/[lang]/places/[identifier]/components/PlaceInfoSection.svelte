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
  import { getContext } from 'svelte';
  import Update from 'svelte-google-materialdesign-icons/Update.svelte';
  import Group from 'svelte-google-materialdesign-icons/Group.svelte';
  import Event from 'svelte-google-materialdesign-icons/Date_range.svelte';
  import Accessible from 'svelte-google-materialdesign-icons/Accessible.svelte';
  import Pets from 'svelte-google-materialdesign-icons/Pets.svelte';
  import ChatBubble from 'svelte-google-materialdesign-icons/Chat_bubble_outline.svelte';
  import Euro from 'svelte-google-materialdesign-icons/Euro.svelte';
  import Star from 'svelte-google-materialdesign-icons/Star.svelte';
  import { AppIcon, Tag, Text, TextClamper } from '@soliguide/design-system';
  import PlaceDetailsSection from './PlaceDetailsSection.svelte';

  import { I18N_CTX_KEY } from '$lib/client/i18n';
  import { formatToDateWithFullMonth } from '$lib/client';
  import { placeDetailsInfoType } from '$lib/models/placeDetails';
  import DOMPurify from 'dompurify';

  /** @type {import('$lib/models/types').PlaceDetailsInfo[]} */
  export let info = [];

  export let lastUpdate;

  /** @type {import('$lib/client/types').I18nStore} */
  const i18n = getContext(I18N_CTX_KEY);

  /**
   * @param {import('$lib/models/types').Tag} Tag
   * @returns {string}
   */
  const formatContent = ({ value }) => {
    const rawContent = $i18n.t(value);
    return DOMPurify.sanitize(rawContent);
  };

  /**
   * @param {{ key: string; params?: Record<string, string> }[]} description
   * @returns {string}
   */
  const getFormattedDescription = (description) => {
    return description.map(({ key, params }) => $i18n.t(key, params)).join(', ');
  };

  /**
   * @param type {import('$lib/models/types').PlaceDetailsInfoType}
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
      case placeDetailsInfoType.LANGUAGES_SPOKEN:
        return { icon: ChatBubble, title: $i18n.t('LANGUES') };
      default:
        return { icon: Star, title: $i18n.t('OTHER') };
    }
  };
</script>

<PlaceDetailsSection>
  <div class="info-content">
    <div class="details-container">
      {#each info as { type, description, tags }}
        {@const details = getTitleAndIcon(type)}
        <div class="detail">
          <div class="icon">
            <svelte:component this={details.icon} size="18" />
          </div>
          <div class="title-description">
            <Text type="text2Medium" color="dark">{details.title}</Text>
            <TextClamper
              linesNotClamped={3}
              showMoreLabel={$i18n.t('SEE_MORE')}
              showLessLabel={$i18n.t('SEE_LESS')}
            >
              <Text type="caption1" color="shy">
                {#if type === placeDetailsInfoType.WELCOME_UNCONDITIONAL_CUSTOM || type === placeDetailsInfoType.WELCOME_EXCLUSIVE}
                  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                  {@html DOMPurify.sanitize(getFormattedDescription(description).toLowerCase())}
                {:else}
                  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                  {@html DOMPurify.sanitize(getFormattedDescription(description))}
                {/if}
              </Text>
            </TextClamper>
            {#if tags.length}
              <div class="tags">
                {#each tags as tag}
                  <Tag variant="warning">
                    <Star slot="icon" />
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html formatContent(tag)}
                  </Tag>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    <div class="last-update">
      <AppIcon icon={Update} />
      <Text type="caption2" color="neutral">
        {`${$i18n.t('EXPORTS_HEADER_LAST_UPDATE')} : ${formatToDateWithFullMonth(lastUpdate, $i18n.language)}`}
      </Text>
    </div>
  </div>
</PlaceDetailsSection>

<style>
  .info-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacingXL);
  }

  .details-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacingLG);
  }

  .detail {
    display: flex;
    gap: var(--spacingMD);
  }

  .icon {
    height: 18px;
    width: 18px;
    color: var(--color-textDark);
  }

  .title-description {
    display: flex;
    flex-direction: column;
  }

  .tags {
    display: flex;
    gap: var(--spacing4XS);
    flex-wrap: wrap;
    margin-bottom: var(--spacing4XS);
  }

  .last-update {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing2XS);
  }
</style>
