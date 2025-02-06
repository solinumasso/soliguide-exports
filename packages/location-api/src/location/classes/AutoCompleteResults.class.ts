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
import {
  CountryCodes,
  GeoTypes,
  LocationAutoCompleteAddress,
  LocationAutoCompleteResults,
} from "@soliguide/common";

export class AutoCompleteResults implements LocationAutoCompleteResults {
  @ApiProperty({
    example: [
      {
        name: "France",
        label: "France",
        coordinates: [],
        code: "fr",
        slugs: {
          country: "fr",
          pays: "fr",
        },
        geoType: GeoTypes.COUNTRY,
      },
    ],
  })
  public countries: LocationAutoCompleteAddress[] = [];

  @ApiProperty({
    example: [
      {
        label: "Bretagne",
        coordinates: [-3.478019, 48.145013],
        country: CountryCodes.FR,
        region: "Pays de la Loire",
        regionCode: "52",
        geoValue: "region-bretagne",
        slugs: {
          country: "fr",
          pays: "fr",
          region: "bretagne",
        },
        name: "Bretagne",
        geoType: GeoTypes.REGION,
      },
    ],
  })
  public regions: LocationAutoCompleteAddress[] = [];

  @ApiProperty({
    example: [
      {
        label: "Seine-Saint-Denis",
        coordinates: [2.502606, 48.923554],
        country: CountryCodes.FR,
        department: "Seine-Saint-Denis (93)",
        departmentCode: "93",
        region: "Île-de-France",
        geoValue: "departement-seine-saint-denis",
        regionCode: "11",
        slugs: {
          pays: "fr",
          country: "fr",
          department: "seine-saint-denis",
          departement: "seine-saint-denis",
          region: "ile-de-france",
        },
        name: "Seine-Saint-Denis",
        geoType: GeoTypes.DEPARTMENT,
        timeZone: "Europe/Paris",
      },
    ],
  })
  public departments: LocationAutoCompleteAddress[] = [];

  @ApiProperty({
    example: [
      {
        label: "Beauvais",
        latitude: 48.815785,
        longitude: 2.414017,
        postalCode: "60001",
        cityCode: "60057",
      },
    ],
  })
  public cities: LocationAutoCompleteAddress[] = [];

  @ApiProperty({
    example: [
      {
        label: "Quai d'Alfortville 94140 Alfortville",
        latitude: 48.815785,
        longitude: 2.414017,
        postalCode: "94140",
        cityCode: "94002",
      },
    ],
    description: "House number, street",
  })
  public addresses: LocationAutoCompleteAddress[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(results?: any) {
    this.countries = results?.countries ?? [];
    this.regions = results?.regions ?? [];
    this.departments = results?.departments ?? [];
    this.cities = results?.cities ?? [];
    this.addresses = results?.addresses ?? [];
  }
}
