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
import {
  ADMINISTRATIVE_DEFAULT_VALUES,
  FAMILY_DEFAULT_VALUES,
  GENDER_DEFAULT_VALUES,
  OTHER_DEFAULT_VALUES,
  PUBLICS_LABELS,
  ServiceSaturation,
  WEEK_DAYS,
  WelcomedPublics,
  computePlaceOpeningStatus,
  computeTempIsActive
} from '@soliguide/common';
import { computeTodayInfo, computeAddress, formatTimeslots } from './place';

/**
 * @typedef {import('@soliguide/common').ApiPlace} ApiPlace
 * @typedef {import('@soliguide/common').Categories} Categories
 * @typedef {import('@soliguide/common').CheckAndPrecisions} CheckAndPrecisions
 * @typedef {import('@soliguide/common').Checked} Checked
 * @typedef {import('@soliguide/common').CommonNewPlaceService} CommonNewPlaceService
 * @typedef {import('@soliguide/common').CommonOpeningHours} CommonOpeningHours
 * @typedef {import('@soliguide/common').CommonPlacePosition} Position
 * @typedef {import('@soliguide/common').CountryCodes} CountryCodes
 * @typedef {import('@soliguide/common').DayName} DayName
 * @typedef {import('@soliguide/common').Modalities} Modalities
 * @typedef {import('@soliguide/common').PlaceOpeningStatus} Status
 * @typedef {import('@soliguide/common').PlaceTempInfo} PlaceTempInfo
 * @typedef {import('@soliguide/common').Publics} Publics
 * @typedef {import('@soliguide/common').PublicsAdministrative} PublicsAdministrative
 * @typedef {import('@soliguide/common').PublicsFamily} PublicsFamily
 * @typedef {import('@soliguide/common').PublicsGender} PublicsGender
 * @typedef {import('@soliguide/common').PublicsOther} PublicsOther
 * @typedef {import('./types').PlaceDetails} PlaceDetails
 * @typedef {import('./types').PlaceDetailsInfo} PlaceDetailsInfo
 * @typedef {import('./types').PlaceDetailsInfoType} PlaceDetailsInfoType
 * @typedef {import('./types').PlaceDetailsOpeningHours} PlaceDetailsOpeningHours
 * @typedef {import('./types').Saturation} Saturation
 * @typedef {import('./types').Service} Service
 * @typedef {import('./types').Tag} Tag
 * @typedef {import('./types').TranslatableElement} TranslatableElement
 */

// All types of accesses of a place detail
const placeDetailsInfoType = {
  WELCOME_UNCONDITIONAL_CUSTOM: 'WELCOME_UNCONDITIONAL_CUSTOM',
  WELCOME_UNCONDITIONAL: 'WELCOME_UNCONDITIONAL',
  WELCOME_EXCLUSIVE: 'WELCOME_EXCLUSIVE',
  PUBLICS_MORE_INFO: 'PUBLICS_MORE_INFO',
  ACCESS_ORIENTATION: 'ACCESS_ORIENTATION',
  ACCESS_FREE: 'ACCESS_FREE',
  APPOINTMENT: 'APPOINTMENT',
  REGISTRATION: 'REGISTRATION',
  MODALITIES_MORE_INFO: 'MODALITIES_MORE_INFO',
  PRICE: 'PRICE',
  PMR: 'PMR',
  ANIMALS: 'ANIMALS',
  LANGUAGES_SPOKEN: 'LANGUAGES_SPOKEN'
};

/**
 * Transform all opening hours to a front ready opening hours
 * @param {CommonOpeningHours} hours
 * @param {boolean} allDays
 * @returns {PlaceDetailsOpeningHours}
 */
const buildHours = (hours, allDays) => {
  return WEEK_DAYS.reduce(
    (/** @type {PlaceDetailsOpeningHours} */ acc, /** @type {DayName} */ day) => {
      const hoursToFormat = hours?.[day]?.timeslot ?? [];
      const openingHours = formatTimeslots(hoursToFormat);

      if (!openingHours?.length) {
        return allDays ? { ...acc, [day]: [] } : acc;
      }

      return { ...acc, [day]: openingHours };
    },
    /** @type {PlaceDetailsOpeningHours} */ {}
  );
};

/**
 * Transform all opening hours to a front ready opening hours
 * @param {CommonOpeningHours} hours
 * @param {PlaceTempInfo}  tempInfo
 * @returns {PlaceDetailsOpeningHours}
 */
const buildPlaceDetailsHours = (hours, tempInfo) => {
  const tempHours = tempInfo.hours;

  const isTempHoursActive = computeTempIsActive(tempHours);

  if (isTempHoursActive) {
    return buildHours(tempHours.hours, true);
  }

  return buildHours(hours, true);
};

