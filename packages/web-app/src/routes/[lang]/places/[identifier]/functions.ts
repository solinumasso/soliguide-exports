/*
 * Soliguide: Useful information for those who need it
 *
 * SPDX-FileCopyrightText: © 2024 Solinum
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import type { i18n } from 'i18next';
import { PlaceDetailsInfoType } from '$lib/models/types';
import type { TitleAndIcon } from './types';

import Group from 'svelte-google-materialdesign-icons/Group.svelte';
import Event from 'svelte-google-materialdesign-icons/Date_range.svelte';
import Accessible from 'svelte-google-materialdesign-icons/Accessible.svelte';
import Pets from 'svelte-google-materialdesign-icons/Pets.svelte';
import ChatBubble from 'svelte-google-materialdesign-icons/Chat_bubble_outline.svelte';
import Euro from 'svelte-google-materialdesign-icons/Euro.svelte';
import Star from 'svelte-google-materialdesign-icons/Star.svelte';

export const getTitleAndIcon = ($i18n: i18n, type: PlaceDetailsInfoType): TitleAndIcon => {
  switch (type) {
    case PlaceDetailsInfoType.WELCOME_UNCONDITIONAL_CUSTOM:
      return { icon: Group, title: $i18n.t('UNCONDITIONAL_ADAPTED_ACCESS') };
    case PlaceDetailsInfoType.WELCOME_EXCLUSIVE:
      return { icon: Group, title: $i18n.t('EXCLUSIVE_ACCESS') };
    case PlaceDetailsInfoType.WELCOME_UNCONDITIONAL:
      return { icon: Group, title: $i18n.t('PUBLICS_WELCOME_UNCONDITIONAL') };
    case PlaceDetailsInfoType.PUBLICS_MORE_INFO:
      return { icon: Group, title: $i18n.t('ADDITIONAL_INFORMATION') };
    case PlaceDetailsInfoType.ACCESS_ORIENTATION:
      return { icon: Event, title: $i18n.t('ACCESS_ON_ORIENTATION_DISPLAY') };
    case PlaceDetailsInfoType.ACCESS_FREE:
      return { icon: Event, title: $i18n.t('FREE_ACCESS') };
    case PlaceDetailsInfoType.APPOINTMENT:
      return { icon: Event, title: $i18n.t('ACCESS_CONDITION_ON_APPOINTMENT') };
    case PlaceDetailsInfoType.REGISTRATION:
      return { icon: Event, title: $i18n.t('ACCESS_CONDITION_ON_REGISTRATION') };
    case PlaceDetailsInfoType.MODALITIES_MORE_INFO:
      return { icon: Event, title: $i18n.t('ACCESS_CONDITION_OTHER_PRECISIONS') };
    case PlaceDetailsInfoType.PRICE:
      return { icon: Euro, title: $i18n.t('ACCESS_CONDITION_FINANCIAL_PARTICIPATION_REQUIRED') };
    case PlaceDetailsInfoType.PMR:
      return {
        icon: Accessible,
        title: $i18n.t('ACCESS_CONDITION_PEOPLE_WITH_REDUCED_MOBILITY')
      };
    case PlaceDetailsInfoType.ANIMALS:
      return { icon: Pets, title: $i18n.t('ACCESS_CONDITION_ACCEPTED_ANIMALS') };
    case PlaceDetailsInfoType.LANGUAGES_SPOKEN:
      return { icon: ChatBubble, title: $i18n.t('LANGUES') };
    default:
      return { icon: Star, title: $i18n.t('OTHER') };
  }
};
