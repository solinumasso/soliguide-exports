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
  Categories,
  CountryCodes,
  PlaceClosedHolidays,
  PlaceOpeningStatus
} from '@soliguide/common';

export const searchParamsMock = {
  location: 'Paris',
  category: 'day_hosting',
  lang: 'fr',
  latitude: '48.8566',
  longitude: '2.3522',
  type: 'position',
  label: '19 Rue Santeuil, 75005 Paris'
};

/** @type{import('$lib/models/types').SearchResult} */
export const searchResultMock = {
  nbResults: 3,
  places: [
    {
      id: 169,
      seoUrl: 'camions-des-restos-du-coeur-salpetriere-paris-169',
      name: 'Restos du Coeur - Camion de Paris 5e',
      address: '2 Quai Saint-Bernard, 75005 Paris',
      distance: -1,
      services: [Categories.FOOD_DISTRIBUTION],
      phones: [],
      status: PlaceOpeningStatus.OPEN,
      todayInfo: { openingHours: [] },
      banners: {
        message: {
          start: new Date('2024-06-24T00:00:00.000Z'),
          end: new Date('2024-07-26T23:59:59.000Z'),
          description:
            "<p>Le camion Austerlitz sera<strong> déplacé au 49 boulevard de l'Hôpital dans le 13ème arrondissement, du 24 juin 2024 au 25 juillet 2024 inclus. </strong>Réouverture prévue le 26 août 2024 sur le site habituel au jardin Tino Rossi.&nbsp;</p>",
          name: "Attention : changement d'adresse du 24 juin 2024 au 25 juillet 2024 en raison des Jeux Olympiques"
        },
        orientation: false,
        holidays: PlaceClosedHolidays.UNKNOWN
      }
    },
    {
      id: 34120,
      seoUrl: 'restaurant-emeraude-europe-copie-paris-34120',
      name: 'Restaurant Emeraude Ave Maria',
      address: "4 Rue de l'Ave Maria, 75004 Paris",
      distance: -1,
      services: [Categories.FOOD_DISTRIBUTION],
      phones: [
        {
          label: null,
          phoneNumber: '01 48 87 67 39',
          countryCode: 'fr',
          isSpecialPhoneNumber: false
        }
      ],
      status: PlaceOpeningStatus.OPEN,
      todayInfo: {
        openingHours: [
          {
            end: '1315',
            start: '1200'
          }
        ]
      },
      banners: {
        message: null,
        orientation: false,
        holidays: PlaceClosedHolidays.UNKNOWN
      }
    },
    {
      id: 26287,
      seoUrl: 'co-p1-solidarites-etudiantes-copie-paris-26287',
      name: 'Cop1 - Solidarités Étudiantes Paris 5',
      address: '19 Rue Santeuil, 75005 Paris',
      distance: -1,
      services: [Categories.FOOD_DISTRIBUTION, Categories.ACTIVITIES],
      phones: [],
      status: PlaceOpeningStatus.TEMPORARILY_CLOSED,
      todayInfo: {
        closingDays: {
          start: '2024-07-14T00:00:00.000Z',
          end: ''
        }
      },
      banners: {
        message: null,
        orientation: false,
        holidays: PlaceClosedHolidays.UNKNOWN
      }
    },
    {
      id: 154,
      seoUrl: 'soupe-saint-eustache-paris-154',
      name: 'Soupe Saint-Eustache',
      status: PlaceOpeningStatus.TEMPORARILY_CLOSED,
      todayInfo: {
        closingDays: { end: '2024-11-30T23:59:59.000Z', start: '2024-04-01T00:00:00.000Z' }
      },
      address: '1 Rue Montmartre, 75001 Paris',
      distance: 478.42644975047216,
      services: [Categories.ACTIVITIES],
      phones: [
        {
          label: '',
          phoneNumber: '01 42 36 31 05',
          countryCode: CountryCodes.FR,
          isSpecialPhoneNumber: false
        }
      ],
      banners: { message: null, orientation: false, holidays: PlaceClosedHolidays.UNKNOWN }
    }
  ]
};

/** @type {import('$lib/models/types').PlaceDetails} */
export const placeDetailsMock = {
  id: 154,
  address: '1 Rue Montmartre, 75001 Paris',
  description:
    "<p>Repas complets servis sur le parvis de l'église Saint-Eustache. Il est conseillé d'arriver en avance.</p><p><strong>Attention : il s'agit d'un dispositif hivernal qui commence le 1er décembre et qui finit le 31 mars.</strong></p>",
  email: 'lasoupe@saint-eustache.org',
  facebook: '',
  fax: '',
  hours: {
    monday: [
      {
        start: '1930',
        end: '2015'
      }
    ],
    tuesday: [
      {
        start: '1930',
        end: '2015'
      }
    ],
    wednesday: [
      {
        start: '1930',
        end: '2015'
      }
    ],
    thursday: [
      {
        start: '1930',
        end: '2015'
      }
    ],
    friday: [
      {
        start: '1930',
        end: '2015'
      }
    ],
    saturday: [
      {
        start: '1930',
        end: '2015'
      }
    ],
    sunday: [
      {
        start: '1930',
        end: '2015'
      }
    ]
  },
  info: [],
  instagram: '',
  lastUpdate: '2024-06-11T15:27:13.409Z',
  name: 'Soupe Saint-Eustache',
  onOrientation: false,
  phones: [
    {
      label: '',
      phoneNumber: '01 42 36 31 05',
      countryCode: CountryCodes.FR,
      isSpecialPhoneNumber: false
    }
  ],
  services: [],
  status: PlaceOpeningStatus.OPEN,
  todayInfo: {
    openingHours: [
      {
        start: '1930',
        end: '2015'
      }
    ]
  },
  website: 'http://www.soupesainteustache.fr'
};

/** @param searchService {import('$lib/services/types').PlacesService} */
export const fakePlacesService = (error = '') => {
  /**
   * @param params {import('$lib/services/types').SearchParams}
   * @param options {import('$lib/services/types').SearchOptions}
   * @returns {Promise<import('$lib/models/types').SearchResult>}
   */
  // eslint-disable-next-line no-unused-vars
  const searchPlaces = (params, options) => {
    if (error) {
      return Promise.reject(new Error(error));
    }

    return Promise.resolve(searchResultMock);
  };

  /**
   * @param params {import('./types').PlaceDetailsParams}
   * @returns {Promise<import('$lib/models/types').PlaceDetails>}
   */
  // eslint-disable-next-line no-unused-vars
  const placeDetails = ({ lang, identifier }) => {
    if (error) {
      return Promise.reject(new Error(error));
    }

    return Promise.resolve(placeDetailsMock);
  };

  return { searchPlaces, placeDetails };
};