/**
 * Transform age data to front ready info
 * @param {number} min
 * @param {number} max
 * @returns {TranslatableElement[]}
 */
const buildPublicsAge = (min, max) => {
  if (min === 0 && max === 99) {
    return [];
  } else if (min === 0 && max === 18) {
    return [{ key: 'PUBLICS_AGE_MINORS' }];
  } else if (min === 18 && max === 99) {
    return [{ key: 'PUBLICS_AGE_MAJORS' }];
  } else if (min === 0) {
    return [{ key: 'PUBLICS_AGE_TO_XX_MAX', params: { max: max.toString() } }];
  } else if (max === 99) {
    return [{ key: 'PUBLICS_AGE_FROM_XX', params: { min: min.toString() } }];
  }

  return [{ key: 'PUBLICS_AGE_RANGE', params: { min: min.toString(), max: max.toString() } }];
};

/**
 * Transform specific publics to front ready info
 * @template { PublicsGender | PublicsAdministrative | PublicsFamily | PublicsOther } T
 * @param { Array<T>} publics
 * @param { Array<T>} publicsFull
 * @param { { [key in T]: String} } publicToDisplay
 * @returns {TranslatableElement[]}
 */
const buildSpecificPublics = (publics, publicsFull, publicToDisplay) => {
  if (publics.length === publicsFull.length) {
    return [];
  }

  return publics.map((singlePublic) => {
    return { key: publicToDisplay[singlePublic].toUpperCase() };
  });
};

/**
 * Transform publics to front ready info
 * @param {Publics} publics
 * @returns {PlaceDetailsInfo[]}
 */
const buildPublics = (publics) => {
  /** @type {Record<WelcomedPublics,  PlaceDetailsInfoType>} */
  const WELCOME_TO_TITLE_MAPPING = {
    [WelcomedPublics.UNCONDITIONAL]: placeDetailsInfoType.WELCOME_UNCONDITIONAL,
    [WelcomedPublics.PREFERENTIAL]: placeDetailsInfoType.WELCOME_UNCONDITIONAL_CUSTOM,
    [WelcomedPublics.EXCLUSIVE]: placeDetailsInfoType.WELCOME_EXCLUSIVE
  };

  const description =
    publics.accueil === WelcomedPublics.UNCONDITIONAL
      ? []
      : [
          ...buildSpecificPublics(publics.gender, GENDER_DEFAULT_VALUES, PUBLICS_LABELS.gender),
          ...buildPublicsAge(publics.age.min, publics.age.max),
          ...buildSpecificPublics(
            publics.administrative,
            ADMINISTRATIVE_DEFAULT_VALUES,
            PUBLICS_LABELS.administrative
          ),
          ...buildSpecificPublics(
            publics.familialle,
            FAMILY_DEFAULT_VALUES,
            PUBLICS_LABELS.familialle
          ),
          ...buildSpecificPublics(publics.other, OTHER_DEFAULT_VALUES, PUBLICS_LABELS.other)
        ];

  return [
    { type: WELCOME_TO_TITLE_MAPPING[publics.accueil], tags: [], description },
    ...(publics.description
      ? [
          {
            type: placeDetailsInfoType.PUBLICS_MORE_INFO,
            tags: [],
            description: [{ key: publics.description }]
          }
        ]
      : [])
  ];
};

/**
 * Transform modalities types without precisions to front ready info
 * @param {Checked} modalityType
 * @param {PlaceDetailsInfoType} type
 * @returns {PlaceDetailsInfo[]}
 */
const buildSpecificModalitiesType = (modalityType, type) => {
  if (modalityType?.checked) {
    return [
      {
        type,
        tags: [],
        description: []
      }
    ];
  }

  return [];
};

/**
 * Transform modalities types with precisions to front ready info
 * @param {CheckAndPrecisions} modalityType
 * @param {PlaceDetailsInfoType} type
 * @returns {PlaceDetailsInfo[]}
 */
const buildSpecificModalitiesTypeWithPrecisions = (modalityType, type) => {
  if (modalityType.checked) {
    return [
      {
        type,
        tags: [],
        description: modalityType.precisions ? [{ key: modalityType.precisions }] : []
      }
    ];
  }

  return [];
};

/**
 * Transform modalities to front ready info
 * @param {Modalities} modalities
 * @returns {PlaceDetailsInfo[]}
 */
