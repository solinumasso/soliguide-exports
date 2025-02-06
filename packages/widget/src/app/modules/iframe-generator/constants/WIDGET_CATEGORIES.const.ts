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
import { Categories } from "@soliguide/common";

export const WIDGET_CATEGORIES: Record<
  string,
  { title: string; subtitle?: string; categories: Categories[] }
> = {
  ACTIVITIES: {
    title: "FIND_ACTIVITIES",
    categories: [Categories.ACTIVITIES],
  },
  ADVICE: {
    title: "GET_ADVISED",
    subtitle: "ADVISING_EXAMPLE",
    categories: [
      Categories.ACCESS_TO_HOUSING,
      Categories.PUBLIC_WRITER,
      Categories.DISABILITY_ADVICE,
      Categories.ADMINISTRATIVE_ASSISTANCE,
      Categories.PARENT_ASSISTANCE,
    ],
  },
  ANIMAL: {
    title: "FOR_MY_ANIMALS",
    categories: [Categories.ANIMAL_ASSITANCE],
  },
  CLOTHING: {
    title: "DRESS_MYSELF",
    categories: [Categories.SOLIDARITY_STORE, Categories.CLOTHING],
  },
  DIGITAL_ACCESS: {
    title: "ACCESS_TO_DIGITAL_EQUIPMENTS",
    categories: [Categories.DIGITAL_TOOLS_TRAINING, Categories.TECHNOLOGY],
  },
  DOMICILIATION: {
    title: "FIND_HOUSING",
    categories: [Categories.DOMICILIATION],
  },
  FOOD: {
    title: "GET_FOOD_DRINK",
    categories: [Categories.FOOD],
  },
  FRENCH_COURSES: {
    title: "FIND_FRENCH_CLASSES",
    categories: [Categories.JOB_COACHING],
  },
  HEALTHCARE: {
    title: "GET_HEALED",
    categories: [Categories.HEALTH],
  },
  HYGIENE: {
    title: "GET_HYGIENE_ACCESS",
    categories: [Categories.HYGIENE_AND_WELLNESS],
  },
  LEGAL_ASSISTANCE: {
    title: "GET_LEGAL_ASSISTANCE",
    categories: [Categories.LEGAL_ADVICE, Categories.ADMINISTRATIVE_ASSISTANCE],
  },
  PROFESSIONAL_TRAINING: {
    title: "FIND_FORMATION_JOB",
    categories: [Categories.TRAINING_AND_JOBS],
  },
  SHELTER: {
    title: "FIND_SHELTER",
    categories: [
      Categories.DAY_HOSTING,
      Categories.REST_AREA,
      Categories.BABYSITTING,
      Categories.FAMILY_AREA,
    ],
  },
  SOCIAL_SUPPORT: {
    title: "GET_SOCIAL_SUPPORT",
    categories: [Categories.SOCIAL_ACCOMPANIMENT],
  },
  TRANSPORT: {
    title: "MOVE",
    categories: [Categories.MOBILITY],
  },
};
