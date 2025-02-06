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
 * @typedef {import('./types').ZendeskState} ZendeskState
 */

/** @type {ZendeskState} */
const initialState = {
  hasNewMessage: false
};

const getZendeskService = () => {
  // eslint-disable-next-line fp/no-let,no-empty-function
  let closeCB = () => {};

  const zendeskStore = writable(initialState);

  const init = () => {
    if (!window.zE) {
      console.log('ZD is not available');
    }

    window.zE('messenger:set', 'cookies', true);
    window.zE('messenger', 'hide');
    window.zE('messenger:on', 'close', () => {
      closeCB();
    });

    window.zE(
      'messenger:on',
      'unreadMessages',
      /** @param {number} count */
      (count) => {
        console.log(`It seems you have ${count} unread messages!`);
        zendeskStore.update((value) => ({ ...value, hasNewMessage: count > 0 }));
      }
    );
  };

  const openChat = () => {
    window.zE('messenger', 'open');
    window.zE('messenger', 'show');
  };

  const closeChat = () => {
    window.zE('messenger', 'hide');
    window.zE('messenger', 'close');
  };

  const disconnectZendesk = () => {
    window.zE('messenger:set', 'cookies', false);
    window.zE('messenger', 'close');
    window.zE('messenger', 'logoutUser');
  };

  /**
   * Set a callback to be called when the close event is triggered by zendesk widget
   * @param callback {() => void}
   */
  const registerCloseCallback = (callback = closeCB) => {
    if (typeof callback === 'function') {
      // eslint-disable-next-line fp/no-mutation
      closeCB = callback;
    }
  };

  /**
   * Toggle the value of the hasNewMessage store
   */
  const removeMessageNotification = () => {
    zendeskStore.update((value) => ({ ...value, hasNewMessage: true }));
  };

  return {
    openChat,
    closeChat,
    subscribe: zendeskStore.subscribe,
    init,
    disconnectZendesk,
    registerCloseCallback,
    removeMessageNotification
  };
};

// Expose a singleton
const zendeskService = getZendeskService();

export { zendeskService };
