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
import { Factory } from "interface-forge";
import { faker as fakerFR } from "@faker-js/faker/locale/fr";

import {
  SUPPORTED_LANGUAGES,
  AnyDepartmentCode,
  CountryCodes,
  FR_REGION_CODES,
  FR_TIMEZONES,
  PlaceStatus,
  PlaceVisibility,
  PublicsAdministrative,
  PublicsFamily,
  PublicsGender,
  PublicsOther,
  WelcomedPublics,
} from "@soliguide/common";

import type { TypesensePlaceDocument } from "../../src/search-engine/documents";

export const typesensePlaceDocumentBuilder =
  new Factory<TypesensePlaceDocument>((factory, iterator) => {
    const name = factory.lorem.sentence();

    const address = fakerFR.location.streetAddress();
    const additionalInformation = fakerFR.location.secondaryAddress();
    const city = fakerFR.location.city();
    const cityCode = fakerFR.location.zipCode();
    const department = factory.lorem.words({ min: 1, max: 3 });
    const departmentCode = `${cityCode[0]}${cityCode[1]}` as AnyDepartmentCode;
    const postalCode = fakerFR.location.zipCode();
    const region = fakerFR.location.state();
    const regionCode = factory.helpers.arrayElement(FR_REGION_CODES);
    const country: CountryCodes = CountryCodes.FR;
    const timeZone = fakerFR.helpers.arrayElement(FR_TIMEZONES);

    const ageMin = factory.number.int({ min: 0, max: 88 });
    const ageMax = factory.number.int({ min: ageMin + 1, max: 99 });
    return {
      id: factory.string.uuid(),
      lieu_id: iterator,
      seo_url: factory.helpers.slugify(`${name}-${iterator}`),

      name,
      description: factory.lorem.paragraph(),

      status: factory.helpers.enumValue(PlaceStatus),
      visibility: factory.helpers.enumValue(PlaceVisibility),

      priority: factory.datatype.boolean(),
      is_open_today: factory.datatype.boolean(),
      languages: factory.helpers.arrayElements(SUPPORTED_LANGUAGES),
      // TODO: something a bit more random of course
      access_conditions: {
        unconditional: true,
        appointment: false,
        registration: false,
        orientation: false,
      },

      coordinates: factory.datatype.boolean()
        ? [factory.location.latitude(), factory.location.longitude()]
        : undefined,
      address,
      additional_information: additionalInformation,
      city,
      city_code: cityCode,
      postal_code: postalCode,
      department,
      department_code: departmentCode,
      region,
      region_code: regionCode,
      country,
      time_zone: timeZone,

      publics_welcomed: factory.helpers.enumValue(WelcomedPublics),
      publics_administrative_situation: factory.helpers.uniqueArray(
        Object.values(PublicsAdministrative),
        factory.number.int({
          min: 1,
          max: Object.values(PublicsAdministrative).length,
        })
      ),
      age: {
        min: ageMin,
        max: ageMax,
      },
      publics_family_situation: factory.helpers.uniqueArray(
        Object.values(PublicsFamily),
        factory.number.int({
          min: 1,
          max: Object.values(PublicsFamily).length,
        })
      ),
      publics_gender: factory.helpers.uniqueArray(
        Object.values(PublicsGender),
        factory.number.int({
          min: 1,
          max: Object.values(PublicsGender).length,
        })
      ),
      publics_other: factory.helpers.uniqueArray(
        Object.values(PublicsOther),
        factory.number.int({
          min: 0,
          max: Object.values(PublicsOther).length,
        })
      ),
    };
  });
