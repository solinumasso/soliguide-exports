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
  import PlaceDetailsSection from './PlaceDetailsSection.svelte';
  import { Text, TextClamper } from '@soliguide/design-system';
  import { getContext } from 'svelte';
  import DOMPurify from 'isomorphic-dompurify';
  import type { I18nStore } from '$lib/client/types';

  export let description: string;

  const i18n: I18nStore = getContext(I18N_CTX_KEY);
</script>

<PlaceDetailsSection>
  <section class="description">
    <Text type="title3PrimaryExtraBold">{$i18n.t('DESCRIPTION')}</Text>
    <TextClamper
      linesNotClamped={3}
      showMoreLabel={$i18n.t('SEE_MORE')}
      showLessLabel={$i18n.t('SEE_LESS')}
    >
      <Text type="caption1" color="shy">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html DOMPurify.sanitize(description)}
      </Text>
    </TextClamper>
  </section>
</PlaceDetailsSection>

<style lang="scss">
  .description {
    display: flex;
    flex-direction: column;
    gap: var(--spacing3XS);

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
