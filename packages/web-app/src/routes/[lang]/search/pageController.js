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
import { get, writable } from 'svelte/store';
import { debounce, DEFAULT_DEBOUNCE_DELAY } from '@soliguide/design-system';
import { CountryCodes, SupportedLanguagesCode } from '@soliguide/common';
import { posthogService } from '$lib/services/posthogService';

const SEARCH_LOCATION_MINIMUM_CHARS = 3;

export const PAGE_CONTROLLER_CTX_KEY = Symbol('pageControllerContext');
/**
 * Enum describing the current step of the search form
 * @type {Record<string, symbol>} */
export const steps = {
  STEP_LOCATION: Symbol('searchLocationStep'),
  STEP_CATEGORY: Symbol('searchCategoryStep'),
  HOME: Symbol('home')
};

/**
 * Enum describing the controlled focus possibilities of the page
 * @type {Record<string, symbol>} */
export const focus = {
  FOCUS_NONE: Symbol('focusNone'),
  FOCUS_LOCATION: Symbol('focusLocationInput'),
  FOCUS_CATEGORY: Symbol('focusCategoryInput')
};

/**
 * Enum describing the location search errors
 * @type {Record<string, symbol>} */
export const locationErrors = {
  NONE: Symbol('none'),
  NO_RESULTS: Symbol('noResults'),
  ERROR_SERVER: Symbol('errorServer')
};

/**
 * Enum describing the categories search errors
 * @type {Record<string, symbol>} */
export const categorieErrors = {
  NONE: Symbol('none'),
  NO_RESULTS: Symbol('noResults'),
  ERROR_SERVER: Symbol('errorServer')
};

/**
 * Shorthand
 * @typedef {import('./types').PageState} PageState
 * @typedef {import('./types').SearchPageParams} SearchPageParams
 * @typedef {import('./types').PageOptions} PageOptions
 * @typedef {import('$lib/models/types').CategorySuggestion} CategorySuggestion
 * @typedef {import('$lib/models/types').LocationSuggestion} LocationSuggestion
 * @typedef {import('$lib/services/types').PosthogProperties} PosthogProperties
 * @typedef {import('@soliguide/common').Categories} Categories
 */

/** @type {PageState} */
const initialState = {
  country: CountryCodes.FR,
  lang: SupportedLanguagesCode.FR,
  currentStep: steps.STEP_LOCATION,
  locationSuggestions: [],
  selectedLocationSuggestion: null,
  locationLabel: '',
  locationSuggestionError: locationErrors.NONE,
  currentPositionError: null,
  categorySuggestions: [],
  selectedCategory: null,
  categorySuggestionError: null,
  searchParams: null,
  focus: focus.FOCUS_LOCATION,
  // Full page loading at init
  loading: false,
  loadingLocationSuggestions: false,
  loadingCategorySuggestions: false,
  loadingGeolocation: false
};

/**
 * Capture an event with a prefix for route context
 * @param {string} eventName The name of the event to capture
 * @param {PosthogProperties} [properties] Optional properties to include with the event
 */
const captureEvent = (eventName, properties) => {
  posthogService.capture(`search-page-${eventName}`, properties);
};

/**
 * @param locationService {import('$lib/services/types').LocationService}
 * @param categoryService {import('$lib/services/types').CategoryService}
 * @returns {import('./types').SearchPageController}
 */
