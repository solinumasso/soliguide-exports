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
import { DEFAULT_SERVICES_TO_EXCLUDE } from "@soliguide/common";

export const DEFAULT_PLACES_TO_EXCLUDE_FOR_SEARCH = {
  $or: [
    { "services_all.1": { $exists: false } },
    {
      "services_all.1.category": { $in: DEFAULT_SERVICES_TO_EXCLUDE },
      "services_all.2": { $exists: false },
    },
  ],
  "services_all.0.category": { $in: DEFAULT_SERVICES_TO_EXCLUDE },
};

export const DEFAULT_PLACES_TO_INCLUDE_FOR_SEARCH = {
  $or: [
    {
      $or: [
        { "services_all.1.category": { $nin: DEFAULT_SERVICES_TO_EXCLUDE } },
        { "services_all.2": { $exists: true } },
      ],
      "services_all.1": { $exists: true },
    },
    { "services_all.0.category": { $nin: DEFAULT_SERVICES_TO_EXCLUDE } },
  ],
};
