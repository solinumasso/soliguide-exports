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
import { ApiProperty } from "@nestjs/swagger";
import {
  Station,
  TransportPlace,
  StopPoint,
  StopPointMode,
} from "@soliguide/common";

export class TransportPlaceRef implements TransportPlace {
  @ApiProperty({
    description: "Unique identifier of the station",
    example: "84618_45667",
  })
  id: string;

  @ApiProperty({
    description: "Name of the station/stop",
    example: "Porte de Paris",
  })
  name: string;

  @ApiProperty({
    description: "Place type",
    example: "station",
  })
  type: string;

  @ApiProperty({
    description: "Wheelchair accessibility status",
    example: "yes",
  })
  wheelchairAccessible: string;

  @ApiProperty({
    description: "Station coordinates",
    example: { lat: 48.930081, lng: 2.355434 },
  })
  location: { lat: number; lng: number };
}

export class StopPointRef implements StopPoint {
  @ApiProperty({
    description: "Line number or name",
    example: "253",
  })
  name: string;

  @ApiProperty({
    description: "Line color in hexadecimal format",
    example: "#FFBE00",
  })
  color: string;

  @ApiProperty({
    description: "Text color in hexadecimal format",
    example: "#000000",
  })
  textColor: string;

  @ApiProperty({
    description: "Line direction/terminus",
    example: "La Courneuve - Aubervilliers RER",
  })
  headsign: string;

  @ApiProperty({
    description: "Transport mode",
    example: "BUS",
  })
  mode: StopPointMode;
}

export class StationRef implements Station {
  @ApiProperty({
    type: () => TransportPlaceRef,
    description: "Station location information with optional distance",
  })
  place: TransportPlace & {
    distance?: number;
  };

  @ApiProperty({
    description: "Available transports by mode",
    type: "object",
    additionalProperties: {
      type: "array",
    },
    example: {
      BUS: [
        {
          name: "253",
          color: "#FFBE00",
          textColor: "#000000",
          headsign: "La Courneuve - Aubervilliers RER",
          mode: "BUS",
        },
      ],
    },
  })
  transports: Record<string, StopPoint[]>;
}
