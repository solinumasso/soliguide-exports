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
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { CONFIG_VALIDATOR } from "../../../config";
import { GenerateHolidaysService } from "../generate-holidays.service";
import { CountryCodes } from "@soliguide/common";
import { Holiday } from "../../interfaces/holidays.interface";
import { PUBLIC_HOLIDAYS_MOCK } from "./PUBLIC_HOLIDAYS_MOCK";

describe("GenerateHolidaysService", () => {
  let service: GenerateHolidaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateHolidaysService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: CONFIG_VALIDATOR,
        }),
      ],
    }).compile();

    service = module.get<GenerateHolidaysService>(GenerateHolidaysService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Generate holidays from openholidaysapi.org", () => {
    describe("getDepartmentCodeFromOpenHolidays ", () => {
      it("Should return 974 for Martinique", () => {
        expect(
          service.getDepartmentCodeFromOpenHolidays("FR-MQ", CountryCodes.FR)
        ).toEqual(["972"]);
      });

      it("Should return 974 for Martinique", () => {
        expect(
          service.getDepartmentCodeFromOpenHolidays("FR-XX-MO", CountryCodes.FR)
        ).toEqual(["57"]);
      });
    });

    describe("processHolidays ", () => {
      it("should return holidays in Soliguide Format", () => {
        const result = service.processHolidays(
          PUBLIC_HOLIDAYS_MOCK as Holiday[],
          CountryCodes.FR
        );

        expect(result[0]).toMatchObject({
          isNational: true,
          name: "Jour de l'an",
          departments: [],
          startDate: "2025-01-01",
          endDate: "2025-01-01",
        });
      });
    });
  });
});
