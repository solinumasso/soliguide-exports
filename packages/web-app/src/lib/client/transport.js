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
/**
 * @typedef {Record<string, unknown>} Dictionary
 *
 * @typedef {(url: string, options?: RequestInit) => Promise<*>} Fetcher
 */

import { get, writable } from 'svelte/store';

/**
 * Generic error formatting
 * @param error {any}
 * @returns {{status?: number, message: string}}
 */
const handleError = (error) => ({
  status: error?.status,
  message: error?.statusText || error?.message || error
});

/**
 * For testing only. Simulates window.fetch and
 * allows to fill with data or error to return
 * @typedef {(data: any) => void} FeedFn
 * @typedef {(err: any) => void} ErrorFn
 * @returns {{feedWith: FeedFn, setError: ErrorFn, fetch: Fetcher}}
 */
export const fakeFetch = () => {
  /** @typedef {{stubs: any, error: (Error | null)}} State */
  /** @type { import('svelte/store').Writable<State>} */
  const state = writable({ stubs: [], error: null });

  /** @type {FeedFn} */
  const feedWith = (data) => {
    state.update((old) => /** @type {State} */ ({ ...old, stubs: data }));
  };

  /** @type {ErrorFn} */
  const setError = (err) => {
    state.update((old) => /** @type {State} */ ({ ...old, error: err }));
  };

  /** @type {Fetcher} */
  const fetcher = () => {
    const { stubs: currentStubs, error: currentError } = get(state);
    if (currentError) {
      throw handleError(currentError);
    }
    return Promise.resolve(currentStubs);
  };

  return {
    feedWith,
    setError,
    fetch: fetcher
  };
};

/**
 * Sveltekit uses its own version of fetch in load functions.
 * This version is like the regular JS fetch, but works with SSR
 * @template T
 * @param sveltekitFetch {any}
 * @returns {function(*, *): Promise<T>}
 */
export const wrapSveltekitFetch = (sveltekitFetch = fetch) => {
  return (url, options) => {
    return new Promise((resolve, reject) => {
      sveltekitFetch(url, options)
        .then((/** @type {Response} */ response) => {
          if (response.ok) {
            response
              .json()
              .then(resolve)
              .catch((err) => reject(handleError(err)));
          } else {
            reject(handleError(response));
          }
        })
        .catch((/** @type {Error} */ err) => reject(handleError(err)));
    });
  };
};

/**
 * @template T
 * @param url {string}
 * @param options {RequestInit=}
 * @returns {Promise<T>}
 */
export default (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then(resolve)
            .catch((err) => reject(handleError(err)));
        } else {
          reject(handleError(response));
        }
      })
      .catch((err) => reject(handleError(err)));
  });
};
