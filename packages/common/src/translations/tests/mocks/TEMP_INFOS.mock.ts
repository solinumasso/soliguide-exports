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
export const TEMP_INFOS_MOCK = {
  closure: {
    actif: true,
    dateDebut: new Date("2022-09-15T00:00:00.000Z"),
    dateFin: new Date("2022-12-31T23:59:59.999Z"),
    description:
      "<ul><li>Mercredi 21/09 après-midi</li><li>Mercredi 12/10 après-midi</li><li>Mercredi 26/10 après-midi</li><li>Lundi 01/11 journée</li><li>Mercredi 09/11 après-midi</li><li>Vendredi 11/11 journée</li><li>Mercredi 23/11 après-midi</li><li>Mercredi 30/11 après-midi</li><li>Mercredi 14/12 après-midi</li><li>Mercredi 21/12 après-midi</li><li>Dimanche 25/12 journée</li></ul>",
  },
  hours: {
    actif: true,
    dateDebut: new Date("2022-06-01T00:00:00.000Z"),
    dateFin: new Date("2022-12-31T23:59:59.999Z"),
    description: null,
    hours: {
      closedHolidays: "UNKOWN",
      description: null,
      friday: {
        open: false,
        timeslot: [],
      },
      monday: {
        open: false,
        timeslot: [],
      },
      saturday: {
        open: false,
        timeslot: [],
      },
      sunday: {
        open: false,
        timeslot: [],
      },
      thursday: {
        open: false,
        timeslot: [],
      },
      tuesday: {
        open: false,
        timeslot: [],
      },
      wednesday: {
        open: false,
        timeslot: [],
      },
    },
  },
  message: {
    actif: true,
    dateDebut: new Date("2022-07-01T00:00:00.000Z"),
    dateFin: null,
    description: "<p>L'association ALIZEP a été dissoute.</p>",
    name: "Fermeture définitive",
  },
};
