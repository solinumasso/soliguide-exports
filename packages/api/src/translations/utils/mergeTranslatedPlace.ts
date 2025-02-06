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
  ApiPlace,
  ServiceTranslatedFieldElement,
  SupportedLanguagesCode,
} from "@soliguide/common";

import dot from "dot-object";

import { PLACE_FIELDS_TO_TRANSLATE } from "../constants";
import { ApiTranslatedPlace } from "../interfaces";
import { logger } from "../../general/logger";

export const convertValue = (value?: string | number) => {
  if (
    value == null || // null or undefined
    !value.toString().trim().length
  ) {
    return null;
  }
  return value.toString().trim();
};

export const mergeTranslatedPlace = (
  place: ApiPlace,
  translatedPlace: ApiTranslatedPlace,
  lang: SupportedLanguagesCode
): ApiPlace => {
  const currentLanguagePlace = translatedPlace.languages[lang];

  if (!currentLanguagePlace) {
    logger.error(
      `No translation found for place ${place.lieu_id} and lang ${lang}`
    );
    return place;
  }
  const translatedPlaceContent = currentLanguagePlace.place;

  // Fields at in the place object root
  for (const field of PLACE_FIELDS_TO_TRANSLATE) {
    if (typeof dot.pick(field, place) !== "undefined") {
      const contentTranslated = convertValue(
        dot.pick(field, translatedPlaceContent)
      );
      const contentOrigin = convertValue(dot.pick(field, place));

      if (contentTranslated) {
        dot.copy(field, field, translatedPlaceContent, place);
      } else if (!contentOrigin) {
        dot.str(field, null, place);
      }
    }
  }

  if (place.services_all) {
    for (let i = 0; i < place.services_all.length; i++) {
      for (const field of Object.values<string>(
        ServiceTranslatedFieldElement
      )) {
        const serviceFieldName = field.replace("service.", "");

        if (dot.pick(serviceFieldName, place.services_all[i])) {
          const contentTranslated = convertValue(
            dot.pick(serviceFieldName, translatedPlaceContent.services_all[i])
          );

          const contentOrigin = convertValue(
            dot.pick(serviceFieldName, place.services_all[i])
          );

          if (contentTranslated) {
            dot.copy(
              serviceFieldName,
              serviceFieldName,
              translatedPlaceContent.services_all[i],
              place.services_all[i]
            );
          } else if (!contentOrigin) {
            dot.str(serviceFieldName, null, place.services_all[i]);
          }
        }
      }
    }
  }

  return place;
};
