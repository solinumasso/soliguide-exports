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
import type { Writable } from 'svelte/store';
import type { DetailedSheet, PlaceDetails } from '$lib/models/types';
import type { DayName } from '@soliguide/common';

import Accessible from 'svelte-google-materialdesign-icons/Accessible.svelte';
import Euro from 'svelte-google-materialdesign-icons/Euro.svelte';
import Group from 'svelte-google-materialdesign-icons/Group.svelte';
import Pets from 'svelte-google-materialdesign-icons/Pets.svelte';
import Star from 'svelte-google-materialdesign-icons/Star.svelte';
import Event from 'svelte-google-materialdesign-icons/Event.svelte';

export type PageState = {
  placeDetails: PlaceDetails;
  currentDay: DayName;
  error: string | null;
};

export type PageController = {
  subscribe: Writable<PageState>['subscribe'];
  init(s: PlaceDetails): void;
  captureEvent(eventName: string, properties?: PosthogProperties): void;
};

export type TitleAndIcon = {
  icon: typeof Accessible | typeof Euro | typeof Group | typeof Pets | typeof Star | typeof Event;
  title: string;
};
