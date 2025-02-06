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
  ApiPlace,
  FAMILY_DEFAULT_VALUES,
  GENDER_DEFAULT_VALUES,
  OTHER_DEFAULT_VALUES,
  PlaceClosedHolidays,
  PlaceStatus,
  PlaceType,
  PlaceVisibility,
  WelcomedPublics,
  SupportedLanguagesCode,
  CountryCodes,
} from "@soliguide/common";

import { PARCOURS } from "../PARCOURS.mock";
import { SERVICE_FOOD_DISTRIBUTION } from "../SERVICE.mock";

export const ONLINE_ITINERARY: ApiPlace = {
  position: null as any,
  _id: "624af5f6848e6b435cc3e2ea",
  auto: false,
  organizations: [],
  createdBy: "",
  isOpenToday: false,
  createdAt: new Date("2022-04-05T10:20:00.000Z"),
  description: "Un parcours mobile de test",
  entity: {
    mail: "parcours-mobile@test.org",
    phones: [],
  },
  sourceLanguage: SupportedLanguagesCode.FR,
  country: CountryCodes.FR,
  languages: ["fr"],
  lieu_id: 20076,
  modalities: {
    animal: { checked: true },
    appointment: {
      checked: false,
      precisions: null,
    },
    docs: [],
    inconditionnel: true,
    inscription: {
      checked: false,
      precisions: null,
    },
    orientation: {
      checked: false,
      precisions: null,
    },
    other: null,
    pmr: { checked: false },
    price: {
      checked: false,
      precisions: null,
    },
  },
  name: "Un parcours mobile de test",
  newhours: {
    closedHolidays: PlaceClosedHolidays.UNKNOWN,
    description: "",
    friday: {
      open: false,
      timeslot: [],
    },
    monday: {
      open: true,
      timeslot: [
        {
          end: 1930,
          start: 1900,
        },
      ],
    },
    saturday: {
      open: false,
      timeslot: [],
    },
    sunday: {
      open: false,
      timeslot: [],
    },
    thursday: {
      open: false,
      timeslot: [],
    },
    tuesday: {
      open: false,
      timeslot: [],
    },
    wednesday: {
      open: true,
      timeslot: [
        {
          end: 1930,
          start: 1900,
        },
      ],
    },
  },
  parcours: PARCOURS,
  photos: [],
  placeType: PlaceType.ITINERARY,

  priority: false,
  publics: {
    accueil: WelcomedPublics.UNCONDITIONAL,
    administrative: ADMINISTRATIVE_DEFAULT_VALUES,
    age: { max: 99, min: 0 },
    description: null,
    familialle: FAMILY_DEFAULT_VALUES,
    gender: GENDER_DEFAULT_VALUES,
    other: OTHER_DEFAULT_VALUES,
  },
  seo_url: "un-parcours-mobile-de-test-20076",
  services_all: [SERVICE_FOOD_DISTRIBUTION],
  slugs: {
    infos: {
      description: "un parcours mobile de test",
      name: "un parcours mobile de test",
    },
  },
  status: PlaceStatus.ONLINE,
  stepsDone: {
    conditions: true,
    horaires: true,
    infos: true,
    photos: true,
    contacts: true,
    publics: true,
    services: true,
    emplacement: true,
  },
  tempInfos: {
    hours: {
      actif: false,
      dateDebut: null,
      dateFin: null,
      description: null,
      value: {
        description: null,
        friday: {
          open: false,
          timeslot: [],
        },
        monday: {
          open: false,
          timeslot: [],
        },
        saturday: {
          open: false,
          timeslot: [],
        },
        sunday: {
          open: false,
          timeslot: [],
        },
        thursday: {
          open: false,
          timeslot: [],
        },
        tuesday: {
          open: false,
          timeslot: [],
        },
        wednesday: {
          open: false,
          timeslot: [],
        },
      },
    },
    message: {
      actif: false,
      dateDebut: null,
      description: null,
      name: null,
    },
  },
  updatedByUserAt: new Date("2022-04-05T11:36:40.000Z"),
  updatedAt: new Date("2022-04-05T11:36:40.000Z"),
  visibility: PlaceVisibility.ALL,
};
