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

import { HereTransportStation } from "../interfaces/here-station.interface";

export const FRENCH_STOP_POINT_MOCK: {
  stations: HereTransportStation[];
} = {
  stations: [
    {
      place: {
        name: "Porte de Paris",
        type: "station",
        location: {
          lat: 48.930081,
          lng: 2.355434,
        },
        wheelchairAccessible: "yes",
        id: "84618_45667",
      },
      transports: [
        {
          mode: "bus",
          name: "253",
          color: "#FFBE00",
          textColor: "#000000",
          headsign: "La Courneuve - Aubervilliers RER",
        },
        {
          mode: "bus",
          name: "255",
          color: "#6E6E00",
          textColor: "#FFFFFF",
          headsign: "Porte de Clignancourt",
        },
        {
          mode: "bus",
          name: "255",
          color: "#6E6E00",
          textColor: "#FFFFFF",
          headsign: "Porte de Paris",
        },
        {
          mode: "bus",
          name: "N143",
          color: "#5191CD",
          textColor: "#FFFFFF",
          headsign: "Gare de Roissypole Aéroport CDG 1",
        },
        {
          mode: "bus",
          name: "N143",
          color: "#5191CD",
          textColor: "#FFFFFF",
          headsign: "Paris Gare de l'Est",
        },
        {
          mode: "bus",
          name: "N44",
          color: "#82DC73",
          textColor: "#000000",
          headsign: "Gare de l'Est",
        },
      ],
    },
    {
      place: {
        name: "Porte de Paris - Stade de France",
        type: "station",
        location: {
          lat: 48.929296,
          lng: 2.35674,
        },
        wheelchairAccessible: "yes",
        id: "84618_45696",
      },
      transports: [
        {
          mode: "bus",
          name: "170",
          color: "#82C8E6",
          textColor: "#000000",
          headsign: "Porte des Lilas",
        },
        {
          mode: "bus",
          name: "353",
          color: "#D2D200",
          textColor: "#000000",
          headsign: "Saint-Denis - Université",
        },
      ],
    },
    {
      place: {
        name: "Porte de Paris - Stade de France",
        type: "station",
        location: {
          lat: 48.928919,
          lng: 2.356786,
        },
        wheelchairAccessible: "yes",
        id: "84618_44037",
      },
      transports: [
        {
          mode: "bus",
          name: "153",
          color: "#00643C",
          textColor: "#FFFFFF",
          headsign: "Cité Floréal",
        },
        {
          mode: "bus",
          name: "153",
          color: "#00643C",
          textColor: "#FFFFFF",
          headsign: "Moulin Neuf",
        },
        {
          mode: "bus",
          name: "239",
          color: "#A0006E",
          textColor: "#FFFFFF",
          headsign: "Porte de Paris - Stade de France",
        },
        {
          mode: "bus",
          name: "255",
          color: "#6E6E00",
          textColor: "#FFFFFF",
          headsign: "Les Prévoyants",
        },
        {
          mode: "bus",
          name: "N44",
          color: "#82DC73",
          textColor: "#000000",
          headsign: "Garges-Sarcelles RER",
        },
        {
          mode: "bus",
          name: "N44",
          color: "#82DC73",
          textColor: "#000000",
          headsign: "Roger Sémat",
        },
      ],
    },
    {
      place: {
        name: "Porte de Paris - Stade de France",
        type: "station",
        location: {
          lat: 48.929748,
          lng: 2.357076,
        },
        wheelchairAccessible: "yes",
        id: "84618_50712",
      },
      transports: [
        {
          mode: "bus",
          name: "153",
          color: "#00643C",
          textColor: "#FFFFFF",
          headsign: "Porte de Paris - Stade de France",
        },
        {
          mode: "bus",
          name: "153",
          color: "#00643C",
          textColor: "#FFFFFF",
          headsign: "Porte de la Chapelle",
        },
        {
          mode: "bus",
          name: "170",
          color: "#82C8E6",
          textColor: "#000000",
          headsign: "Gare de Saint-Denis RER",
        },
        {
          mode: "bus",
          name: "239",
          color: "#A0006E",
          textColor: "#FFFFFF",
          headsign: "Rosa Parks - Curial",
        },
        {
          mode: "bus",
          name: "253",
          color: "#FFBE00",
          textColor: "#000000",
          headsign: "Moulin Neuf",
        },
        {
          mode: "bus",
          name: "353",
          color: "#D2D200",
          textColor: "#000000",
          headsign: "ZAC Landy Nord",
        },
      ],
    },
    {
      place: {
        name: "Saint-Denis - Porte de Paris",
        type: "station",
        location: {
          lat: 48.929509,
          lng: 2.357754,
        },
        id: "84618_68376",
      },
      transports: [
        {
          mode: "subway",
          name: "13",
          color: "#6EC4E8",
          textColor: "#000000",
          headsign: "Châtillon Montrouge",
        },
        {
          mode: "subway",
          name: "13",
          color: "#6EC4E8",
          textColor: "#000000",
          headsign: "Saint-Denis-Université",
        },
        {
          mode: "lightRail",
          name: "T8",
          color: "#837902",
          textColor: "#000000",
          headsign: "Saint-Denis - Porte de Paris",
        },
        {
          mode: "lightRail",
          name: "T8",
          color: "#837902",
          textColor: "#000000",
          headsign: "Villetaneuse-Université",
        },
        {
          mode: "lightRail",
          name: "T8",
          color: "#837902",
          textColor: "#000000",
          headsign: "Épinay - Orgemont",
        },
      ],
    },
  ],
};
