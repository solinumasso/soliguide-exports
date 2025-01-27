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
import { writable } from 'svelte/store';
import { PlaceOpeningStatus, WEEK_DAYS } from '@soliguide/common';
import { posthogService } from '$lib/services/posthogService';

/**
 * @typedef {import('$lib/services/types').PosthogProperties} PosthogProperties
 */

const getCurrentDay = () => {
  return new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
};

const getCurrentDayIndex = () => {
  return (new Date().getDay() + 6) % 7;
};

/**
 *
 * @param {import('$lib/models/types').PlaceDetailsOpeningHours} hours
 * @returns {import('$lib/models/types').PlaceDetailsOpeningHours}
 */
const reorderedDays = (hours) => {
  const currentDayIndex = getCurrentDayIndex();
  const orderedDays = [...WEEK_DAYS.slice(currentDayIndex), ...WEEK_DAYS.slice(0, currentDayIndex)];

  return orderedDays.reduce(
    (acc, day) => ({
      ...acc,
      [day]: hours[day] || []
    }),
    {}
  );
};

/** @type {Partial<import('./types').PageState>} */
const initialValue = {
  placeDetails: {
    // lieu_id 7 does not exist in the database
    id: 7,
    address: '',
    description: '',
    email: '',
    facebook: '',
    fax: '',
    hours: {},
    info: [],
    instagram: '',
    lastUpdate: '',
    name: '',
    onOrientation: false,
    phones: [],
    services: [],
    status: PlaceOpeningStatus.OPEN,
    todayInfo: {},
    website: ''
  },
  error: null
};

/**
 * Capture an event with a prefix for route context
 * @param {string} eventName The name of the event to capture
 * @param {PosthogProperties} [properties] Optional properties to include with the event
 */
const captureEvent = (eventName, properties) => {
  posthogService.capture(`place-page-${eventName}`, properties);
};

export const getPlaceDetailsPageController = () => {
  const pageStore = writable();
  /** @type {import('./types').PageController['init']} */
  const init = (placeData) => {
    const { hours } = placeData;
    pageStore.set({
      ...initialValue,
      placeDetails: { ...placeData, hours: reorderedDays(hours) },
      currentDay: getCurrentDay()
    });
  };
  return {
    subscribe: pageStore.subscribe,
    init,
    captureEvent
  };
};
