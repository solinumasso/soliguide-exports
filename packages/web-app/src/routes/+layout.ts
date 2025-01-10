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
import { redirect, error } from '@sveltejs/kit';
import { isLangValid, isLanguageSelected, getCurrentLangInStorage, getRoutes } from '$lib/client';
import { browser } from '$app/environment';
import { resolveTheme } from '$lib/theme';

export const load = ({ route, params, url }) => {
  const theme = resolveTheme(url.origin);
  if (!theme) {
    error(500, `No theme found for ${url.origin}`);
  }

  // Because we need localStorage
  if (browser) {
    // Check in localStorage
    const currentLang = getCurrentLangInStorage();
    const routes = getRoutes(currentLang);

    const storedLangIsInvalid = !isLangValid(currentLang);
    const langIsInvalid = params.lang && !isLangValid(params.lang);
    const needToRedirectToHomeLang = route.id === '/' && isLanguageSelected();

    if (langIsInvalid || needToRedirectToHomeLang) {
      redirect(302, routes.ROUTE_HOME);
    }

    if (route.id !== routes.ROUTE_LANGUAGES && (!isLanguageSelected() || storedLangIsInvalid)) {
      redirect(302, routes.ROUTE_LANGUAGES);
    }
  }
};
