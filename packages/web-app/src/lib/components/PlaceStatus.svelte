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
  import { getContext } from 'svelte';
  import { Tag, type types as DSTypes } from '@soliguide/design-system';
  import { I18N_CTX_KEY } from '$lib/client/i18n';
  import type { PlaceOpeningStatus } from '@soliguide/common';
  import type { I18nStore } from '$lib/client/types';

  export let status: PlaceOpeningStatus;

  const i18n: I18nStore = getContext(I18N_CTX_KEY);

  const getTagVariant = (state: PlaceOpeningStatus): DSTypes.TagVariant => {
    switch (state) {
      case 'open':
        return 'success';
      case 'partiallyOpen':
        return 'warning';
      case 'closed':
      case 'temporarilyClosed':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const getTagLabel = (state: PlaceOpeningStatus): string => {
    switch (state) {
      case 'open':
        return $i18n.t('OPENED');
      case 'partiallyOpen':
        return $i18n.t('PARTIALLY_OPENED');
      case 'closed':
        return $i18n.t('CLOSED');
      case 'temporarilyClosed':
        return $i18n.t('TEMPORARILY_CLOSED');
      case 'unknown':
      default:
        return $i18n.t('HOURS_NOT_SET');
    }
  };

  $: tagVariant = getTagVariant(status);
  $: tagLabel = getTagLabel(status);
</script>

<Tag variant={tagVariant} type={status === 'unknown' ? 'display' : 'badge'}>{tagLabel}</Tag>
