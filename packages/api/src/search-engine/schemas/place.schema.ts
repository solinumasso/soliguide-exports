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
import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const placeSchema: Omit<CollectionCreateSchema, "name"> = {
  enable_nested_fields: true,
  fields: [
    {
      name: "lieu_id",
      type: "int32",
      facet: true,
    },
    {
      name: "seo_url",
      type: "string",
    },

    {
      name: "name",
      type: "string",
    },
    {
      name: "description",
      type: "string",
      optional: true,
    },

    {
      name: "status",
      type: "string",
      facet: true,
    },
    {
      name: "visibility",
      type: "string",
      facet: true,
    },

    {
      name: "priority",
      type: "bool",
      facet: true,
    },
    {
      name: "is_open_today",
      type: "bool",
      facet: true,
    },
    {
      name: "languages",
      type: "string[]",
      facet: true,
    },
    {
      // The falttened version used for queries
      name: "access_conditions.unconditional",
      type: "bool",
      facet: true,
    },
    {
      name: "access_conditions.appointment",
      type: "bool",
      facet: true,
    },
    {
      name: "access_conditions.registration",
      type: "bool",
      facet: true,
    },
    {
      name: "access_conditions.orientation",
      type: "bool",
      facet: true,
    },
    {
      name: "access_conditions.price",
      type: "bool",
      facet: true,
      optional: true,
    },
    {
      name: "access_conditions.animal",
      type: "bool",
      facet: true,
      optional: true,
    },
    {
      name: "access_conditions.person_with_reduced_mobility",
      type: "bool",
      facet: true,
      optional: true,
    },

    {
      name: "coordinates",
      type: "geopoint",
      optional: true,
    },
    // TODO: remove if it's not necessary
    // {
    //   // Object with adresse, complementAdresse etc. Not searchable
    //   name: "position",
    //   type: "object",
    //   index: false,
    //   // It's not really optional but if we do not index it we cannot mark it as required
    //   optional: true,
    // },
    {
      name: "address",
      type: "string",
      optional: true,
    },
    {
      name: "additional_information",
      type: "string",
      optional: true,
    },
    {
      name: "city",
      type: "string",
      optional: true,
    },
    {
      name: "city_code",
      type: "string",
      optional: true,
    },
    {
      name: "postal_code",
      type: "string",
      optional: true,
    },
    {
      name: "department",
      type: "string",
      optional: true,
    },
    {
      name: "department_code",
      type: "string",
      facet: true,
      optional: true,
    },
    {
      name: "region",
      type: "string",
      optional: true,
    },
    {
      name: "region_code",
      type: "string",
      facet: true,
      optional: true,
    },
    {
      name: "country",
      type: "string",
      facet: true,
      optional: true,
    },
    {
      name: "time_zone",
      type: "string",
      facet: true,
      optional: true,
    },

    {
      name: "publics_welcomed",
      type: "int32",
      facet: true,
    },
    {
      name: "publics_administrative_situation",
      type: "string[]",
      facet: true,
    },
    {
      name: "age.min",
      type: "int32",
      facet: true,
    },
    {
      name: "age.max",
      type: "int32",
      facet: true,
    },
    {
      name: "publics_family_situation",
      type: "string[]",
      facet: true,
    },
    {
      name: "publics_gender",
      type: "string[]",
      facet: true,
    },
    {
      name: "publics_other",
      type: "string[]",
      facet: true,
    },
  ],
};
