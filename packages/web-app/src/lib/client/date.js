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
/**
 * Format a date like '9 septembre 2024'
 * @param date {string}
 * @param locale {string}
 * @returns {string}
 */
const formatToDateWithFullMonth = (date, locale) => {
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/** Converts hours from "xxxx" to a Date object format
 * @param {string} hour
 * @returns {Date} Formatted hours as a Date object.
 */
const formatStringHoursToDate = (hour) => {
  const hours = parseInt(hour.slice(-4, -2), 10);
  const minutes = parseInt(hour.slice(-2), 10);

  return new Date(new Date().setHours(hours, minutes));
};

/**
 * Format the hours to display
 * @param {string} time
 * @param {string} locale
 * @returns {string} Formatted hours as a string.
 */
const formatOpeningHours = (time, locale) => {
  const timeAsDateObject = formatStringHoursToDate(time);
  const hours = timeAsDateObject.getHours();
  const minutes = timeAsDateObject.getMinutes();

  // French specific format
  if (locale.startsWith('fr')) {
    return minutes > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${hours}h`;
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    ...(timeAsDateObject.getMinutes() ? { minute: '2-digit' } : {})
  });
  return formatter.format(timeAsDateObject);
};

/**
 * @param {import('../models/types').HoursRange[]} range
 * @param {string} locale
 * @returns {import('../models/types').HoursRange[]}
 */
const formatTimeRangeToLocale = (range, locale = 'fr') => {
  return range.map((hour) => {
    return {
      start: formatOpeningHours(hour.start, locale),
      end: formatOpeningHours(hour.end, locale)
    };
  });
};

/**
 * @param {import('../models/types').DaysRange} range
 * @param {string} locale
 * @return {import('../models/types').DaysRange}
 */
const formatDateRangeToLocale = (range, locale = 'fr') => {
  const { start, end } = range;

  return {
    start: new Date(start).toLocaleDateString(locale, { timeZone: 'UTC' }),
    ...(end && { end: new Date(end).toLocaleDateString(locale, { timeZone: 'UTC' }) })
  };
};

/**
 * @param  {import('$lib/models/types').HoursRange[]} hours
 * @param {import('i18next').TFunction} translator
 */
const convertHoursToDisplay = (hours, translator) => {
  return formatTimeRangeToLocale(hours)
    .map((range) => `${translator('OPENING_RANGE', { start: range.start, end: range.end })}`)
    .join(' - ');
};

export {
  formatTimeRangeToLocale,
  formatDateRangeToLocale,
  formatToDateWithFullMonth,
  convertHoursToDisplay
};
