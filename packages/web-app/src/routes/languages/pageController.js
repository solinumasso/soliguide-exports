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
import { ALL_SUPPORTED_LANGUAGES_NAME, SupportedLanguagesCode } from '@soliguide/common';
import { EsCt, Fr, Gb, Es, Ir, Ge, Af, Ro, Ru, Ua, Xx } from 'svelte-circle-flags';
import { posthogService } from '$lib/services/posthogService';
import ArabicLanguage from './ArabicLanguage.svelte';

/**
 * @typedef {import('./types').LanguageOption} LanguageOption
 * @typedef {import('./types').PageState} PageState
 * @typedef {import('./types').LanguagePageController} LanguagePageController
 * @typedef {import('$lib/services/types').PosthogProperties} PosthogProperties
 */

/** @type {Record<SupportedLanguagesCode, any>} */
const flagsMap = {
  [SupportedLanguagesCode.FR]: Fr,
  [SupportedLanguagesCode.AR]: ArabicLanguage,
  [SupportedLanguagesCode.CA]: EsCt,
  [SupportedLanguagesCode.EN]: Gb,
  [SupportedLanguagesCode.ES]: Es,
  [SupportedLanguagesCode.FA]: Ir,
  [SupportedLanguagesCode.KA]: Ge,
  [SupportedLanguagesCode.PS]: Af,
  [SupportedLanguagesCode.RO]: Ro,
  [SupportedLanguagesCode.RU]: Ru,
  [SupportedLanguagesCode.UK]: Ua
};

/** @type {PageState} */
const initialState = {
  availableLanguages: [],
  selectedLanguage: null,
  canSubmit: false
};

/**
 * Build options for the page.
 * We show only languages supported by the theme
 * They follow the order of theme's supporter languages,
 * with theme's default language in first place
 * @param supportedLanguages {SupportedLanguagesCode[]}
 * @param defaultLanguage {SupportedLanguagesCode}
 * @returns {LanguageOption[]}
 */
const buildAvailableOptions = (supportedLanguages, defaultLanguage) => {
  return supportedLanguages
    .map((/** @type {SupportedLanguagesCode} */ supportedLanguage) => {
      if (!flagsMap[supportedLanguage]) {
        console.warn('Flag has not been found for lang', supportedLanguage);
      }
      return {
        code: supportedLanguage,
        ...ALL_SUPPORTED_LANGUAGES_NAME[supportedLanguage],
        flag: flagsMap[supportedLanguage] || Xx
      };
    })
    .filter((item) => !!item)
    .reduce((acc, lang) => {
      // Put theme's defaultLanguage in first place
      return lang.code === defaultLanguage ? [lang, ...acc] : [...acc, lang];
    }, /** @type {LanguageOption[]} */ ([]));
};

/**
 * @returns {LanguagePageController}
 */
export const getController = () => {
  /** @type { import('svelte/store').Writable<PageState>} */
  const myPageStore = writable(initialState);

  /** @type {import('./types').LanguagePageController['init']} */
  const init = (supportedLanguages, defaultLanguage) => {
    myPageStore.set({
      ...initialState,
      availableLanguages: buildAvailableOptions(supportedLanguages, defaultLanguage)
    });
  };

  /**
   * Change selected language. If a lang is selected again, it becomes unselected
   * @param lang {SupportedLanguagesCode}
   */
  const changeSelection = (lang) => {
    myPageStore.update((oldState) => {
      const newLang = oldState.selectedLanguage === lang ? null : lang;
      return /** @type {PageState} */ ({
        ...oldState,
        selectedLanguage: newLang,
        canSubmit: !!newLang
      });
    });
  };

  /**
   * Capture an event with a prefix for route context
   * @param {string} eventName The name of the event to capture
   * @param {PosthogProperties} [properties] Optional properties to include with the event
   */
  const captureEvent = (eventName, properties) => {
    posthogService.capture(`languages-${eventName}`, properties);
  };

  return {
    subscribe: myPageStore.subscribe,
    init,
    changeSelection,
    captureEvent
  };
};
