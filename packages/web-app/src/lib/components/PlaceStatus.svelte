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
  import { Tag } from '@soliguide/design-system';
  import { I18N_CTX_KEY } from '$lib/client/i18n.js';

  /** @type {import('@soliguide/common').PlaceOpeningStatus} */
  export let status;

  /** @type {import('$lib/client/types').I18nStore} */
  const i18n = getContext(I18N_CTX_KEY);

  /**
   * @param state {import('@soliguide/common').PlaceOpeningStatus}
   * @returns {import('@soliguide/design-system').types.TagVariant}}
   */
  const getTagVariant = (state) => {
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

  /**
   * @param state {import('@soliguide/common').PlaceOpeningStatus}
   * @returns {string}
   */
  const getTagLabel = (state) => {
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
