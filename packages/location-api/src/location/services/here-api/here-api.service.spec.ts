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
import { HereApiService } from "./here-api.service";
import { DepartmentsAndRegionsService } from "../departments-regions.service";
import { ConfigModule } from "@nestjs/config";
import { CONFIG_VALIDATOR } from "../../../config";
import { HttpModule } from "@nestjs/axios";
import { GeoTypes } from "@soliguide/common";

describe("HereApiService", () => {
  let service: HereApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HereApiService, DepartmentsAndRegionsService],
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: CONFIG_VALIDATOR,
        }),
      ],
    }).compile();

    service = module.get<HereApiService>(HereApiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getGeoTypeForAddress", () => {
    test("should return GeoTypes.POSITION for place, street, or houseNumber resultType", () => {
      expect(service.getGeoTypeForAddress("place", "city")).toBe(
        GeoTypes.POSITION
      );
      expect(service.getGeoTypeForAddress("street", "postalCode")).toBe(
        GeoTypes.POSITION
      );
      expect(service.getGeoTypeForAddress("houseNumber", "subdistrict")).toBe(
        GeoTypes.POSITION
      );
    });

    test("should return GeoTypes.BOROUGH for city or postalCode localityType", () => {
      expect(service.getGeoTypeForAddress("locality", "subdistrict")).toBe(
        GeoTypes.BOROUGH
      );
      expect(service.getGeoTypeForAddress("locality", "district")).toBe(
        GeoTypes.BOROUGH
      );
    });

    test("should return GeoTypes.CITY for other cases", () => {
      expect(service.getGeoTypeForAddress("locality", "postalCode")).toBe(
        GeoTypes.CITY
      );
      expect(service.getGeoTypeForAddress("locality", "city")).toBe(
        GeoTypes.CITY
      );
    });
  });
});
