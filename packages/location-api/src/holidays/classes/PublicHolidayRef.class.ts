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
import { PublicHoliday, SupportedLanguagesCode } from "@soliguide/common";

export class PublicHolidayRef implements PublicHoliday {
  @ApiProperty({
    description: "Indicates if the holiday is national or regional",
    example: true,
  })
  isNational: boolean;

  @ApiProperty({
    description: "Name of the holiday in default language",
    example: "Jour de l'An",
  })
  name: string;

  @ApiProperty({
    description: "List of department codes where this holiday is observed",
    example: ["75", "92", "93", "94"],
    type: [String],
  })
  departments: string[];

  @ApiProperty({
    description: "Start date of the holiday in ISO format",
    example: "2024-01-01",
  })
  startDate: string;

  @ApiProperty({
    description: "End date of the holiday in ISO format",
    example: "2024-01-01",
  })
  endDate: string;

  @ApiProperty({
    description: "Holiday name translations in different languages",
    example: {
      en: "New Year's Day",
      fr: "Jour de l'An",
      es: "Año Nuevo",
    },
  })
  translations: {
    [key in SupportedLanguagesCode]?: string;
  };
}
