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
export const STEP_SOURCES_OK = {
  source: {
    name: "restos",
    id: "111a1aa1-11a1-1111-11aa-1aa111a1aa11",
    url: "url.com",
    license: "license.com",
    isOrigin: true,
  },
};

export const STEP_SOURCES2_OK = {
  source: {
    name: "dora",
    id: "222b2bb2-22b2-2222-22bb-2bb222b2bb22",
    isOrigin: false,
  },
};

export const STEP_SOURCES_FAIL = {
  source: {
    name: "thats not a valid source",
    id: "valid id though",
  },
};
