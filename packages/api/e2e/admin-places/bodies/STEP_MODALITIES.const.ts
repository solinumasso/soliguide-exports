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
export const STEP_INFOS_OK = {
  modalities: {
    animal: { checked: true },
    appointment: { checked: false, precisions: null },
    docs: [
      {
        _id: "621a6e9eb65090108d20d22b",
        createdAt: "2022-02-26T18:17:02.192Z",
        encoding: "7bit",
        filename: "test-paris-18168-1645899422164.jpg",
        mimetype: "image/jpeg",
        name: "CHIPS COCA",
        path: "public/docs/621a2ee208aeb31ccb8d185b/test-paris-18168-1645899422164.jpg",
        size: 3498279,
      },
    ],
    inconditionnel: false,
    inscription: { checked: false, precisions: null },
    orientation: {
      checked: true,
      precisions: "Ceci est des modalités d'orientation",
    },
    other: "Il s'agit de petites précisions",
    pmr: { checked: true },
    price: {
      checked: true,
      precisions: "Une participation financière de 40 euros est nécessaire",
    },
  },
};
