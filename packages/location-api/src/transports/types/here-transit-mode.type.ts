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
// Doc: https://www.here.com/docs/bundle/intermodal-routing-api-developer-guide/page/concepts/modes.html

export type HereTransitMode =
  | "highSpeedTrain" //	High-speed trains
  | "intercityTrain" //	Intercity/EuroCity trains
  | "interRegionalTrain" //	Inter-regional and fast trains
  | "regionalTrain" //	Regional and other trains
  | "cityTrain" //	City trains
  | "bus" //	Buses
  | "ferry" //	Boats/Ferries
  | "subway" //	Metros/Subways
  | "lightRail" //	Trams
  | "privateBus" //	Ordered services/Taxis
  | "inclined" //	Inclined/Funiculars
  | "aerial" //	Aerials/Cable cars
  | "busRapid" //	Rapid buses
  | "monorail" //	Monorails
  | "flight" //	Airplanes
  | "walk" //	Walk
  | "car" //	Car
  | "bicycle"; //	Bicycle