const buildModalities = (modalities) => {
  /** @type {PlaceDetailsInfo[]} */
  const modalitiesType = modalities.inconditionnel
    ? [{ type: placeDetailsInfoType.ACCESS_FREE, tags: [], description: [] }]
    : [
        ...buildSpecificModalitiesTypeWithPrecisions(
          modalities.orientation,
          placeDetailsInfoType.ACCESS_ORIENTATION
        ),
        ...buildSpecificModalitiesTypeWithPrecisions(
          modalities.appointment,
          placeDetailsInfoType.APPOINTMENT
        ),
        ...buildSpecificModalitiesTypeWithPrecisions(
          modalities.inscription,
          placeDetailsInfoType.REGISTRATION
        )
      ];

  const modalitiesMoreInfo = modalities.other
    ? [
        {
          type: placeDetailsInfoType.MODALITIES_MORE_INFO,
          tags: [],
          description: [{ key: modalities.other }]
        }
      ]
    : [];

  return [
    ...modalitiesType,
    ...modalitiesMoreInfo,
    ...buildSpecificModalitiesTypeWithPrecisions(modalities.price, placeDetailsInfoType.PRICE),
    ...buildSpecificModalitiesType(modalities.pmr, placeDetailsInfoType.PMR),
    ...buildSpecificModalitiesType(modalities.animal, placeDetailsInfoType.ANIMALS)
  ];
};

/**
 * Transform publics and modalities to front ready info
 * @param {string[]} language
 * @returns {PlaceDetailsInfo[]}
 */
const buildSpokenLanguages = (language) => {
  return language?.length
    ? [
        {
          type: placeDetailsInfoType.LANGUAGES_SPOKEN,
          tags: [],
          description: language.map((lang) => {
            return { key: `LANGUE_${lang.toUpperCase()}` };
          })
        }
      ]
    : [];
};

/**
 * Transform publics, modalities, spoken languages and specific services to front ready info
 * @param {ApiPlace} place
 * @returns {PlaceDetailsInfo[]}
 */
const buildPlaceDetailsInfo = (place) => {
  return [
    ...buildPublics(place.publics),
    ...buildModalities(place.modalities),
    ...buildSpokenLanguages(place.languages)
  ];
};

/**
 * Transform services hours to front ready info
 * @param {CommonNewPlaceService} service
 * @returns {{hours?: PlaceDetailsOpeningHours}}
 */
const buildServiceHours = (service) => {
  if (service.differentHours) {
    return { hours: buildHours(service.hours, false) };
  }

  return {};
};

/**
 * Transform services info to front ready info
 * @param {CommonNewPlaceService} service
 * @returns {PlaceDetailsInfo[]}
 */
const buildServiceInfo = (service) => {
  return [
    ...(service.differentPublics ? buildPublics(service.publics) : []),
    ...(service.differentModalities ? buildModalities(service.modalities) : [])
  ];
};

/**
 * Transform services saturation to front ready info
 * @param {CommonNewPlaceService} service
 * @returns {{saturation?: Saturation}}
 */
const buildServiceSaturation = (service) => {
  if (service.saturated.status === ServiceSaturation.HIGH) {
    return {
      saturation: { tag: { value: `SATURATION_${ServiceSaturation.HIGH}`, variant: 'error' } }
    };
  } else if (service.saturated.status === ServiceSaturation.MODERATE) {
    return {
      saturation: { tag: { value: `SATURATION_${ServiceSaturation.MODERATE}`, variant: 'warning' } }
    };
  }

  return {};
};

/**
 * Transform services to front ready info
 * @param {CommonNewPlaceService[]} services
 * @returns {Service[]}
 */
const buildServices = (services) => {
  return services.map((service) => ({
    category: /** @type {Categories} */ (service.category),
    description: service.description ?? '',
    ...buildServiceHours(service),
    info: buildServiceInfo(service),
    ...buildServiceSaturation(service)
  }));
};

/**
 * Transform a place sent by the API to a front ready place
 * @param {ApiPlace} placeResult
 * @returns {PlaceDetails}
 */
const buildPlaceDetails = (placeResult) => {
  const status = computePlaceOpeningStatus(placeResult);

  const onOrientation = !!placeResult.modalities.orientation.checked;

  /** @type PlaceDetails */
  return {
    id: placeResult.lieu_id,
    address: computeAddress(placeResult.position, onOrientation),
    description: placeResult.description ?? '',
    email: placeResult.entity.mail ?? '',
    facebook: placeResult.entity.facebook ?? '',
    fax: placeResult.entity.fax ?? '',
    hours: buildPlaceDetailsHours(placeResult.newhours, placeResult.tempInfos),
    info: buildPlaceDetailsInfo(placeResult),
    instagram: placeResult.entity.instagram ?? '',
    lastUpdate: new Date(placeResult.updatedByUserAt).toISOString(),
    name: placeResult.name,
    onOrientation: !!placeResult.modalities.orientation.checked,
    phones: [...placeResult.entity.phones],
    services: buildServices(placeResult.services_all),
    status: computePlaceOpeningStatus(placeResult),
    todayInfo: computeTodayInfo(placeResult, status),
    website: placeResult.entity.website ?? ''
  };
};

export { buildPlaceDetails, placeDetailsInfoType };
