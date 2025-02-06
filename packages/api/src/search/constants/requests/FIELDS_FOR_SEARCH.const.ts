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
export const FIELDS_FOR_SEARCH: {
  [key: string]: string;
} = {
  API: "close createdAt description distance entity lieu_id modalities name newhours position.address position.additionalInformation position.city position.cityCode position.postalCode position.department position.departmentCode position.regionCode position.country position.timeZone position.adresse position.codePostal position.complementAdresse position.departement position.location position.pays position.region position.ville publics seo_url services_all status sources tempInfos updatedAt visibility country",
  EXPORT_PLACE: "-geoZones -parcours -photos -stepsDone",
  MANAGE_PARCOURS:
    "-geoZones -modalities -newhours -photos -position -publics -services_all -stepsDone",
  MANAGE_PLACE:
    "-geoZones -modalities -newhours -parcours -photos -publics -services_all -stepsDone",
  ADD_PLACE_TO_ORGA:
    "-geoZones -modalities -newhours -photos -publics -services_all -stepsDone",
  ITINERARY_PUBLIC_SEARCH:
    "-geoZones -position -priority -slugs -stepsDone -verified -services_all.modalities.docs -modalities.docs -photos",
  PLACE_PUBLIC_SEARCH:
    "-geoZones -parcours -priority -slugs -stepsDone -verified -services_all.modalities.docs -modalities.docs -photos",
  DEFAULT: "lieu_id name",
  DEFAULT_CAMPAIGN: "lieu_id name campaigns",
};
