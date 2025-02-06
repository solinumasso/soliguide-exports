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
<script lang="ts" context="module">
  import Menu from '$lib/components/navigation/Menu.svelte';
  import Search from 'svelte-google-materialdesign-icons/Search.svelte';
  import FavoriteBorder from 'svelte-google-materialdesign-icons/Favorite_border.svelte';
  import LocationOn from 'svelte-google-materialdesign-icons/Location_on.svelte';
  import Star from 'svelte-google-materialdesign-icons/Star.svelte';
  import Settings from 'svelte-google-materialdesign-icons/Settings.svelte';

  export const meta = {
    title: 'Navigation/Menu',
    component: Menu,
    argTypes: {
      activeItem: {
        control: { type: 'radio' },
        options: ['search', 'home', 'aroundme']
      },
      menuItems: { table: { disable: true } },
      showBadge: {
        control: 'boolean'
      }
    },
    args: {
      activeItem: 'search',
      showBadge: false,
      menuItems: [
        {
          icon: Search,
          iconActive: Search,
          label: 'Search',
          ariaLabel: 'This is search menu item',
          ariaLabelActive: 'This is search menu item active page',
          route: 'search'
        },
        {
          icon: FavoriteBorder,
          iconActive: Star,
          label: 'Home',
          ariaLabel: 'This is favorites menu item',
          ariaLabelActive: 'This is favorites menu item active page',
          route: 'home'
        },
        {
          icon: LocationOn,
          iconActive: Settings,
          label: 'Around me',
          ariaLabel: 'This is around me menu item',
          ariaLabelActive: 'This is around me menu item active page',
          route: 'aroundme'
        }
      ]
    }
  };
</script>

<script lang="ts">
  import { Story, Template } from '@storybook/addon-svelte-csf';
  import {
    IconHomeOff,
    IconHomeOn,
    IconSearchOff,
    IconSearchOn,
    IconTalkOff,
    IconTalkOn,
    IconBurgerOff,
    IconBurgerOn,
    IconFavoriteOff,
    IconFavoriteOn
  } from '$lib/components/icons';

  $: activeItem = '/fr/search';
  $: showBadge = false;
  $: itemsWithCustomIcons = [
    {
      icon: IconHomeOff,
      iconActive: IconHomeOn,
      label: 'Home',
      ariaLabel: 'This is Home menu item',
      ariaLabelActive: 'This is Home menu item active page',
      route: '/fr/home'
    },
    {
      icon: IconSearchOff,
      iconActive: IconSearchOn,
      label: 'Search',
      ariaLabel: 'This is search menu item',
      ariaLabelActive: 'This is search menu item active page',
      route: '/fr/search'
    },
    {
      icon: IconFavoriteOff,
      iconActive: IconFavoriteOn,
      label: 'Favorites',
      ariaLabel: 'This is favorites menu item',
      ariaLabelActive: 'This is favorites menu item active page',
      route: '/fr/favorites'
    },
    {
      icon: IconTalkOff,
      iconActive: IconTalkOn,
      label: 'Talk',
      ariaLabel: 'This is Talk menu item',
      ariaLabelActive: 'This is Talk menu item active page',
      route: '/fr/talk',
      hasBadge: true
    },
    {
      icon: IconBurgerOff,
      iconActive: IconBurgerOn,
      label: 'More',
      ariaLabel: 'This is around me menu item',
      ariaLabelActive: 'This is around me menu item active page',
      route: '/fr/more-options'
    }
  ];
</script>

<Template let:args>
  <Menu {...args} />
</Template>

<Story name="Default" />
<Story name="With custom icons">
  <Menu menuItems={itemsWithCustomIcons} {activeItem} {showBadge} />
</Story>
<Story name="With custom icons and badge" let:args>
  <Menu {...args} menuItems={itemsWithCustomIcons} {activeItem} />
</Story>
