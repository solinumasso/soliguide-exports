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
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  PlaceStatus,
  PlaceType,
  Station,
  StopPointMode,
} from "@soliguide/common";
import { TransportService } from "../../services/place-transports.service";
import { Place } from "../../../../models";
import { Subscription } from "rxjs";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBus,
  faCableCar,
  faSubway,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-place-transports",
  templateUrl: "./place-transports.component.html",
  styleUrls: ["./place-transports.component.scss"],
})
export class PlaceTransportsComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  public stations: Station[] = [];

  @Input() public place: Place;

  constructor(private readonly transportService: TransportService) {}

  public readonly transportTypes: { [key in StopPointMode]: IconDefinition } = {
    [StopPointMode.TRAIN]: faTrain,
    [StopPointMode.BUS]: faBus,
    [StopPointMode.TRAMWAY]: faTrain,
    [StopPointMode.CABLE_CAR]: faCableCar,
    [StopPointMode.SUBWAY]: faSubway,
  };

  ngOnInit() {
    if (
      this.place?.placeType === PlaceType.PLACE &&
      this.place?.status === PlaceStatus.ONLINE
    ) {
      this.subscription.add(
        this.transportService
          .getStations(
            this.place.position.location.coordinates[1],
            this.place.position.location.coordinates[0],
            this.place.lieu_id
          )
          .subscribe({
            next: (data: Station[]) => {
              const distanceInMeters = data.map((station) => {
                if (station.place?.distance) {
                  station.place.distance *= 1000;
                }
                return station;
              });
              this.stations = distanceInMeters;
            },
            error: (error) => {
              console.error("Cannot load transports", error);
            },
          })
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
