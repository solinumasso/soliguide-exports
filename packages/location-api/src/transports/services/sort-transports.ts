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
import { Station } from "@soliguide/common";
import { HereTransportStation } from "../interfaces/here-station.interface";
import { HERE_TRANSIT_MODE } from "../constants/HERE_TRANSIT_MODE.const";

export const sortTransports = (stations: HereTransportStation[]): Station[] => {
  const processedStations = new Map<string, Station>();
  const validStations = stations.filter(
    (station) => station?.transports?.length
  );

  for (const station of validStations) {
    const placeName = station.place.name;

    if (!processedStations.has(placeName)) {
      processedStations.set(placeName, {
        place: station.place,
        transports: {},
      });
    }

    const currentStation = processedStations.get(placeName)!;

    for (const transport of station.transports) {
      const mode = HERE_TRANSIT_MODE[transport.mode];
      if (!currentStation.transports[mode]) {
        currentStation.transports[mode] = [];
      }

      const existingTransport = currentStation.transports[mode].find(
        (t) => t.name === transport.name
      );

      if (!existingTransport) {
        currentStation.transports[mode].push({
          name: transport.name,
          color: transport.color,
          textColor: transport.textColor,
          headsign: transport.headsign,
          mode,
        });
      }
    }
  }

  return Array.from(processedStations.values());
};
