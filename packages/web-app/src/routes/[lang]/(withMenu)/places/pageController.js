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
import { posthogService } from '$lib/services/posthogService';
import { writable, get } from 'svelte/store';

/**
 * Shorthand
 * @typedef {import('./types').PageState} PageState
 * @typedef {import('$lib/models/types').SearchResult} SearchResult
 * @typedef {import('$lib/services/types').SearchParams} SearchParams
 * @typedef {import('$lib/services/types').PosthogProperties} PosthogProperties
 * @typedef {import('@soliguide/common').Categories} Categories
 */

/** @type {PageState} */
const initialState = {
  isLoading: false,
  initializing: false,
  searchResult: { nbResults: 0, places: [] },
  adressLabel: '',
  search: {
    location: '',
    category: '',
    lang: '',
    latitude: 0,
    longitude: 0,
    type: '',
    options: { page: 0 }
  },
  searchError: null,
  hasMorePages: false,
  urlParams: null
};

/**
 * @param searchService {import('$lib/services/types').PlacesService}
 * @returns {import('./types').GetSearchResultPageController}
 */
export const getSearchResultPageController = (searchService) => {
  /** @type { import('svelte/store').Writable<PageState>} */
  const myPageStore = writable(initialState);

  /**
   * Update seachResult by adding new fetched places
   * @type {import('./types').GetSearchResultPageController['getNextResults']}
   */
  const getNextResults = async () => {
    // Set loading to true and increment page
    myPageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          isLoading: true
        })
    );

    // Get the current search in the store
    const { search } = get(myPageStore);

    try {
      const newOptions = { ...search.options, page: search.options.page + 1 };
      const result = await searchService.searchPlaces(search, newOptions);

      // If no more places to fetch, we notify the store
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            hasMorePages: result.places.length > 0,
            search: { ...oldValue.search, options: newOptions },
            searchResult: {
              nbResults: result.nbResults,
              places: [...oldValue.searchResult.places, ...result.places]
            }
          })
      );
    } catch (/** @type {any} */ error) {
      console.log('Error while fetching places', error);
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            searchError: error.message
          })
      );
    } finally {
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            isLoading: false,
            initializing: false
          })
      );
    }
  };

  /**
   * Init the page with the url params from search page and the search result
   * @type {import('./types').GetSearchResultPageController['init']}
   */
  const init = async (urlParams) => {
    const { location, category, lang, latitude, longitude, type, label } = urlParams;

    if (location && category && lang && latitude && longitude && type && label) {
      myPageStore.set({
        ...initialState,
        initializing: true,
        search: {
          ...urlParams,
          latitude: Number(latitude),
          longitude: Number(longitude),
          options: { page: 0 }
        },
        adressLabel: label,
        urlParams
      });

      // Get data - put in store
      await getNextResults();
    }
  };

  /**
   * Capture an event with a prefix for route context
   * @param {string} eventName The name of the event to capture
   * @param {PosthogProperties} [properties] Optional properties to include with the event
   */
  const captureEvent = (eventName, properties) => {
    posthogService.capture(`search-${eventName}`, properties);
  };

  return {
    subscribe: myPageStore.subscribe,
    init,
    getNextResults,
    captureEvent
  };
};
