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
import { describe, it, expect } from 'vitest';
import { formatTimeRangeToLocale, formatDateRangeToLocale } from './date';

describe('formatTimeRangeToLocale', () => {
  it("should format start and end time in 'fr' locale", () => {
    const range = [{ start: '1200', end: '1300' }];
    const result = formatTimeRangeToLocale(range, 'fr');

    expect(result).toEqual([{ start: '12h', end: '13h' }]);
  });

  it("should format start and end time in 'en' locale with AM/PM", () => {
    const range = [{ start: '0900', end: '1730' }];
    const result = formatTimeRangeToLocale(range, 'en');

    expect(result).toEqual([{ start: '9 AM', end: '5:30 PM' }]);
  });

  it('should handle multiple time ranges', () => {
    const range = [
      { start: '012000', end: '2200' },
      { start: '1300', end: '1700' }
    ];
    const result = formatTimeRangeToLocale(range, 'fr');

    expect(result).toEqual([
      { start: '20h', end: '22h' },
      { start: '13h', end: '17h' }
    ]);
  });
});

it('should handle multiple time ranges', () => {
  const range = [
    { start: '800', end: '1200' },
    { start: '1300', end: '1700' }
  ];
  const result = formatTimeRangeToLocale(range, 'fr');

  expect(result).toEqual([
    { start: '8h', end: '12h' },
    { start: '13h', end: '17h' }
  ]);
});

describe('formatDateRangeToLocale', () => {
  it("should format dates in 'fr' locale", () => {
    const range = {
      start: '2024-10-15T00:00:00.000Z',
      end: '2024-12-25T00:00:00.000Z'
    };
    const result = formatDateRangeToLocale(range, 'fr');

    expect(result).toEqual({
      start: '15/10/2024',
      end: '25/12/2024'
    });
  });

  it("should format dates in 'en' locale", () => {
    const range = {
      start: '2024-10-15T00:00:00.000Z',
      end: '2024-12-25T00:00:00.000Z'
    };
    const result = formatDateRangeToLocale(range, 'en');

    expect(result).toEqual({
      start: '10/15/2024',
      end: '12/25/2024'
    });
  });
});
