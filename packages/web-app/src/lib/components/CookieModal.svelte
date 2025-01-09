<!--
Soliguide: Useful information for those who need it

SPDX-FileCopyrightText: © 2024 Solinum

SPDX-License-Identifier: AGPL-3.0-only

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import { Modal, Text, Link, ToggleSwitch, Button } from '@soliguide/design-system';
  import { I18N_CTX_KEY } from '$lib/client/i18n';
  import { setZDCookieConsent } from '$lib/client';
  import { COOKIE_CTX_KEY } from '$lib/client/cookie';
  import type { CookieConsentStore, I18nStore } from '$lib/client/types';

  export let cookiePolicyLink: string;
  export let zendeskChatbotLink: string;

  const i18n: I18nStore = getContext(I18N_CTX_KEY);
  const cookieStore: CookieConsentStore = getContext(COOKIE_CTX_KEY);

  const dispatch = createEventDispatcher();
  let cookiesEnabled = $cookieStore;

  const validateForm = () => {
    setZDCookieConsent(cookiesEnabled);
    cookieStore.set(cookiesEnabled);
    dispatch('close');
  };
</script>

<Modal title={$i18n.t('COOKIES_TITLE')} on:close>
  <div class="modal-content">
    <Text type="caption1">{$i18n.t('WHY_WE_USE_COOKIES')}</Text>
    <Text type="caption1">
      <Link href={cookiePolicyLink} underline size="xsmall">{$i18n.t('OUR_COOKIE_POLICY')}</Link>
      &nbsp;{$i18n.t('CAN_BE_REVIEWED_FOR_MORE_INFORMATION')}
    </Text>
    <div class="cookie-form">
      <Text type="caption1">
        {$i18n.t('I_ACCEPT_COOKIES')}&nbsp;<Link href={zendeskChatbotLink} underline size="xsmall">
          {$i18n.t('ZENDESK_CHATBOT')}
        </Link>
      </Text>
      <div>
        <ToggleSwitch bind:checked={cookiesEnabled} />
      </div>
    </div>
  </div>
  <svelte:fragment slot="footer">
    <Button type="shy" on:click={() => dispatch('close')}>{$i18n.t('CANCEL')}</Button>
    <Button on:click={validateForm}>{$i18n.t('VALIDATE')}</Button>
  </svelte:fragment>
</Modal>

<style lang="scss">
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacingLG);
  }
  .cookie-form {
    display: flex;
    align-items: flex-start;
    gap: var(--spacingXS);
  }
</style>
