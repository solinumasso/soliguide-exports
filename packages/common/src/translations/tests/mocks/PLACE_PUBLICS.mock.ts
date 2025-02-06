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
  Publics,
  PublicsAdministrative,
  PublicsFamily,
  WelcomedPublics,
} from "../../../publics";
import { SupportedLanguagesCode } from "../../enums";

export interface PlacePublicsMock {
  lieu_id: number;
  publics: Publics;
  expectedResults: {
    [key in SupportedLanguagesCode]: string;
  };
  name: string;
}

export const PLACE_PUBLICS_MOCK: PlacePublicsMock[] = [
  {
    expectedResults: {
      ar: "ترحيب خاص: الكبار, الناس المعزولون, أزواج.",
      ca: "Adreçat només a col·lectius específics: adults, persones aïllades, parelles.",
      en: "Exclusive welcome: adults, isolated people, couples.",
      es: "Bienvenida exclusiva: adultos, personas aisladas, parejas.",
      fa: "استقبال انحصاری: بزرگسالان, افراد منزوی, زوج ها.",
      fr: "Accueil exclusif: personnes majeures, personnes isolées, couples.",
      ka: "Ექსკლუზიური მისალმება: მოზარდები, იზოლირებული ხალხი, წყვილები.",
      ps: "ځانګړې ښه راغلاست: لویان, جلا شوي خلک, جوړه.",
      ro: "Bun venit exclusiv: adultii, oameni izolați, cupluri.",
      ru: "Эксклюзивное приветствие: взрослые люди, изолированные люди, пары.",
      uk: "Ексклюзивний прийом: дорослі, ізольовані люди, пари.",
    },
    lieu_id: 21,
    name: "Accueil exclusif personnes majeures, personnes isolées, couples. - ESI La maison dans la rue",
    publics: {
      accueil: WelcomedPublics.EXCLUSIVE,
      administrative: ADMINISTRATIVE_DEFAULT_VALUES,
      age: {
        max: 99,
        min: 18,
      },
      description: null,
      familialle: [PublicsFamily.isolated, PublicsFamily.couple],
      gender: GENDER_DEFAULT_VALUES,
      other: [],
    },
  },
  {
    expectedResults: {
      ar: "ترحيب خاص: في وضع عادي.",
      ca: "Adreçat només a col·lectius específics: en situació regular.",
      en: "Exclusive welcome: in a regular situation.",
      es: "Bienvenida exclusiva: en una situación regular.",
      fa: "استقبال انحصاری: در یک وضعیت منظم.",
      fr: "Accueil exclusif: en situation régulière.",
      ka: "Ექსკლუზიური მისალმება: რეგულარულ სიტუაციაში.",
      ps: "ځانګړې ښه راغلاست: په منظم حالت کې.",
      ro: "Bun venit exclusiv: în situație obișnuită.",
      ru: "Эксклюзивное приветствие: в обычной ситуации.",
      uk: "Ексклюзивний прийом: у штатному стані.",
    },
    lieu_id: 300,
    name: "Accueil exclusif en situation régulière. - Service Social de Proximité (SSP) du 18ème ",
    publics: {
      accueil: WelcomedPublics.EXCLUSIVE,
      administrative: [PublicsAdministrative.regular],
      age: {
        max: 99,
        min: 0,
      },
      description: null,
      familialle: FAMILY_DEFAULT_VALUES,
      gender: GENDER_DEFAULT_VALUES,
      other: [],
    },
  },
  {
    expectedResults: {
      ar: "ترحيب غير مشروط",
      ca: "Adreçat a tothom",
      en: "Unconditional welcome",
      es: "Bienvenida incondicional",
      fa: "استقبال بی قید و شرط",
      fr: "Accueil inconditionnel",
      ka: "უპირობო მისალმება",
      ps: "غیر مشروط ښه راغلاست",
      ro: "Bun venit neconditionat",
      ru: "Безоговорочный прием",
      uk: "Беззастережний прийом",
    },
    lieu_id: 30,
    name: "Accueil inconditionnel : Bus Abri",
    publics: {
      accueil: WelcomedPublics.UNCONDITIONAL,
      administrative: ADMINISTRATIVE_DEFAULT_VALUES,
      age: {
        max: 99,
        min: 0,
      },
      description: null,
      familialle: FAMILY_DEFAULT_VALUES,
      gender: GENDER_DEFAULT_VALUES,
      other: OTHER_DEFAULT_VALUES,
    },
  },
];
