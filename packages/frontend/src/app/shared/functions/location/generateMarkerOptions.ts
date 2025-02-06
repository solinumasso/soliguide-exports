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
import { CommonPlacePosition, PlaceType } from "@soliguide/common";
import { Place, PlaceParcours, MarkerOptions } from "../../../models";
import { User } from "../../../modules/users/classes";

const getMarker = (
  item: Place,
  position: CommonPlacePosition,
  markerCounter: number
): MarkerOptions => {
  return {
    lng: position.location.coordinates[0],
    lat: position.location.coordinates[1],
    options: {
      id: item.lieu_id,
      title: item.name,
      icon: {
        url: `../../../../../assets/images/maps/${markerCounter}.png`,
        scaledSize: {
          width: 23,
          height: 32,
        },
      },
    },
  };
};

export const generateMarkerOptions = (
  places: Place[],
  me: User | null
): MarkerOptions[] => {
  const markers: MarkerOptions[] = [];

  let markerCounter = 1;

  places.forEach((item: Place) => {
    if (item.placeType === PlaceType.ITINERARY) {
      item.parcours.forEach((pointPassage: PlaceParcours) => {
        markers.push(getMarker(item, pointPassage.position, markerCounter));
        markerCounter++;
      });
    } else {
      if (me?.admin || me?.pro || !item.modalities.orientation.checked) {
        markers.push(getMarker(item, item.position, markerCounter));
      }
      markerCounter++;
    }
  });
  return markers;
};
