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
import { DocExportRow } from "../interfaces";

export const EXPORT_COLUMNS: DocExportRow = {
  sectionName: "",
  lieu_id: "PLACE_NUMBER",
  updatedAt: "EXPORTS_HEADER_LAST_UPDATE",
  name: "EXPORTS_HEADER_PLACE_NAME",
  city: "EXPORTS_HEADER_CITY",
  postalCode: "EXPORTS_HEADER_POSTAL_CODE",
  tempClosure: "EXPORTS_HEADER_TEMP_CLOSURE",
  hours: "EXPORTS_HEADER_HOURS",
  services: "EXPORTS_HEADER_SERVICES",
  tempMessage: "EXPORTS_HEADER_TEMP_MESSAGE",
  tempHours: "EXPORTS_HEADER_TEMP_HOURS",
  email: "EXPORTS_HEADER_EMAIL",
  phoneNumbers: "EXPORTS_HEADER_PHONES",
  publics: "EXPORTS_HEADER_PUBLICS",
  modalities: "EXPORTS_HEADER_MODALITIES",
  linkToSoliguide: "EXPORTS_HEADER_LINK",
  address: "EXPORTS_HEADER_ADDRESS",
  latitude: "EXPORTS_HEADER_LATITUDE",
  longitude: "EXPORTS_HEADER_LONGITUDE",
};
