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

import { DayName, WEEK_DAYS } from "../../dates";
import { PlaceOpeningStatus, PlaceStatus } from "../enums";
import { ApiPlace } from "../interfaces";
import { computeTempIsActive } from "./computeTempIsActive";

export const computePlaceOpeningStatus = (
  place: Pick<
    ApiPlace,
    "services_all" | "status" | "isOpenToday" | "newhours" | "tempInfos"
  >
): PlaceOpeningStatus => {
  // Statuses priority
  // 'open' > 'partiallyOpen' > 'temporarilyClosed' > 'closed' > 'unknown'

  if (!place.tempInfos || !place.newhours) {
    return PlaceOpeningStatus.UNKNOWN;
  }

  // Compute if an temporary closure is active today
  const duringTempClosurePeriod = computeTempIsActive(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    place.tempInfos.closure as unknown as any
  );

  if (
    place.status === PlaceStatus.ONLINE &&
    place.isOpenToday &&
    !duringTempClosurePeriod
  ) {
    return PlaceOpeningStatus.OPEN;
  }

  // Partially open:
  const closedWithOpenServices =
    !place.isOpenToday &&
    place.services_all.some((service) => service.isOpenToday);

  const hasOpeningHours = place.newhours
    ? Object.keys(place.newhours).some((key) => {
        return (
          WEEK_DAYS.find((day) => day === key) &&
          place.newhours[key as DayName].open
        );
      })
    : false;

  if (hasOpeningHours && closedWithOpenServices && !duringTempClosurePeriod) {
    return PlaceOpeningStatus.PARTIALLY_OPEN;
  }

  if (duringTempClosurePeriod) {
    return PlaceOpeningStatus.TEMPORARILY_CLOSED;
  }

  if (
    !place.isOpenToday &&
    hasOpeningHours &&
    place.status === PlaceStatus.ONLINE &&
    !closedWithOpenServices
  ) {
    return PlaceOpeningStatus.CLOSED;
  }

  return PlaceOpeningStatus.UNKNOWN;
};
