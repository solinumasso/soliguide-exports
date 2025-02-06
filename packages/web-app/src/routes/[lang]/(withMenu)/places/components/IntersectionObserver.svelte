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
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  /** @type {IntersectionObserver} */
  let observer;

  /** @type {HTMLElement | null} */
  let elementToObserve = null;

  /**
   * Sets up the Intersection Observer
   */
  const setupIntersectionObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch('intersect');
        }
      },
      { rootMargin: '200px' }
    );

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }
  };

  onMount(() => {
    setupIntersectionObserver();
  });

  /**
   * Updates the element to observe reference
   * @param {HTMLElement} node
   */
  const updateElementToObserve = (node) => {
    if (observer) {
      observer.disconnect();
      observer.observe(node);
    }
  };
</script>

<div bind:this={elementToObserve} use:updateElementToObserve></div>
