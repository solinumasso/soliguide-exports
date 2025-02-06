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
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  removeStorageItemsByPattern
} from '$lib/client/storage.js';
import { writable } from 'svelte/store';

const ZD_COOKIE_CONSENT_KEY = 'zdCookieConsent';

export const COOKIE_CTX_KEY = Symbol('cookie consent context key');
export const cookieConsent = writable(false);

/**
 * @param consent {boolean}
 */
export const setZDCookieConsent = (consent) => {
  if (consent) {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 3);
    setStorageItem(ZD_COOKIE_CONSENT_KEY, expirationDate.toString());
  } else {
    removeStorageItem(ZD_COOKIE_CONSENT_KEY);
    removeStorageItemsByPattern(/^ZD/u);
    removeStorageItemsByPattern(/\.appUserId$/u);
    removeStorageItemsByPattern(/\.clientId$/u);
    removeStorageItemsByPattern(/\.conversationStartedAt$/u);
    removeStorageItemsByPattern(/\.sessionToken$/u);
  }
};

/**
 * @returns {boolean}
 */
export const getZDCookieConsent = () => {
  const storageValue = getStorageItem(ZD_COOKIE_CONSENT_KEY);
  if (storageValue) {
    const expirationDate = new Date(storageValue);
    return !isNaN(Number(expirationDate)) && new Date() < expirationDate;
  }
  return false;
};
