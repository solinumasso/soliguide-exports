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
import { CountryCodes } from "@soliguide/common";
import { WidgetPlace } from "../classes";

export const DEFAULT_WIDGET_PLACE = new WidgetPlace({
  _id: "default-place-id",
  lieu_id: 0,
  seo_url: "default-place-seo-url",
  name: "Nom du lieu",
  entity: {
    phones: [
      {
        label: null,
        phoneNumber: "0606060606",
        countryCode: CountryCodes.FR,
        isSpecialPhoneNumber: false,
      },
    ],
  },
  position: {
    complementAdresse: null,
    address: "21 rue des Dames, 75017 Paris",
    adresse: "21 rue des Dames, 75017 Paris",
    codePostal: "75017",
    postalCode: "75017",
    cityCode: "75117",
    department: "Paris",
    departement: "Paris",
    city: "Paris",
    ville: "Paris",
    departmentCode: "75",
    departementCode: "75",
    location: {
      coordinates: [2.3247446268353475, 48.884793024789374],
      type: "Point",
    },
    country: CountryCodes.FR,
    pays: CountryCodes.FR,
    region: "Île-de-France",
    regionCode: "11",
    timeZone: "Europe/Paris",
  },
  distance: 3.5,
  isOpenToday: true,
});
