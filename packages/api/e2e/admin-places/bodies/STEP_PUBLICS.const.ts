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
  PublicsAdministrative,
  PublicsGender,
  PublicsOther,
  SupportedLanguagesCode,
  WelcomedPublics,
} from "@soliguide/common";

export const STEP_PUBLICS_OK = {
  EXCLUSIVE: {
    languages: [SupportedLanguagesCode.FR, "lsf"],
    publics: {
      accueil: WelcomedPublics.EXCLUSIVE,
      administrative: [PublicsAdministrative.regular],
      age: { max: 99, min: 18 },
      description: "Adultes masculins",
      familialle: FAMILY_DEFAULT_VALUES,
      gender: [PublicsGender.men],
      other: [PublicsOther.lgbt, PublicsOther.hiv, PublicsOther.prostitution],
    },
  },
  UNCONDITIONAL: {
    languages: [SupportedLanguagesCode.FR, "lsf"],
    publics: {
      accueil: WelcomedPublics.UNCONDITIONAL,
      administrative: ADMINISTRATIVE_DEFAULT_VALUES,
      age: { max: 99, min: 0 },
      description: "Tout le monde est le bienvenu",
      familialle: FAMILY_DEFAULT_VALUES,
      gender: GENDER_DEFAULT_VALUES,
      other: OTHER_DEFAULT_VALUES,
    },
  },
  PREFERENTIAL: {
    languages: [
      SupportedLanguagesCode.FR,
      SupportedLanguagesCode.EN,
      SupportedLanguagesCode.RU,
      SupportedLanguagesCode.AR,
      "lsf",
    ],
    publics: {
      accueil: WelcomedPublics.PREFERENTIAL,
      administrative: [
        PublicsAdministrative.undocumented,
        PublicsAdministrative.refugee,
      ],
      age: { max: 99, min: 18 },
      description: "Jeunes femmes en difficulté, majeures uniquement",
      familialle: FAMILY_DEFAULT_VALUES,
      gender: [PublicsGender.women],
      other: [],
    },
  },
};
