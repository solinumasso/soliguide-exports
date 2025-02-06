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
import { getTodayName } from "../../_utils/functions/dates/date.functions";
import { findPlacesByParams } from "../../place/services/place.service";

export const getPlaceOpenedAndClosed = async (): Promise<any[]> => {
  const now = new Date();
  const todayName = getTodayName(now);
  const hour = now.getHours();

  const requestOpened = {
    isOpenToday: true,
    $or: [
      {
        ["newhours." + todayName + ".timeslot"]: {
          $elemMatch: {
            start: {
              $lte: hour * 100,
            },
            end: {
              $gte: hour * 100,
            },
          },
        },
        $or: [
          {
            "tempInfos.hours.actif": false,
          },
          {
            "tempInfos.hours.actif": true,
            "tempInfos.hours.dateDebut": { $gt: now },
          },
        ],
      },
      {
        ["tempInfos.hours.hour." + todayName + ".timeslot"]: {
          $elemMatch: {
            start: {
              $lte: hour * 100,
            },
            end: {
              $gte: hour * 100,
            },
          },
        },
        "tempInfos.hours.actif": true,
        "tempInfos.hours.dateDebut": { $lte: now },
      },
    ],
  };

  const placesOpened = await findPlacesByParams(requestOpened);

  const requestClosed = {
    isOpenToday: true,
    lieu_id: { $nin: placesOpened.map((place: any) => place.lieu_id) },
  };

  const placesClosed = await findPlacesByParams(requestClosed);

  return [placesOpened, placesClosed];
};
