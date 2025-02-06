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
  import { createEventDispatcher } from 'svelte';
  import { BasicCard, Text, Button } from '@soliguide/design-system';

  /** @type {import('@soliguide/design-system').types.BasicCardType} */
  export let cardType = 'default';
  export let title = '';
  export let description = '';
  export let actionName;
  export let imgUrl;

  const dispatch = createEventDispatcher();
</script>

<BasicCard type={cardType}>
  <div class="card-content">
    <div class="main-content">
      <div class="text-content">
        <Text type="title4PrimaryBold">{title}</Text>
        <Text type="caption1" color="shy">{description}</Text>
      </div>
      <div class="img-container">
        <img src={imgUrl} alt="icon" aria-hidden="true" />
      </div>
    </div>
    <div class="footer">
      <Button type="neutralOutlined" size="xsmall" on:click={() => dispatch('action')}>
        {actionName}
      </Button>
    </div>
  </div>
</BasicCard>

<style lang="scss">
  .card-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacingLG);
  }

  .main-content {
    display: flex;
    align-items: center;
    gap: var(--spacing2XS);
  }

  .text-content {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }

  .img-container {
    min-width: 53px;
    text-align: center;
  }

  .footer {
    text-align: center;
  }
</style>
