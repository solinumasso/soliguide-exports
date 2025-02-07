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
import { type PosthogCaptureFunction } from '$lib/services/types';
import { writable } from 'svelte/store';
import type { PageController, PageLinks, PageState } from './types';

const initialLinks: PageLinks = {
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
 */
const initialState: PageState = {
  ...initialLinks,
  cookieModalOpen: false
};

export const getPageController = (): PageController => {
  const pageStore = writable(initialState);

  const init = (links = initialLinks) => {
    pageStore.set({ ...initialState, ...links });
  };

  const openCookieModal = () => {
    pageStore.update((oldValue): PageState => ({ ...oldValue, cookieModalOpen: true }));
  };

  const closeCookieModal = () => {
    pageStore.update((oldValue): PageState => ({ ...oldValue, cookieModalOpen: false }));
  };

  /**
   * Capture an event with a prefix for route context
   */
  const captureEvent: PosthogCaptureFunction = (eventName, properties) => {
    posthogService.capture(`more-options-${eventName}`, properties);
  };

  return {
    subscribe: pageStore.subscribe,
    init,
    openCookieModal,
    closeCookieModal,
    captureEvent
  };
};
