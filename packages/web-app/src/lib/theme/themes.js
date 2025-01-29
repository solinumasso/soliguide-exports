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
import { env } from '$env/dynamic/public';

import {
  SUPPORTED_LANGUAGES,
  CountryCodes,
  SupportedLanguagesCode,
  Themes
} from '@soliguide/common';
import { readonly, writable } from 'svelte/store';

/**
 * @typedef {import('./types').ThemeDefinition | null} ThemeDefinition
 */

const themesConfig = [
  { theme: Themes.SOLIGUIDE_FR, hostname: env.PUBLIC_SOLIGUIDE_FR_DOMAIN_NAME },
  { theme: Themes.SOLIGUIA_ES, hostname: env.PUBLIC_SOLIGUIDE_ES_DOMAIN_NAME },
  { theme: Themes.SOLIGUIA_AD, hostname: env.PUBLIC_SOLIGUIDE_AD_DOMAIN_NAME }
];

/** @type {import('./types').ThemeDefinition}  */
const defaultTheme = {
  name: Themes.SOLIGUIDE_FR,
  brandName: 'Soliguide',
  country: CountryCodes.FR,
  defaultLanguage: SupportedLanguagesCode.FR,
  supportedLanguages: SUPPORTED_LANGUAGES,
  media: {
    homeIllustration: 'soliguide_illustration_home.svg',
    logos: {
      inline: 'soliguide-inline.svg',
      original: 'soliguide.svg',
      symbol: 'soliguide-symbol.svg'
    }
  },
  links: {
    fichesPratiques: 'https://support.soliguide.fr/hc/fr',
    solinumSite: 'https://www.solinum.org/',
    becomeTranslator: 'https://airtable.com/shrZHYio1ZdnPl1Et',
    cookiePolicy: 'https://soliguide.fr/fr/politique-cookies',
    privacyPolicy: 'https://soliguide.fr/fr/politique-confidentialite',
    dataProtectionAgreement: 'https://soliguide.fr/fr/accord-protection-donnees',
    legalNotice: 'https://soliguide.fr/fr/mentions-legales',
    termsAndConditions: 'https://soliguide.fr/fr/cgu'
  },
  chatWebsiteId: env.PUBLIC_CHAT_WEBSITE_ID
};

/** @type {Partial<import('./types').ThemeDefinition>[]}  */
const themeDefinitions = [
  defaultTheme,
  {
    name: Themes.SOLIGUIA_ES,
    brandName: 'Soliguia',
    country: CountryCodes.ES,
    defaultLanguage: SupportedLanguagesCode.CA,
    chatWebsiteId: null
  },
  {
    name: Themes.SOLIGUIA_AD,
    brandName: 'Soliguia',
    country: CountryCodes.AD,
    defaultLanguage: SupportedLanguagesCode.CA,
    chatWebsiteId: null
  }
];

/**
 * Resolve theme from current host origin
 * @param hostname {string}
 * @returns {import('./types').ThemeDefinition | null}
 */

const resolveTheme = (hostname) => {
  const configTheme = themesConfig.find((item) => item.hostname === hostname)?.theme;

  if (!configTheme) {
    console.warn('No theme found for hostname', hostname);
    return null;
  }
  const theme = themeDefinitions.find((themeItem) => themeItem.name === configTheme);

  // Allows the theme to be partially defined
  return { ...defaultTheme, ...theme };
};

const getThemeStore = () => {
  const themeStore = writable({ ...defaultTheme });
  /**
   * Resolve theme from current host origin
   * @param {string} hostname
   */
  const init = (hostname) => {
    const theme = resolveTheme(hostname);
    if (!theme) return;

    themeStore.update((oldTheme) => ({ oldTheme, ...theme }));
  };

  /**
   * @returns {import('svelte/store').Readable<import('./types').ThemeDefinition>}
   */
  const getTheme = () => {
    return readonly(themeStore);
  };

  return {
    init,
    getTheme
  };
};

export { resolveTheme, getThemeStore };
