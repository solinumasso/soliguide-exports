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
<script>
  import { goto } from '$app/navigation';
  import { getContext } from 'svelte';
  import { getMapLink, ROUTES_CTX_KEY } from '$lib/client';
  import { I18N_CTX_KEY } from '$lib/client/i18n.js';
  import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    ButtonLink
  } from '@soliguide/design-system';
  import NearMe from 'svelte-google-materialdesign-icons/Near_me.svelte';
  import PinDrop from 'svelte-google-materialdesign-icons/Pin_drop.svelte';
  import { TodayInfo, PlaceStatus } from '$lib/components';
  import PhoneButton from '$lib/components/PhoneButton.svelte';
  import ResultsCardServices from './ResultsCardServices.svelte';
  import { kmOrMeters } from '@soliguide/common';
  import { getSearchResultPageController } from '../../pageController.js';
  import { searchService } from '$lib/services';
  /** @type {import('$lib/client/types').RoutingStore} */
  const routes = getContext(ROUTES_CTX_KEY);
  /** @type {import('$lib/client/types').I18nStore} */
  const i18n = getContext(I18N_CTX_KEY);

  const { captureEvent } = getSearchResultPageController(searchService);
  /**
   * @type {import('$lib/models/types').SearchResultItem}
   */
  export let place;

  /**
   * @type {string}
   */
  export let id;

  /**
   * Redirect user to place he clicked on
   * @param {string} seoUrl
   */
  const gotoPlace = (seoUrl) => {
    captureEvent('card-info-click', { place: place.id });
    goto(`${$routes.ROUTE_PLACES}/${seoUrl}`);
  };
</script>

<Card>
  <a {id} class="card-link" href={`${$routes.ROUTE_PLACES}/${place.seoUrl}`}>
    <CardHeader
      on:click={() => {
        captureEvent('card-header-click', { place: place.id });
      }}
    >
      <div class="card-header-container">
        {#if place?.source}
          <div class="card-header-source">
            <Text type="caption2">{place.source}</Text>
          </div>
        {/if}
        <div class="card-title">
          <Text ellipsis type="title2PrimaryExtraBold">{place.name}</Text>
        </div>
        <div class="card-header-infos-container">
          <PlaceStatus status={place.status} />
          <TodayInfo todayInfo={place.todayInfo} />
        </div>
      </div>
    </CardHeader>
  </a>
  <CardBody>
    <div class="card-body">
      <div class="card-body-adress">
        <span class="card-body-adress-text">
          <Text type="text1Medium">{place.address}</Text>
          {#if place.distance > 0}
            <div class="card-body-adress-distance">
              <span class="card-body-adress-distance-icon"
                ><PinDrop aria-hidden="true" size={'12'} /></span
              ><Text type="text2" color="neutral">{kmOrMeters(place.distance)}</Text>
            </div>
          {/if}
        </span>
        <ButtonLink
          size="small"
          iconPosition="iconOnly"
          type="primaryOutline"
          href={getMapLink(place.address)}
          disabled={place.banners.orientation}
          ><NearMe
            slot="icon"
            on:click={() => {
              captureEvent('go-to-click');
            }}
          /></ButtonLink
        >
      </div>
      <ResultsCardServices services={place.services} />
    </div>
  </CardBody>
  <CardFooter>
    <div class="card-footer">
      <PhoneButton
        type="neutralOutlined"
        phones={place.phones}
        on:click={() => {
          captureEvent('phone-click');
        }}
      />
      <Button
        role="link"
        on:click={() => gotoPlace(place.seoUrl)}
        size="small"
        type="primaryGradientFill"
        >{$i18n.t('PLUS_INFOS')}
      </Button>
    </div>
  </CardFooter>
</Card>

<style lang="scss">
  $cardHeaderHeight: 90px;

  .card-link {
    text-decoration: none;
  }

  .card-header-container {
    position: relative;
    height: $cardHeaderHeight;
  }

  .card-header-source {
    position: absolute;
    top: -14px;
    right: 0;
  }

  .card-header-infos-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing3XS);
  }

  .card-body {
    padding: 0 var(--spacingLG);
    display: flex;
    flex-direction: column;
    gap: var(--spacingLG);
    width: 100%;
  }

  .card-body-adress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacingXS);
  }

  .card-body-adress-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-body-adress-distance {
    padding-top: var(--spacing3XS);
    display: flex;
    align-items: center;
    gap: var(--spacing4XS);
  }
  .card-body-adress-distance-icon {
    color: var(--color-interactionHighlightPrimary);
  }

  .card-footer {
    gap: var(--spacingXL);
    display: flex;
    justify-content: center;
    width: 100%;
  }

  [id] {
    scroll-margin-top: var(--topbar-height);
  }
</style>
