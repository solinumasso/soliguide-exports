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
import {
  ApiPlace,
  CommonPlaceEntity,
  CommonPlacePosition,
} from "@soliguide/common";

export class WidgetPlace implements Partial<ApiPlace> {
  public _id: string;
  public lieu_id: number;
  public seo_url: string;

  public name: string;
  public entity: Pick<CommonPlaceEntity, "phones">;

  public position: CommonPlacePosition;
  public distance?: number;

  public isOpenToday: boolean;

  constructor(place?: Partial<WidgetPlace>) {
    this._id = place?._id ?? "";
    this.lieu_id = typeof place?.lieu_id === "number" ? place.lieu_id : 0;
    this.seo_url = place?.seo_url ?? "";

    this.name = place?.name ?? "";
    this.entity = place?.entity ?? { phones: [] };

    this.isOpenToday = place?.isOpenToday ?? true;

    this.position = place?.position
      ? new CommonPlacePosition(place.position)
      : new CommonPlacePosition();
    this.distance =
      typeof place?.distance === "number" ? place.distance : undefined;
  }
}
