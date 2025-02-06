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
import { PlaceOpeningStatus, computeTempIsActive } from '@soliguide/common';

/**
 * @typedef {import('@soliguide/common').ApiPlace} ApiPlace
 * @typedef {import('@soliguide/common').CommonTimeslot} CommonTimeslot
 * @typedef {import('@soliguide/common').DayName} DayName
 * @typedef {import('@soliguide/common').CommonPlacePosition} Position
 * @typedef {import('./types').TodayInfo} TodayInfo
 * @typedef {import('./types').HoursRange} HoursRange
 */

/**
 * Calculates the complete address to display
 * @param position {Position}
 * @param onOrientation {boolean}
 * @returns {string}
 */
export const computeAddress = (position, onOrientation) => {
  if (onOrientation) {
    return `${position.postalCode}, ${position.city}`;
  } else if (position.additionalInformation) {
    return `${position.address} - ${position.additionalInformation}`;
  }
  return position.address;
};

/**
 * Converts timeslots to formatted hours ranges
 * @param {CommonTimeslot[]} timeslots
 * @returns {HoursRange[]}
 */
export const formatTimeslots = (timeslots = []) =>
  timeslots.map(({ start, end }) => ({
    start: String(start).padStart(4, '0'),
    end: String(end).padStart(4, '0')
  }));

/**
 * Calculates opening hours: date interval, hour interval or nothing
 * @param {ApiPlace} place
 * @param {PlaceOpeningStatus} status
 * @param { DayName } dayToCheck
 * @returns {TodayInfo}
 */
export const computeTodayInfo = (
  place,
  status,
  dayToCheck = /** @type {DayName} */ (
    new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase()
  )
) => {
  if (status === PlaceOpeningStatus.CLOSED || status === PlaceOpeningStatus.UNKNOWN) {
    return {};
  }

  // [TODO] handle partiallyOpen case
  if (status === PlaceOpeningStatus.OPEN || status === PlaceOpeningStatus.PARTIALLY_OPEN) {
    const isTempHoursActive = computeTempIsActive(place.tempInfos.hours);

    if (isTempHoursActive) {
      return {
        openingHours: formatTimeslots(place.tempInfos.hours?.hours?.[dayToCheck]?.timeslot ?? [])
      };
    }

    return {
      openingHours: formatTimeslots(place.newhours?.[dayToCheck]?.timeslot ?? [])
    };
  }

  // closingDays can have just a start date without an end date
  if (place.tempInfos.closure.actif) {
    const start = new Date(place.tempInfos.closure.dateDebut).toISOString();

    return {
      closingDays: place.tempInfos.closure.dateFin
        ? {
            start,
            end: new Date(place.tempInfos.closure.dateFin).toISOString()
          }
        : {
            start
          }
    };
  }
  return {};
};