export const getSearchPageController = (locationService, categoryService) => {
  /** @type { import('svelte/store').Writable<PageState>} */
  const myPageStore = writable(initialState);

  const searchLocationSuggestions = async (/** @type {string} */ search) => {
    try {
      const result = await locationService.getLocationSuggestions(get(myPageStore).country, search);
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            locationSuggestions: result,
            locationSuggestionError:
              result.length === 0 ? locationErrors.NO_RESULTS : locationErrors.NONE
          })
      );
    } catch {
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            locationSuggestionError: locationErrors.ERROR_SERVER,
            locationSuggestions: []
          })
      );
    } finally {
      myPageStore.update(
        (oldValue) => /** @type {PageState} */ ({ ...oldValue, loadingLocationSuggestions: false })
      );
    }
  };

  /** Location-api is called with a 300ms debounce */
  const getDebouncedLocationSuggestions = debounce(
    searchLocationSuggestions,
    DEFAULT_DEBOUNCE_DELAY
  );

  /**
   * Ask for suggestions corresponding to the search term
   * @param searchTerm {string}
   */
  const getLocationSuggestions = (searchTerm) => {
    myPageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          loadingLocationSuggestions: true,
          locationSuggestionError: null,
          currentPositionError: null,
          locationLabel: searchTerm,
          locationSuggestions:
            searchTerm.length < SEARCH_LOCATION_MINIMUM_CHARS ? [] : oldValue.locationSuggestions
        })
    );

    // Do nothing unless the search term has at least 3 characters
    if (searchTerm.length >= SEARCH_LOCATION_MINIMUM_CHARS) {
      getDebouncedLocationSuggestions(searchTerm);
      captureEvent('search-term', { searchTerm });
    } else {
      myPageStore.update(
        (oldValue) => /** @type {PageState} */ ({ ...oldValue, loadingLocationSuggestions: false })
      );
    }
  };

  /**
   * Determine position then find the corresponding location
   * @param getGeolocation {() => Promise<GeolocationPosition>}
   * @returns {Promise<void>}
   */
  const useCurrentLocation = async (getGeolocation) => {
    try {
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            currentPositionError: null,
            locationSuggestionError: null,
            loadingGeolocation: true
          })
      );

      const {
        coords: { latitude, longitude }
      } = await getGeolocation();

      const result = await locationService.getLocationFromPosition(
        get(myPageStore).country,
        latitude,
        longitude
      );

      // We update the suggestions based on the geolocation
      searchLocationSuggestions(result?.suggestionLabel ?? '');

      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            selectedLocationSuggestion: result,
            locationLabel: result?.suggestionLabel,
            currentStep: result ? steps.STEP_CATEGORY : steps.STEP_LOCATION,
            // Previous category errors are removed if we go to the page
            categorySuggestionError: result ? null : oldValue.categorySuggestionError
          })
      );
      captureEvent('my-position', { position: { latitude, longitude } });
    } catch (error) {
      const msg = error instanceof Error ? error.message : error;
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            currentPositionError: msg,
            selectedLocationSuggestion: null
          })
      );
    } finally {
      myPageStore.update(
        (oldValue) => /** @type {PageState} */ ({ ...oldValue, loadingGeolocation: false })
      );
    }
  };

  /**
   * We build search params only when all the data needed is valid
   * @param locationSelection {import('$lib/models/types').LocationSuggestion | null}
   * @param categorySelection {import('@soliguide/common').Categories | null}
   * @returns {SearchPageParams | null}
   */
  const buildSearchParams = (locationSelection = null, categorySelection = null) => {
    if (locationSelection !== null && categorySelection !== null) {
      const [latitude, longitude] = locationSelection.coordinates;
      return {
        lang: get(myPageStore).lang,
        location: locationSelection.geoValue,
        // Need to convert to string to be usable into URLSearchParams
        latitude: String(latitude),
        longitude: String(longitude),
        type: locationSelection.geoType,
        label: locationSelection.suggestionLabel,
        category: categorySelection
      };
    }
    return null;
  };

  /** @type {(locationSuggestion: import('$lib/models/types').LocationSuggestion | null) => void} */
  const selectLocationSuggestion = (locationSuggestion) => {
    myPageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          selectedLocationSuggestion: locationSuggestion,
          locationLabel: locationSuggestion?.suggestionLabel,
          currentStep:
            oldValue.selectedCategory === null ? steps.STEP_CATEGORY : steps.STEP_LOCATION,
          searchParams: buildSearchParams(locationSuggestion, oldValue.selectedCategory),
          locationSuggestionError: null,
          currentPositionError: null,
          categorySuggestionError: null,
          focus: focus.FOCUS_CATEGORY
        })
    );

    // Get new results based on the label of the selected suggestion
    searchLocationSuggestions(locationSuggestion?.suggestionLabel ?? '');
  };

  /**
   * Location input is cleared: erase suggestions and selected value
   * @type {() => void} */
  const clearLocation = () => {
    myPageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          selectedLocationSuggestion: null,
          locationSuggestions: [],
          locationLabel: '',
          currentStep: steps.STEP_LOCATION,
          searchParams: buildSearchParams(),
          currentPositionError: null,
          locationSuggestionError: null
        })
    );
  };

  /**
   * Go to previous step. It is always searchLocationStep
   * @type {() => void} */
  const goToPreviousStep = () => {
    myPageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          currentStep: steps.STEP_LOCATION,
          focus: focus.FOCUS_LOCATION
        })
    );
  };

  const getPreviousStep = () =>
    get(myPageStore).currentStep === steps.STEP_CATEGORY ? steps.STEP_LOCATION : steps.HOME;

  const editLocation = () => {
    captureEvent('modify-location');
    if (get(myPageStore).currentStep === steps.STEP_CATEGORY) {
      goToPreviousStep();
    }
  };

  /**
   * Get information about location based on the locationLabel param
   * Then we retrieve the previously selected item via its geoValue
   * @param locationLabel {string}
   * @param geoValue {string}
   * @returns {Promise<{suggestions: LocationSuggestion[], selection: LocationSuggestion | null, error: any}>}
   */
  const getLocationInfoFromParam = async (locationLabel, geoValue) => {
    try {
      const suggestions = await locationService.getLocationSuggestions(
        get(myPageStore).country,
        locationLabel
      );
      const selection = suggestions.find((suggestion) => suggestion.geoValue === geoValue) ?? null;
      return { suggestions, selection, error: null };
    } catch (error) {
      return { suggestions: [], selection: null, error };
    }
  };

  /**
   * Get information about categories based on the param (supposed to be a Categories object)
   * @param category {string}
   * @returns {Promise<{suggestions: Categories[], selection: Categories | null, error: any}>}
   */
  const getCategoryInfoFromParam = async (category) => {
    try {
      const suggestions = /** @type {Categories[]} */ (
        await categoryService.getCategorySuggestions(category)
      );
      const selection = suggestions.find((suggestion) => suggestion === category) ?? null;
      return { suggestions, selection, error: null };
    } catch (error) {
      return { suggestions: [], selection: null, error };
    }
  };

  /**
   * Init controller: if a location and a category are provided,
   * the controller is initialized on categories page with proper selections and suggestions set
   * - the location is searched and the result matching the geoValue is used
   * - the category is validated
   * In case of failure, controller is init with default empty value
   * @param country {import('@soliguide/common').SoliguideCountries}
   * @param lang {import('@soliguide/common').SupportedLanguagesCode}
   * @param options {PageOptions}
   */
  const init = async (country, lang, { geoValue, label, category } = {}) => {
    myPageStore.set({ ...initialState, country, lang });
    if (geoValue && label && category) {
      myPageStore.set({ ...initialState, loading: true });
      const locationInfo = await getLocationInfoFromParam(label, geoValue);
      const categoryInfo = await getCategoryInfoFromParam(category);

      // Stay on step 1 if there is an error or an option needs to be selected
      const step =
        locationInfo.error || !locationInfo.selection ? steps.STEP_LOCATION : steps.STEP_CATEGORY;

      myPageStore.set({
        ...initialState,
        country,
        lang,
        currentStep: step,
        locationSuggestions: locationInfo.suggestions,
        selectedLocationSuggestion: locationInfo.selection,
        locationLabel: locationInfo.selection?.suggestionLabel ?? '',
        locationSuggestionError: locationInfo.error,
        categorySuggestions: categoryInfo.suggestions,
        selectedCategory: categoryInfo.selection,
        categorySuggestionError: categoryInfo.error,
        focus: focus.FOCUS_NONE,
        loading: false
      });
    }
  };

  /** @type {(categorySuggestion: import('@soliguide/common').Categories) => void} */
  const selectCategorySuggestion = (categorySuggestion) => {
    if (get(myPageStore).currentStep === steps.STEP_CATEGORY) {
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            selectedCategory: categorySuggestion,
            searchParams: buildSearchParams(oldValue.selectedLocationSuggestion, categorySuggestion)
          })
      );
    }
  };

  /** api is called with a 300ms debounce */
  const getDebouncedCategorySuggestions = debounce(async (/** @type {string} */ search) => {
    try {
      const result = await categoryService.getCategorySuggestions(search);
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            categorySuggestions: result,
            categorySuggestionError:
              result.length === 0 ? categorieErrors.NO_RESULTS : categorieErrors.NONE
          })
      );
    } catch {
      myPageStore.update(
        (oldValue) =>
          /** @type {PageState} */ ({
            ...oldValue,
            categorySuggestionError: categorieErrors.ERROR_SERVER,
            categorySuggestions: []
          })
      );
    } finally {
      myPageStore.update(
        (oldValue) => /** @type {PageState} */ ({ ...oldValue, loadingCategorySuggestions: false })
      );
    }
  }, DEFAULT_DEBOUNCE_DELAY);
  /**
   *
   * @param searchTerm {string}
   */
  const getCategorySuggestions = (searchTerm) => {
    // Cannot do that on location step
    if (get(myPageStore).currentStep === steps.STEP_LOCATION) {
      return;
    }
    myPageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          categorySuggestionError: null,
          loadingCategorySuggestions: true,
          categorySuggestions: searchTerm.length === 0 ? [] : oldValue.categorySuggestions
        })
    );

    // Do nothing unless the search term has at least 3 characters
    if (searchTerm.length > 0) {
      getDebouncedCategorySuggestions(searchTerm);
    } else {
      myPageStore.update(
        (oldValue) => /** @type {PageState} */ ({ ...oldValue, loadingCategorySuggestions: false })
      );
    }
  };

  /**
   * Category input is cleared
   */
  const clearCategory = () => {
    myPageStore.update(
      (oldValue) =>
        /** @type {PageState} */ ({
          ...oldValue,
          selectedCategory: null,
          categorySuggestions: [],
          searchParams: buildSearchParams(),
          categorySuggestionError: null
        })
    );
  };

  return {
    subscribe: myPageStore.subscribe,
    getLocationSuggestions,
    useCurrentLocation,
    selectLocationSuggestion,
    clearLocation,
    goToPreviousStep,
    editLocation,
    init,
    getPreviousStep,
    selectCategorySuggestion,
    getCategorySuggestions,
    clearCategory,
    captureEvent
  };
};
