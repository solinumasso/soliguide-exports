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
import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES, SupportedLanguagesCode } from '@soliguide/common';
import { changeDesignSystemLocale } from '@soliguide/design-system';

import ar from '@soliguide/common/dist/esm/translations/locales/ar.json';
import ca from '@soliguide/common/dist/esm/translations/locales/ca.json';
import en from '@soliguide/common/dist/esm/translations/locales/en.json';
import es from '@soliguide/common/dist/esm/translations/locales/es.json';
import fa from '@soliguide/common/dist/esm/translations/locales/fa.json';
import fr from '@soliguide/common/dist/esm/translations/locales/fr.json';
import ka from '@soliguide/common/dist/esm/translations/locales/ka.json';
import ps from '@soliguide/common/dist/esm/translations/locales/ps.json';
import ro from '@soliguide/common/dist/esm/translations/locales/ro.json';
import ru from '@soliguide/common/dist/esm/translations/locales/ru.json';
import uk from '@soliguide/common/dist/esm/translations/locales/uk.json';

/**
 * @typedef {import('./types').I18nStore} I18nStore
 * @typedef {Record<string, { translation: Record<string, string> }>} TranslationResources
 * */

const resources = {
  ar: { translation: ar },
  ca: { translation: ca },
  en: { translation: en },
  es: { translation: es },
  fa: { translation: fa },
  fr: { translation: fr },
  ka: { translation: ka },
  ps: { translation: ps },
  ro: { translation: ro },
  ru: { translation: ru },
  uk: { translation: uk }
};

// We want to use only supported languages
const supportedResources = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
  if (!resources[lang]) {
    console.warn('Cannot find translations for lang', lang);
    return acc;
  }
  return { ...acc, [lang]: resources[lang] };
}, /** @type {TranslationResources} */ ({}));

/**
 * Initialize i18n and put it in a store
 * @param defaultLanguage {SupportedLanguagesCode}
 * @param supportedLanguages {SupportedLanguagesCode[]}
 * @returns {I18nStore}
 */
export const getI18nStore = (
  defaultLanguage = SupportedLanguagesCode.EN,
  supportedLanguages = SUPPORTED_LANGUAGES
) => {
  i18next.use(LanguageDetector).init({
    resources: supportedResources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false // not needed for svelte as it escapes by default
    },
    detection: {
      order: ['path', 'localStorage'],
      caches: ['localStorage']
    }
  });

  i18next.on('languageChanged', (lng) => {
    changeDesignSystemLocale(lng);
  });

  return createI18nStore(i18next);
};

export const I18N_CTX_KEY = Symbol('i18nContext');
