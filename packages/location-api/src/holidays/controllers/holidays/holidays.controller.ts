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
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Query,
  Res,
  UsePipes,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import type { FastifyReply } from "fastify";

import {
  type SoliguideCountries,
  PublicHoliday,
  SOLIGUIDE_COUNTRIES,
} from "@soliguide/common";

import {
  ParsePostalCodePipe,
  ValidateCountryPipe,
} from "../../../location/pipes";
import { CacheManagerService } from "../../../cache-manager/services/cache-manager.service";
import { CachePrefix } from "../../../cache-manager/enums";
import { PublicHolidaysService } from "../../services/public-holidays.service";
import { ParseDateQueryPipe } from "../../../location/pipes/ParseDateQuery.pipe";
import { PublicHolidayRef } from "../../classes/PublicHolidayRef.class";

@ApiTags("soliguide-holidays")
@UsePipes(new ValidateCountryPipe())
@Controller("holidays/:country")
export class HolidaysController {
  private readonly logger = new Logger(HolidaysController.name);

  constructor(
    private readonly cacheManagerService: CacheManagerService,
    private readonly publicHolidaysService: PublicHolidaysService
  ) {}

  @Get(":date")
  @ApiOperation({
    summary: "Check if a date is a day holiday for a postal code",
  })
  @ApiResponse({
    status: 200,
    type: PublicHolidayRef,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request",
  })
  @ApiParam({
    name: "country",
    required: true,
    type: String,
    enum: SOLIGUIDE_COUNTRIES,
  })
  @ApiParam({
    name: "date",
    description: "Date (yyyy-MM-dd)",
    required: true,
    type: String,
    example: "2024-12-25",
  })
  @ApiQuery({
    name: "postalCode",
    required: false,
    type: String,
    description: "Filter holidays by postal code",
    example: "93430",
  })
  async isDayHolidayForPostalCode(
    @Res() res: FastifyReply,
    @Param("country") country: SoliguideCountries,
    @Param("date", new ParseDateQueryPipe("yyyy-MM-dd")) date: Date,
    @Query("postalCode", new ParsePostalCodePipe()) postalCode?: string
  ) {
    const params = { country, date, postalCode };
    const cacheKey = this.cacheManagerService.generateCacheKey(
      CachePrefix.HOLIDAYS_COUNTRY_DATE,
      params
    );

    const cachedResult = await this.cacheManagerService.getCachedData<boolean>(
      cacheKey
    );

    if (cachedResult != null) {
      return res.code(HttpStatus.OK).send(cachedResult);
    }
    try {
      const results = this.publicHolidaysService.getPublicHolidaysByDate(
        country,
        date,
        postalCode
      );

      await this.cacheManagerService.setCachedData<PublicHoliday[]>(
        cacheKey,
        results
      );
      return res.code(HttpStatus.OK).send(results);
    } catch (e) {
      this.logger.error(e, (e as Error).stack);
      throw new BadRequestException();
    }
  }
}
