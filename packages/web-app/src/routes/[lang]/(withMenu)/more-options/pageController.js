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

/**
 * @typedef {import('./types').PageState} PageState
 * @typedef {import('./types').PageLinks} PageLinks
 * */

/** @type {PageLinks} */
const initialLinks = {
  fichesPratiquesLink: '#',
  solinumSiteLink: '#',
  becomeTranslatorLink: '#',
  cookiePolicyLink: '#',
  privacyPolicyLink: '#',
  dataProtectionAgreementLink: '#',
  legalNoticeLink: '#',
  termsAndConditionsLink: '#'
};

/**
 * Avoid null values
 * @type {PageState} */
const initialState = {
  ...initialLinks,
  cookieModalOpen: false
};

/** @type {() => import('./types').PageController} */
export const getPageController = () => {
  /** @type { import('svelte/store').Writable<PageState>} */
  const pageStore = writable(initialState);

  const init = (links = initialLinks) => {
    pageStore.set({ ...initialState, ...links });
  };

  const openCookieModal = () => {
    pageStore.update(
      (oldValue) => /** @type {PageState} */ ({ ...oldValue, cookieModalOpen: true })
    );
  };

  const closeCookieModal = () => {
    pageStore.update(
      (oldValue) => /** @type {PageState} */ ({ ...oldValue, cookieModalOpen: false })
    );
  };

  return {
    subscribe: pageStore.subscribe,
    init,
    openCookieModal,
    closeCookieModal
  };
};
