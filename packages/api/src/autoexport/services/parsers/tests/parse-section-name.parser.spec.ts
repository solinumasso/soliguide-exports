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
  Categories,
  CountryCodes,
  ExportFileType,
  GeoTypes,
  PlaceType,
  SortingFilters,
  SupportedLanguagesCode,
} from "@soliguide/common";

import { parseSectionName } from "../parse-section-name.parse";

import { ExportSearchParams } from "../../../interfaces/ExportSearchParams.interface";

import { ONLINE_PLACE } from "../../../../../mocks/places/ONLINE_PLACE.mock";

describe("Generate section name according to the search", () => {
  const searchData: ExportSearchParams = {
    options: { sortBy: "createdAt", sortValue: "-1" },
    category: null,
    close: null,
    label: null,
    word: null,
    country: CountryCodes.FR,
    territories: [],
    location: {
      geoType: GeoTypes.CITY,
      geoValue: "villetaneuse",
      coordinates: [2.3459158, 48.9609899],
      distance: 5,
      label: "Villetaneuse",
      areas: {
        departement: "Seine-Saint-Denis",
        region: "Île-de-France",
        ville: "Villetaneuse",
        pays: "France",
        country: CountryCodes.FR,
        slugs: {},
      },
      slugs: {},
    },
    toCampaignUpdate: false,
    languages: null,
    autonomy: [],
    campaignStatus: null,
    catToExclude: [],
    lieu_id: null,
    organization: null,
    placeType: PlaceType.PLACE,
    priority: null,
    sourceMaj: [],
    status: null,
    visibility: null,
    exportParams: {
      showUpcomingTempInfo: true,
      fileType: ExportFileType.CSV,
      sortingFilter: SortingFilters.CITY,
      language: SupportedLanguagesCode.EN,
      infos: {
        address: true,
        city: true,
        email: true,
        hours: true,
        latitude: true,
        lieu_id: true,
        linkToSoliguide: true,
        longitude: true,
        modalities: true,
        name: true,
        phoneNumbers: true,
        postalCode: true,
        publics: true,
        services: true,
        tempClosure: true,
        tempHours: true,
        tempMessage: true,
        updatedAt: true,
      },
    },
  };
  it("City", () => {
    const sectionName = parseSectionName(searchData, ONLINE_PLACE);
    expect(sectionName).toEqual("Paris");
  });
  it("Postal Code", () => {
    searchData.exportParams.sortingFilter = SortingFilters.POSTAL_CODE;
    const sectionName = parseSectionName(searchData, ONLINE_PLACE);
    expect(sectionName).toEqual("75013");
  });

  it("Should return the first service when we sort by service without selecting a category ", () => {
    searchData.exportParams.sortingFilter = SortingFilters.SERVICE;
    const sectionNameEnglish = parseSectionName(
      searchData,
      ONLINE_PLACE,
      ONLINE_PLACE.services_all[0]
    );
    expect(sectionNameEnglish).toEqual("Social support");

    searchData.exportParams.language = SupportedLanguagesCode.FR;
    const sectionNameFrench = parseSectionName(
      searchData,
      ONLINE_PLACE,
      ONLINE_PLACE.services_all[0]
    );
    expect(sectionNameFrench).toEqual("Accompagnement social");
  });

  it("Should return the service name when we search by category and sort by service", () => {
    // We are looking for all places with category "counseling"
    // parseSectionName should return service in this category : "public_writer"
    searchData.exportParams.sortingFilter = SortingFilters.SERVICE;
    searchData.category = Categories.COUNSELING;
    const sectionName = parseSectionName(
      searchData,
      ONLINE_PLACE,
      ONLINE_PLACE.services_all[0]
    );
    expect(sectionName).toEqual("Accompagnement social");

    searchData.exportParams.language = SupportedLanguagesCode.EN;
    const sectionNameEnglish = parseSectionName(
      searchData,
      ONLINE_PLACE,
      ONLINE_PLACE.services_all[0]
    );
    expect(sectionNameEnglish).toEqual("Social support");
  });
});
