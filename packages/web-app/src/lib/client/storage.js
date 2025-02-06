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
// Localstorage stuff
import { browser } from '$app/environment';

/**
 * Read localStorage
 * @param key {string}
 * @return {string | null}
 */
export const getStorageItem = (key) => {
  if (browser) {
    return window.localStorage.getItem(key);
  }
  return null;
};

/**
 * Write into localStorage
 * @param key {string}
 * @param value {string}
 */
export const setStorageItem = (key, value) => {
  if (browser) {
    window.localStorage.setItem(key, value);
  }
};

/**
 * Read localStorage
 * @param key {string}
 */
export const removeStorageItem = (key) => {
  if (browser) {
    window.localStorage.removeItem(key);
  }
};

/**
 * Delete localStorage entries that have the key matching the regex
 * @param regex {RegExp}
 */
export const removeStorageItemsByPattern = (regex) => {
  if (browser) {
    const keys = Object.keys(window.localStorage);
    const filteredKeys = keys.filter((key) => regex.test(key));
    filteredKeys.forEach((key) => removeStorageItem(key));
  }
};
